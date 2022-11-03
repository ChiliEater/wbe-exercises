import express from "express"
/**
 *  Webservice mit Express
 *  WBE-Praktikum
 */
const app = express()

//  Fehlerobjekt anlegen
//
function error(status, msg) {
  let err = new Error(msg)
  err.status = status
  return err
}

//  Zufällige ID erzeugen, Quelle:
//  https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id#6860916
//
function guidGenerator() {
  let S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
}

//  API-Key überprüfen
// 
app.use('/api', function(req, res, next){
  let key = req.query['api-key']
  
  // Key fehlt
  if (!key) { 
    return next(error(400, 'api key required'))
  }
  // Key falsch
  if (!~apiKeys.indexOf(key)) {
    return next(error(401, 'invalid api key'))
  }
  // korrekter Key
  req.key = key
  next()
})

//  JSON-Daten akzeptieren
app.use(express.json())

//  gültige API-Keys
let apiKeys = ['wbeweb']

//  unsere tolle in-memory Datenbank :)
let data = {1234567890: {demodata: "wbe is an inspiring challenge"}}

//  GET-Request bearbeiten
//
app.get('/api/data/:id', function(req, res, next){
  let id = req.params.id
  let result = data[id]

  if (result) res.send(result)
  else next()
})

//  POST-Request bearbeiten
//
app.post('/api/data', function (req, res, next) {
  let id = guidGenerator()
  data[id] = req.body
  res.send({id})
})

//  Middleware mit vier Argumenten wird zur Fehlerbehandlung verwendet
//
app.use(function(err, req, res, next){
  res.status(err.status || 500)
  res.send({ error: err.message })
})

//  Catch-all: wenn keine vorangehende Middleware geantwortet hat, wird
//  hier ein 404 (not found) erzeugt
//
app.use(function(req, res){
  res.status(404)
  res.send({ error: "not found" })
})

app.listen(3000)
console.log('Express started on port 3000')



