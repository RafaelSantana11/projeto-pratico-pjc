const { Artist, MusicalGroup, Album, sequelize } = require("../models");
const configPagination = require("../config/pagination.json");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getAll = async function (req, res) {
  try {
    //verifica se foi enviado a quantidade de resultados por página desejada, se não, pega da config do servidor
    const resultsPerPage = req.query.resultsPerPage
      ? parseInt(req.query.resultsPerPage)
      : configPagination.resultsPerpage;

    //verifica se foi enviado o número da página desejada (via query)
    const page = !req.query.page ? 1 : parseInt(req.query.page);

    //calcula o offset para realizar a paginação
    const offset = page === 1 ? 0 : (page - 1) * resultsPerPage;

    const where = {};

    //vizualisa os filtros desejados e adiciona-is no objeto where para filtragem
    if (req.query.search) where.name = { [Op.like]: `%${req.query.search}%` }; //consulta pelo nome do cantor

    if (req.query.album) where['$Artist.name$'] = { [Op.like]: `%${req.query.album}%` }; //pelo nome do album

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

exports.create = async function (req, res) {
  try {

    //insere os dados enviados pelo corpo da requisição
    const createdArtist = await Artist.create(req.body);

    res.json(createdArtist);
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
};

exports.update = async function (req, res) {
  try {

    //atualiza o artista cujo id foi informado pela rota, substituindo os dados enviados no corpo da requisição
    const updatedData = await Artist.update(req.body, {
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
    await Artist.destroy({
      where: { id: req.params.id },
    });

    res.send(true);
  } catch (error) {
    res.status(500).json({});
  }
};
