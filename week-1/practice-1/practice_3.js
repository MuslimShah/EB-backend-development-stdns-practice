// console.log("program started");
const fs = require("fs");
const path = require("path");
// fs.writeFileSync("data_1.txt", "Hello i have created a file", "utf-8");
// console.log("file created successfully");
// console.log("program ended");

// console.log("1:program started");
const filePath = path.join(__dirname, "data");
// fs.writeFile(
//   `${filePath}/data_3.txt`,
//   "Hello i am writing asynchrounously",
//   "utf-8",
//   (err) => {
//     if (!err) {
//       console.log("3:File created successfully");
//     } else {
//       console.log("Error", err);
//     }
//   }
// );
// console.log("2:program ended");

// fs.appendFileSync("data_1.txt", "\nappended data added to the file", "utf-8");

// fs.appendFile(
//   "data_2.txt",
//   "\n i second appended data to data 2",
//   "utf-8",
//   (err) => {
//     if (!err) {
//       console.log("file appended successfully");
//     } else {
//       console.log("error", err);
//     }
//   }
// );

// fs.readFile("data_2.txt", "utf-8", (err, data) => {
//   if (!err) {
//     console.log("oops an error occured", err);
//   }
//   console.log("File data:", data);
// });

// fs.rename("myData.txt", "data_2.txt", (err) => {
//   if (!err) {
//     console.log("file has been renamed");
//   } else {
//     console.log("error occured");
//   }
// });

fs.unlink("users.json", (err) => {
  if (!err) {
    console.log("file deleted successfully");
  } else {
    console.log("error occured", err);
  }
});
