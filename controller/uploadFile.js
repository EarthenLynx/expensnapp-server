const fs = require("fs");
const path = require("path");
const {tRecognize} = require("./recognize.controller");

const saveImgTemp = (req, res, next) => {
  // If necessary, do something whenever a piece of data is received 
  // const cMax = req.headers['content-length'];
  // let cReceived = 0;

  return new Promise((resolve, reject) => {
    const type = req.headers['content-type'].split("/")[1]
    const imgPath = path.join(__dirname, "../store/recognize_me.".concat(type))

    const writeStream = fs.createWriteStream(imgPath);
    req.pipe(writeStream);

    // After all the data is saved, resolve this function
    req.on('end', () => {
      // Pass on the result to the recognize function by resolving 
      resolve(tRecognize(imgPath))
    });

    // This is here incase any errors occur
    writeStream.on('error',  (err) => {
      reject(err)
    });
  })

};

module.exports = saveImgTemp;