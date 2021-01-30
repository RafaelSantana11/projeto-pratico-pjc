const { MusicalGroup } = require("../models")

exports.getAll = async function (req, res) {
  try {
    const artists = await MusicalGroup.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }
    })

    res.status(200).json(artists);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}