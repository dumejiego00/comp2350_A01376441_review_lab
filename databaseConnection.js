const mysql = require("mysql2/promise");

const is_qoddi = process.env.IS_QODDI || false;
// const is_qoddi = 1;

const dbConfigQoddi = {
  host: "sql.freedb.tech",
  user: "freedb_2350_main2",
  password: "82qamA%hYJwCT4T",
  database: "freedb_comp2350-week4-A01376441",

  multipleStatements: false,
  namedPlaceholders: true,
};

const dbConfigLocal = {
  host: "localhost",
  user: "root",
  password: "Ni**azInPari5",
  database: "restaurant_review",
  multipleStatements: false,
  namedPlaceholders: true,
};

if (is_qoddi) {
  var database = mysql.createPool(dbConfigQoddi);
} else {
  var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
