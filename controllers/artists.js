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

    if (req.query.album) where['$Album.name$'] = { [Op.like]: `%${req.query.album}%` }; //pelo nome do album

    //realiza a busca paginada incluindo o objeto where com os filtros, ordendando por ordem alfabética
    const artists =
      await Artist.findAndCountAll({
        where,
        offset: offset,
        limit: resultsPerPage,
        order: [["id", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
        distinct: true,
        include: [ //inclui na busca os dados de cada modelo relacionado com o artista
          {
            model: MusicalGroup,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Album,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ]
      })
    
    //retorna os dados em formato json
    res.json(artists);
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
};
