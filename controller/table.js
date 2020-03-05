let markForm = document.getElementsByClassName("mark");

let truckForm = document.getElementsByClassName("truck-update");

let truckTd = document.getElementsByClassName("truck-td")

// Select Column onChange submit
for (let i = 0; i < markForm.length; i++) {
  markForm[i].addEventListener("change", function () {
    markForm[i].submit();
  });
};

for (let i = 0; i < truckTd.length; i++) {
  truckTd[i].addEventListener("dblclick", function (e) {
    let test = document.createElement("input");

    truckTd[i].innerHTML = ""

    truckTd[i].appendChild(test);
  });
};



/* <form class="truck-update" action="/ha-dd/<%= detail._id %>/truck?_method=PUT" method="POST"> */

// ZingGrid

// // DataTables
// $(document).ready(function () {
//   $('#dataTable').DataTable();
// });