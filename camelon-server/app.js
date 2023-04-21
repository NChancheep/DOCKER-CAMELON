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
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "camelon",
});

app.get("/years", (req, res) => {
  db.query(
    `SELECT  year  FROM news_summary_table_monthly_all_year group by year;
      `,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/news_crimes_statistics_per_year", (req, res) => {
  db.query(
          ` SELECT SUM(Gambling) AS Gambling,
          SUM(Murder) AS Murder,
          SUM(\`Sexual Abuse\`) AS \`Sexual Abuse\`,
          SUM(\`Theft/Burglary\`) AS \`Theft/Burglary\`,
          SUM(Drug) AS Drug,
          SUM(\`Battery/Assault\`) AS \`Battery/Assault\`,
          SUM(Accident) AS Accident from news_crime_statistics where year between ? and ?;
        `,[req.query.yearStart, req.query.yearEnd],
          
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else {
              res.send(result);
              console.log(result);
            }
          }
        );
//   if (req.query.year === "") {
//     db.query(
//       `SELECT SUM(Gambling) AS Gambling,
//       SUM(Murder) AS Murder,
//       SUM(\`Sexual Abuse\`) AS \`Sexual Abuse\`,
//       SUM(\`Theft/Burglary\`) AS \`Theft/Burglary\`,
//       SUM(Drug) AS Total_Drug,
//       SUM(\`Battery/Assault\`) AS \`Battery/Assault\`,
//       SUM(Accident) AS Accident
// FROM news_crime_statistics;
//     `,
      
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send(err);
//         } else {
//           res.send(result);
//           console.log(result);
//         }
//       }
//     );


//   } else {

//     db.query(
//       `SELECT * from news_crime_statistics where year = ?
//     `,
//       [req.query.year],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send(err);
//         } else {
//           res.send(result);
//           console.log(result);
//         }
//       }
//     );

//   }
 
});

app.get("/news_crimes_summary", (req, res) => {
  if(req.query.crimeType === "") {
    db.query(
      `SELECT year, month, SUM(Gambling + Murder + \`Sexual Abuse\` + \`Theft/Burglary\` + Drug + \`Battery/Assault\` + Accident) as Numbers FROM news_summary_table_monthly_all_year
      WHERE year between ? and ?
      group by year,month  
      order by year, month
    `,
      [req.query.yearStart, req.query.yearEnd],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );

  } else {
    db.query(
      `SELECT year, month, SUM(\`${req.query.crimeType}\`) as Numbers FROM news_summary_table_monthly_all_year
      WHERE year between ? and ?
      group by year,month  
      order by year, month
    `,
      [req.query.yearStart, req.query.yearEnd],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );

  }
  
});

app.get("/news_crime_statistics", (req, res) => {
  console.log(req.query.crimeType)
  if (req.query.crimeType === "") {
    db.query(
      `SELECT year, SUM(Gambling + Murder + \`Sexual Abuse\` + \`Theft/Burglary\` + Drug + \`Battery/Assault\` + Accident) AS Numbers from news_crime_statistics where year between ? and ? group by year`,
      [req.query.yearStart, req.query.yearEnd]
      ,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );

  } else {
    db.query(
      `select year, SUM(\`${req.query.crimeType}\`) as Numbers from news_crime_statistics where year between ? and ? group by year`,
      [req.query.yearStart, req.query.yearEnd]
      ,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );

  }
});

app.get("/provinces_statistics", (req, res) => {

  db.query(
    `select * from news_statistics_by_province order by numbers desc
`,
    [req.query.year],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );

});






app.listen(3001, () => console.log("listining on port 3001"));