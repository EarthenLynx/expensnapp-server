const Tesseract = require("tesseract.js");
const { createWorker } = Tesseract;
const fs = require("fs");

const tRecognize = async (filepath) => {
  const img = fs.readFileSync(filepath);

  const worker = createWorker({
    logger: m => console.log(m), // Add logger here
  });
  await worker.load();
  await worker.loadLanguage('deu');
  await worker.initialize('deu');
  await worker.setParameters({
    tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZäüö ",
  });
  const { data: { text } } = await worker.recognize(img);
  await worker.terminate();

  return text;
}

module.exports = { tRecognize }; 
