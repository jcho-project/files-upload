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
  let input = $("<input />", { class: "slotInput", type: "text", name: "slotDate" });

  $(this).append(input);
});

// Slot Date input submit and db update ajax PUT call
$(".slotDate-td").on("keyup", ".slotInput", function (e) {
  if (e.keyCode === 13) {
    let url = "/ha-dd/" + $(this).parent().attr("data-id") + "/slotDate?_method=PUT"
    let inputValue = new Date($(".slotInput").val() + " UTC");

    $.ajax({
      method: "PUT",
      url: url,
      dataType: "json",
      data: { "Slot Date": inputValue },
      success: function (response) {
        window.location.href = response.redirect_url;
      }
    });
  }
});

// Slot Time input creation
$(".slotTime-td").dblclick(function (e) {
  let input = $("<input />", { class: "slotTimeInput", type: "text", name: "slotTime" });

  $(this).append(input);
});

// Slot Time input submit and db update ajax PUT call
$(".slotTime-td").on("keyup", ".slotTimeInput", function (e) {
  if (e.keyCode === 13) {
    let url = "/ha-dd/" + $(this).parent().prev().attr("data-id") + "/slotTime?_method_PUT";
    let inputValue = $(this).val();

    inputValue = inputValue.split(":");

    $.ajax({
      method: "PUT",
      url: url,
      dataType: "json",
      data: { "Slot Time": inputValue },
      success: function (response) {
        window.location.href = response.redirect_url;
      }
    });
  }
});

// DataTables
$(document).ready(function () {
  $('#dataTable').DataTable();
});