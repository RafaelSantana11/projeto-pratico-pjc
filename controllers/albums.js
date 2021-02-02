const { Artist, MusicalGroup, Album, AlbumMedia, sequelize } = require("../models");
const configPagination = require("../config/pagination.json");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Minio = require('minio');
const minioConfig = require("../config/minioConfig.json");

const client = new Minio.Client({
  endPoint: minioConfig.ENDPOINT,
  accessKey: minioConfig.ACCESS_KEY_ID,
  secretKey: minioConfig.ACCESS_KEY_SECRET
});


exports.getAll = async function (req, res) {
  try {
    //verifica se foi enviado a quantidade de resultados por página desejada, se não, pega da config do servidor
    const resultsPerPage = req.query.resultsPerPage
      ? parseInt(req.query.resultsPerPage)
      : configPagination.resultsPerpage;

    //verifica se foi enviado o número da página desejada (via query)
    const page = !req.query.currentPage ? 1 : parseInt(req.query.currentPage);

    //calcula o offset para realizar a paginação
    const offset = page === 1 ? 0 : (page - 1) * resultsPerPage;

    const where = {};

    //vizualisa os filtros desejados e adiciona-is no objeto where para filtragem
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }; //consulta pelo nome do cantor

    if (req.query.artistName) where['$Artist.name$'] = { [Op.like]: `%${req.query.artistName}%` }; //pelo nome do album

    //realiza a busca paginada incluindo o objeto where com os filtros, ordendando por ordem alfabética
    const albums =
      await Album.findAndCountAll({
        where,
        offset: offset,
        limit: resultsPerPage,
        order: [["id", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
        distinct: true,
        include: [ //inclui na busca os dados de cada modelo relacionado com o artista
          {
            model: Artist,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              {
                model: MusicalGroup,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ]
          },
        ]
      })

    //retorna os dados em formato json
    res.json(albums);
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
};

exports.getOne = async function (req, res) {
  try {
    const albumId = req.params.id;

    const album = JSON.parse(
      JSON.stringify(
        await Album.findOne({
          where: { id: albumId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        })
      )
    );

    res.json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.create = async function (req, res) {
  const t = await sequelize.transaction(); //inicia a transaction, para que se alguma operação der errado, reverta o que tiver sido feito

  try {
    const files = req.files;

    //insere os dados enviados pelo corpo da requisição na tabela dos albuns
    const createdAlbum = await Album.create(req.body, { transaction: t });

    //salva os objetos no minio
    for (const file of files) {
      client.putObject(minioConfig.BUCKET,
        file.originalname,
        file.buffer,
        function (err, etag) {
          return console.log(err, etag) // err should be null
        })
    }

    //insere os arquivos de midia na tabela
    const filePromises = [];

    for (const file of files)
      filePromises.push(
        AlbumMedia.create(
          { name: file.originalname, AlbumId: createdAlbum.id },
          { transaction: t }
        )
      );


    await Promise.all(filePromises);

    await t.commit();

    res.json(createdAlbum);
  } catch (error) {
    console.log(error);

    await t.rollback();

    res.status(500).json({});
  }
};

exports.update = async function (req, res) {
  try {

    //atualiza o artista cujo id foi informado pela rota, substituindo os dados enviados no corpo da requisição
    const updatedData = await Album.update(req.body, {
      where: { id: req.params.id },
    });

    res.json(updatedData);
  } catch (error) {
    res.status(500).json({});
  }
};

exports.delete = async function (req, res) {
  try {

    //deleta o artista cujo id foi enviado como parâmetro da rota
    await Album.destroy({
      where: { id: req.params.id },
    });

    res.send(true);
  } catch (error) {
    res.status(500).json({});
  }
};
