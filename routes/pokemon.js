const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(faves=>{
    res.render('faves', {faves: faves})
  })
  let deletepkmn = req.query.name 
  db.pokemon.destroy({
    where: {
      name: deletepkmn
    }
  }).then(()=>{
    res.redirect('/pokemon')
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body)
  .then(createdFave=>{
    console.log('favorite pokemon:', createdFave)
    res.redirect('/pokemon')
  })
  // need to redirect back to favorites page after adding to faves
});

// GET /pokemon/:id - renders a show page with information about the pokemon with the corresponding row id
router.get('/:id', function(req, res){
  pokeIndex = req.params.id
  axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeIndex}/`)
  .then(response=>{
    console.log(response.data.sprites.front_default)
    res.render('show', {pokedata: response.data})
  })
})

// DESTROY /pokemon - delete a specific pokemon from the database

// router.delete('/', function(req, res) {
//   console.log(req.query.name)
//   let deletepkmn = req.query.name
//   db.pokemon.destroy({
//     where: {
//       name: deletepkmn
//     }
//   })
//   .then(function(){
//     res.redirect('/pokemon')
//   })
// })

module.exports = router;
