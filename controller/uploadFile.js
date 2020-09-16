const fs = require("fs");
const path = require("path");

const saveImgTemp = (req, res, next) => {
  // If necessary, do something whenever a piece of data is received 
  // const cMax = req.headers['content-length'];
  // let cReceived = 0;

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(
      path.join(__dirname, "../store/recognize_me.png")
    );
    req.pipe(writeStream);

    // If necessary, do something whenever a piece of data is received 
    // req.on('data', (chunk) => {
    //   cReceived += chunk.length;
    //   console.log(`Received ${Math.round(cReceived / cMax * 100)}% of data.`);
    // });

    // After all the data is saved, resolve this function
    req.on('end', () => {
      resolve()
    });

    // This is here incase any errors occur
    writeStream.on('error', function (err) {
      console.log(err);
    });
  })

};

module.exports = saveImgTemp;