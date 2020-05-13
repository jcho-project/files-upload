const xlsx = require("xlsx"),
  workbook = xlsx.readFile("./uploads/he-creator.xlsx");

let data = xlsx.utils.sheet_to_json(workbook.Sheets["HE_Factory_(Swiss)"], { header: 1 })

let first_sheet_name = workbook.SheetNames[0];
let address_of_cell = "D6";

let worksheet = workbook.Sheets[first_sheet_name];
let desired_cell = worksheet[address_of_cell];

let desired_value = (desired_cell ? desired_cell.v : undefined);

function wb_has_macro(wb) {
  if (!!wb.vbaraw) {
    console.log("macro available")
  };
  // const sheets = wb.SheetNames.map((n) => wb.Sheets[n]);
  // return sheets.some((ws) => !!ws && ws['!type'] == 'macro');
}

console.log(first_sheet_name);
console.log(desired_value);
console.log(data);