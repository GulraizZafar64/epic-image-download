const express = require("express");
const axios = require("axios");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
  try {
    res.status(200).send("Hello world");
  } catch (error) {
    res.status(500).send("Error downloading the image.");
  }
});
app.get("/download", async (req, res) => {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    return res.status(400).send("Image URL is required.");
  }

  try {
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "stream",
    });

    res.setHeader("Content-Disposition", `attachment; filename="image.jpg"`);
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send("Error downloading the image.");
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
