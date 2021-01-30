const { Artist, Album, MusicalGroup } = require("../models")

exports.getAll = async function (req, res) {
  try {
    const artists = await Artist.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }
    })

    res.status(200).json(artists);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

exports.getOne = async function (req, res) {
  try {
    const artistId = req.params.id;

    const artist = JSON.parse(
      JSON.stringify(
        await Artist.findOne({
          where: { id: artistId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Album,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: MusicalGroup,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            }
          ]
        })
      )
    );

    res.json(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};