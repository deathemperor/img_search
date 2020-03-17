const express = require('express');
const router = express.Router();
const fs = require("fs");
const request = require("request-promise");

const dir = '/tmp/images'

// const api = "http://975ecaf8.ngrok.io/api/v1.0/get_similar_items?img=/tmp/dress.jpg"
const api = "http://localhost:10000/api/v1.0/get_similar_items?img=/tmp/dress.jpg"

router.post('/', async function(req, res, next) {
  let image = req.body.image;

  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir)
  }

  const file = `${dir}/${Date.now()}.jpg`;

  await fs.promises.writeFile(file, image, {encoding: "base64"});
  console.log(file);

  // image.mv(file, async function(err) {
  //   if (err)
  //     return res.status(500).send(err);
    
  // });
  const result = await request.get(`${api}${file}`);
  // const images = await request.get(`${api}`);
  const results = images.split(",").map(i => {
    const [ itemId, imageName ] = i.split('/');
    return { itemId, imageName }
  });
  res.send(results);
  
});

module.exports = router;
