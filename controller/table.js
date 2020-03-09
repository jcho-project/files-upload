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

// Slot Date input creation
$(".slotDate-td").dblclick(function (e) {
  // let form = $(`<form><form/>`)
  let input = $("<input />", { class: "slotInput", type: "text", name: "slotDate" });

  // form.append(input);

  $(this).append(input);
});

// Slot Date input submit and db update ajax PUT call
$(".slotDate-td").on("keyup", ".slotInput", function (e) {
  if (e.keyCode === 13) {
    let url = "/ha-dd/" + $(".slotDate-td").attr("data-id") + "/slotDate?_method=PUT"
    let inputValue = $(".slotInput").val()

    $.ajax({
      method: "PUT",
      url: url,
      dataType: "json",
      data: { "Slot Date": $(".slotInput").val() },
      success: function (response) {
        window.location.href = response.redirect_url;
      }
    })
  }
})

// DataTables
$(document).ready(function () {
  $('#dataTable').DataTable();
});