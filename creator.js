function generateTable() {
  let excelTable = document.getElementById("excel_table");
  let thead = document.createElement("thead")
  let rawData = document.getElementById("excel_data").value
  let rows = rawData.split("\n");

  rows.pop();

  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split(/\s+/)
  }

  console.log(rows)

  excelTable.appendChild(thead)

  for (let k = 0; k < rows[0].length; k++) {
    let th = document.createElement("th")
    let headText = document.createTextNode(rows[0][k])

    th.appendChild(headText)
    thead.appendChild(th)
  }

  for (let i = 0; i < rows.length; i++) {
    let tr = document.createElement("tr")

    excelTable.appendChild(tr)

    for (let j = 0; j < rows[i].length; j++) {
      let cell = document.createElement("td")
      let cellText = document.createTextNode(rows[j][j])

      cell.appendChild(cellText)
      tr.appendChild(cell)
    }
  }


}