const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '91.178.124.103',
     port: '3306', 
     user:'vivesteam3', 
     password: 'vivesteam3',
     database: 'projectweek1',
     connectionLimit: 50
});
async function getAllLocations() {
  let conn;
  console.log("db")
  var rows
  try {
	conn = await pool.getConnection();
	rows = await conn.query("SELECT * FROM data");
    console.log(rows[0]); //[ {val: 1}, meta: ... ]
    
	// const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	// console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
    return(rows[0])
	//if (conn) return conn.end();
  }
}
exports.getAllLocations = getAllLocations;