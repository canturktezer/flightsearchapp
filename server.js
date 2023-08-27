import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("public/index.html");
});

// axios.get('https://64e8b72699cf45b15fe00a70.mockapi.io/api/flights')
//   .then(response => {
//     console.log('API Response:', response.data);
//   })
//   .catch(error => {
//     console.error('An error occurred:', error);
// });

app.post("/flights", (req, res) => {
  const formData = req.body;

  axios
    .get("https://64e8b72699cf45b15fe00a70.mockapi.io/api/flights")
    .then((response) => {
    //console.log("API Response:", response.data);
      res.send("Form submitted successfully");
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      res.status(500).send("Form submission failed");
    });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
