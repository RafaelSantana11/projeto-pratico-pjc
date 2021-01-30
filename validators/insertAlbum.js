module.exports = async function (req, res, next) {
  let errors = []
  const data = req.body

  if (!data) {
    errors.push('Requisição inválida!')
    return res.status(400).send(errors)
  }

  if (!data.publicationYear)
    errors.push("Ano de publicação obrigatório!");

  if (!data.name) errors.push("Nome do album obrigatório!");

  if (!data.ArtistId) errors.push("Campo Artista obrigatório!");


  if (errors.length > 0) {
    res.status(400).send(errors)
  } else {
    return next()
  }
}
