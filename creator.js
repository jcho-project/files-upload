let excelTable = document.getElementById("excel_table");

function generateTable() {
  let rawData = document.getElementById("excel_data").value

  let rows = rawData.split("\n");

  rows.pop();

  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split("\t");

    excelTable.append(document.createElement("tr"))
  }

  console.log(rawData);
  console.log(rows);
}