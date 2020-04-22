const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '91.178.124.103',
     port: '3306', 
     user:'vivesteam3', 
     password: 'vivesteam3',
     database: 'projectweek1',
     connectionLimit: 50
});
async function asyncFunction() {
  let conn;
  console.log("db")
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT * FROM data");
	console.log(rows[0]); //[ {val: 1}, meta: ... ]
	// const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	// console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}
exports.asyncFunction = asyncFunction;