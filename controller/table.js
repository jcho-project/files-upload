let markForm = document.getElementsByClassName("mark");
let truckForm = document.getElementsByClassName("truck-update");
let truckTd = document.getElementsByClassName("truck-td")

// Select Column onChange submit
for (let i = 0; i < markForm.length; i++) {
  markForm[i].addEventListener("change", function () {
    markForm[i].submit();
  });
};

// Double Click for inline input field creation
for (let i = 0; i < truckTd.length; i++) {
  truckTd[i].addEventListener("dblclick", function (e) {
    let input = document.createElement("input");

    truckTd[i].innerHTML = ""

    truckTd[i].appendChild(input);
  });
};

$(".slotDate-td").dblclick(function (e) {
  let form = $(`<form><form/>`)
  let input = $("<input />", { class: "slotInput", type: "text", name: "slotDate" });

  form.append(input);

  $(this).append(form);
});

let url = "/ha-dd/" + $(".slotDate-td").attr("data-id") + "/slotDate?_method=PUT"

$(".slotDate-td").on("keyup", ".slotInput", function (e) {
  if (e.keyCode === 13) {
    console.log($(".slotDate-td").attr("data-id"));
    console.log($(".slotInput").val())
    $.ajax({
      method: "PUT",
      url: url,
      data: { "Slot Date": "test" }
    })
  }
})

// DataTables
$(document).ready(function () {
  $('#dataTable').DataTable();
});