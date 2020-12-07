var express = require('express');
var router = express.Router();
const Db = require('../Db/database');

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  res.render('index', {

  });
});

router.get('/map', async function(req,res,next) {
  const getLatlong = await Db.getLatLong();
  const totalConfirmed = await Db.getTotalConfirmed();
  const totalRecovered = await Db.getTotalRecovered();
  const totalDeaths = await Db.getTotalDeaths();

  const objectTotal = {
    totalConfirmed: totalConfirmed.rows[0].confirmed,
    totalRecovered: totalRecovered.rows[0].recovered,
    totalDeaths: totalDeaths.rows[0].death
}
  
  res.render('map', { totalObject: objectTotal, maps: getLatlong.rows });

});

router.get('/table', async function(req,res,next) {
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

  res.render('table', { countrys: objectCountry });

});

router.get('/about', async function(req,res,next) {
  res.render('about');

});

router.get('/graph', async function(req, res, next) {
  
  const TotalConfirmed = await Db.getTotalConfirmed();
  const TotalRecovered = await Db.getTotalRecovered();
  const TotalDeaths = await Db.getTotalDeaths();

  const lastWeekConfirmed = await Db.getLastWeekConfirmed();
  const lastWeekRecovered = await Db.getLastWeekRecovered();
  const lastWeekDeaths = await Db.getLastWeekDeaths();

  const Totals = {
    TotalConfirmed: TotalConfirmed.rows[0].confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    TotalRecovered: TotalRecovered.rows[0].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    TotalDeaths: TotalDeaths.rows[0].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  }

  res.render('graph', {
    Totals: Totals,
    lastWeekConfirmed: lastWeekConfirmed.rows[0],
    lastWeekRecovered: lastWeekRecovered.rows[0],
    lastWeekDeaths: lastWeekDeaths.rows[0],
  });
});


module.exports = router;
