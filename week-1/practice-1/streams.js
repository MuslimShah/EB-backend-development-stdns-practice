const fs = require("fs");

const readStream = fs.createReadStream("data_1.txt");

// readStream.on("data", (data) => {
//   console.log(data.toString());
// });
// readStream.on("end", () => {
//   console.log("data finished");
// });

// readStream.on("error", (err) => {
//   console.log("error occured", err);
// });

// const fs = require("fs");
const writeStream = fs.createWriteStream("streamData.txt");
// writeStream.write("hello this is file data\n");
// writeStream.write("hello this is file data 2\n");
// writeStream.end();
// writeStream.on("finish", () => {
//   console.log("write completed");
// });

readStream.pipe(writeStream);
