var express = require('express');
var router = express.Router();
const Db = require('../Db/database');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const result = await Db.getAllCountry();
  const confirmed = await Db.getAllConfirmed();
  const recovered = await Db.getAllRecovered();
  const death = await Db.getAllDeath();

  let objectCountry = [];
  for (const key in result.rows) {
    objectCountry[key] = {
      state: result.rows[key].state,
      country: result.rows[key].country,
      confirmed: confirmed.rows[key].confirmed,
      recovered: recovered.rows[key].confirmed,
      death: death.rows[key].confirmed,
    }
  }
  res.render('index', { countrys: objectCountry });
});

router.get('/map', async function(req,res,next) {
  res.render('map');

});

router.get('/table', async function(req,res,next) {
  res.render('table');

});

router.get('/about', async function(req,res,next) {
  res.render('about');

});



module.exports = router;
