const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "mahidol2022",
  database: process.env.MYSQL_DATABASE || "camelon",
});



app.get("/thairath_metadata", (req, res) => {
  db.query("SELECT * FROM thairath_metadata", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/crimetypes_count", (req, res) => {
  console.log(req.query.year);
  if (req.query.year == "all_year") {
    db.query(
      `SELECT crime_type, COUNT(*) as crime_rate
      FROM Thairath_Metadata WHERE  YEAR(date) BETWEEN '1970' AND '3000'
      GROUP BY crime_type
      ORDER BY crime_rate
      `,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT crime_type, COUNT(*) as crime_rate
    FROM Thairath_Metadata WHERE YEAR(date) = ?
    GROUP BY crime_type
    ORDER BY crime_rate`,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  }
});

app.get("/crimecount", (req, res) => {
  console.log(req.query.year);

  if (req.query.year == "all_year") {
    db.query(
      `SELECT YEAR(DATE) AS Year, COUNT(*) as crime_rate
      FROM Thairath_Metadata WHERE  YEAR(date) BETWEEN '1970' AND '3000'
      GROUP BY YEAR(DATE)
      ORDER BY YEAR(DATE)
        `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  } else {
    db.query(
      `SELECT MONTH(date) AS Month, COUNT(*) as crime_rate
        FROM Thairath_Metadata 
        WHERE YEAR(date) = ?
        GROUP BY Month
        ORDER BY Month;
        `,
      [req.query.year],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          // console.log(result);
          res.send(result);
        }
      }
    );
  }
});

app.listen(5000, () => console.log("listining on port 5000"));