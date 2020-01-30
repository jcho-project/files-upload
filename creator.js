function generateTable() {
  let excelTable = document.getElementById("excel_table");
  let thead = document.createElement("thead")
  let rawData = document.getElementById("excel_data").value
  let rows = rawData.split("\n");

  // Delete trailing row
  rows.pop();

  // Remove all spaces
  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split(/\s+/)
  }

  console.log(rows)

  // Append thead to table in index.html
  excelTable.appendChild(thead)

  // Loop to add th to thead from pasted data from user
  for (let k = 0; k < rows[0].length; k++) {
    let th = document.createElement("th")
    let headText = document.createTextNode(rows[0][k])

    th.appendChild(headText)
    thead.appendChild(th)
  }

  // Loop to add td to tr from pasted data from user
  for (let i = 0; i < rows.length; i++) {
    let tr = document.createElement("tr")

    excelTable.appendChild(tr)

    for (let j = 0; j < rows[i].length; j++) {
      let cell = document.createElement("td")
      let cellText = document.createTextNode(rows[i + 1][j])

      cell.appendChild(cellText)
      tr.appendChild(cell)
    }
  }


}