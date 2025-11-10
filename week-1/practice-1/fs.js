const fs = require("fs");
const path = require("path");
const oldPath = path.join(__dirname, "data_2.txt");
const newPath = path.join(__dirname, "data", "data_2.txt");

fs.rename(oldPath, newPath, (err) => {
  if (!err) {
    console.log("file has been moved successfully");
  } else {
    console.log("error occured", err);
  }
});
