const xlsx = require("xlsx"),
  workbook = xlsx.readFile("./uploads/he-creator.xlsx");

let first_sheet_name = workbook.SheetNames[0];
let second_sheet_name = workbook.SheetNames[1]
let third_sheet_name = workbook.SheetNames[2]
let address_of_cell = "A1";

let worksheet = workbook.Sheets[first_sheet_name];
let desired_cell = worksheet[address_of_cell];

let desired_value = (desired_cell ? desired_cell.v : undefined);

console.log(workbook.__dirname)
console.log(first_sheet_name);
console.log(second_sheet_name);
console.log(third_sheet_name);
console.log(desired_value);
