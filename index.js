const express = require("express");

const app = express();
const fs = require("fs");

app.get("/api", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (err) {
      console.error(err);
      res.status(500).send("Invalid JSON data");
    }
  });
});

app.get("/api/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      const result = jsonData.find((item) => item.job_id === id);
      if (result) {
        res.json(result);
      } else {
        res.status(404).send("Data not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Invalid JSON data");
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
