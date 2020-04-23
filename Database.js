const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: '91.178.124.103',
  port: '3306',
  user: 'vivesteam3',
  password: 'vivesteam3',
  database: 'projectweek1',
  connectionLimit: 50
});
async function getAllLocations() {
  let conn;
  var rows
  try {
    conn = await pool.getConnection();
    rows = await conn.query("SELECT * FROM data");
    //console.log(rows); //[ {val: 1}, meta: ... ]

    // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
    throw err;
  } finally {
    // conn.end()
    return rows
    //if (conn) return conn.end();
  }
}

async function insertReview(Review) {
  let conn;
  var rows
  try {
    // console.log(Review)
    // console.log(Review.Username)
    conn = await pool.getConnection();
    const res = await conn.query("INSERT INTO data (username, locatie, review,rating,longitude,latitude) VALUES (?,?,?,?,?,?)", [Review.Username, Review.location,Review.review, Review.rating,51.209348,3.2246995]);
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    ///const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
    throw err;
  } finally {
    // conn.end()
    return conn.end()
    //if (conn) return conn.end();
  }
}
exports.getAllLocations = getAllLocations;
exports.insertReview = insertReview;