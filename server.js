const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid/v4");
const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "sensibull",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/insert/order-service", (req, res) => {
  let myobj = {};
  myobj.identifier = uuid();
  myobj.symbol = req.body.symbol;
  myobj.quantity = req.body.quantity;
  myobj.filled_quantity = 0;
  myobj.order_status = "open";
  const sqlSelect =
    "INSERT into orders(identifier,symbol,quantity,filled_quantity,order_status) values (?,?,?,?,?)";
  db.query(
    sqlSelect,
    [
      myobj.identifier,
      myobj.symbol,
      myobj.quantity,
      myobj.filled_quantity,
      myobj.order_status,
    ],
    (err, results) => {
      if (err) {
        res.send({
          success: false,
          err_msg: "some error occured",
        });
      } else {
        res.send({
          success: true,
          payload: { myobj },
          message: "order create success",
        });
      }
    }
  );
});

app.post("/update/order-service", (req, res) => {
  let identifier = req.body.identifier;
  let new_quantity = req.body.new_quantity;
  const sql1 =
    'select * from orders where identifier=? and order_status="open"';
  db.query(sql1, [identifier], (err1, res2) => {
    if (err1) {
      res.send({
        success: false,
        err_msg: "some error occured",
      });
    } else {
      if (res2.length > 0) {
        const sq2 = "Update orders set quantity=? where identifier=?";
        db.query(sq2, [new_quantity, identifier], (err2, res2) => {
          if (err2) {
            res.send({
              success: false,
              err_msg: "some error occured",
            });
          } else {
            const sql3 = "select * from orders where identifier=?";
            db.query(sql3, [identifier], (err3, res3) => {
              if (err3) {
                res.send({
                  success: false,
                  err_msg: "some error occured",
                });
              } else {
                res.json({
                  success: true,
                  payload: { res3 },
                  message: "order update success",
                });
              }
            });
          }
        });
      } else {
        res.send({
          success: true,
          message: "There is no open orders to update",
        });
      }
    }
  });
});

app.post("/delete/order-service", (req, res) => {
  let identifier = req.body.identifier;
  let status = "cancel";
  const sql1 =
    'select * from orders where identifier=? and order_status="open"';
  db.query(sql1, [identifier], (err1, res1) => {
    if (err1) {
      res.send({
        success: false,
        err_msg: "some error occured",
      });
    } else {
      if (res1.length > 0) {
        const sql2 = "Update orders set order_status=? where identifier=?";
        db.query(sql2, [status, identifier], (err2, res2) => {
          if (err2) {
            res.send({
              success: false,
              err_msg: "some error occured",
            });
          } else {
            const sql1 = "Select * From Orders Where identifier=?";
            db.query(sql1, [identifier], (err3, res3) => {
              if (err3) {
                res.send({
                  success: false,
                  err_msg: "some error occured",
                });
              } else {
                res.json({
                  success: true,
                  payload: { res3 },
                  message: "order cancel success",
                });
              }
            });
          }
        });
      } else {
        res.send({
          success: true,
          message: "There is no open orders to cancel",
        });
      }
    }
  });
});

app.post("/order-service/status", (req, res) => {
  let identifier = req.body.identifier;
  const sql1 = "select * from orders where identifier=?";
  db.query(sql1, [identifier], (err1, res1) => {
    if (err1) {
      res.send({
        success: false,
        err_msg: "some error occured",
      });
    } else {
      res.json({ success: true, payload: { res1 } });
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
