const { Pool } = require('pg')
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'postgres',
password: '1234',
port: 5432,
})


///////////////////// getTable /////////////////////
const getAllCountry = async() => {
    const sql= `SELECT "Province/State" as State, "Country/Region" as Country from covid19_confirmed_csv`
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllConfirmed = async() => {
    const sql= `SELECT "3/23/20" as Confirmed from covid19_confirmed_csv`
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllRecovered = async() => {
    const sql= `SELECT "3/23/20" as Confirmed from covid19_recovered_csv`
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllRecoveredMap = async() => {
    const sql= `SELECT "3/23/20" as Confirmed from covid19_recovered_csv`
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllDeath = async() => {
    const sql= `SELECT "3/23/20" as Confirmed from covid19_death_csv`
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllDeathMap = async() => {
    const sql= `SELECT "3/23/20" as Confirmed from covid19_death_csv`
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLatLong = async () => {
    const sql = `select "Province/State" as State , "Country/Region" as Country, lat, long from covid19_death_csv`
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
///////////////////// End getTable /////////////////////



///////////////////// getChart /////////////////////

const getTotalConfirmed = async () => {
    const sql = `SELECT sum("3/22/20") as Confirmed from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalRecovered = async () => {
    const sql = `SELECT sum("3/22/20") as Recovered from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalDeaths = async () => {
    const sql = `SELECT sum("3/22/20") as Deaths from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekConfirmed = async () => {
    const sql = `select
    sum("3/16/20") as Day1,
    sum("3/17/20") as Day2,
    sum("3/18/20") as Day3,
    sum("3/19/20") as Day4,
    sum("3/20/20") as Day5,
    sum("3/21/20") as Day6,
    sum("3/22/20") as Day7
    from covid19_confirmed_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekRecovered = async () => {
    const sql = `select
    sum("3/16/20") as Day1,
    sum("3/17/20") as Day2,
    sum("3/18/20") as Day3,
    sum("3/19/20") as Day4,
    sum("3/20/20") as Day5,
    sum("3/21/20") as Day6,
    sum("3/22/20") as Day7
    from covid19_recovered_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getLastWeekDeaths = async () => {
    const sql = `select
    sum("3/16/20") as Day1,
    sum("3/17/20") as Day2,
    sum("3/18/20") as Day3,
    sum("3/19/20") as Day4,
    sum("3/20/20") as Day5,
    sum("3/21/20") as Day6,
    sum("3/22/20") as Day7
    from covid19_death_csv`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

///////////////////// End getChart /////////////////////


async function getChart(){
    const sql = `select sum(covid19_confirmed_csv."3/23/20") as date_conf,sum(covid19_death_csv."3/23/20") as date_death,sum(covid19_recovered_csv."3/23/20") as date_recover
    from covid19_confirmed_csv , covid19_death_csv , covid19_recovered_csv
    where covid19_confirmed_csv."Country/Region"= covid19_death_csv."Country/Region" and covid19_confirmed_csv."Province/State" = covid19_death_csv."Province/State" 
    and covid19_confirmed_csv."Country/Region"= covid19_recovered_csv."Country/Region" and covid19_confirmed_csv."Province/State" = covid19_recovered_csv."Province/State" `
    const data = await pool.query(sql);
    //console.log(data);
    return data;
}


module.exports = {
    getAllCountry,
    getAllConfirmed,
    getAllRecovered,
    getAllRecoveredMap,
    getAllDeath,
    getAllDeathMap,
    getLatLong,
    getTotalConfirmed,
    getTotalRecovered,
    getTotalDeaths,
    getLastWeekConfirmed,
    getLastWeekRecovered,
    getLastWeekDeaths,
    getChart,

}