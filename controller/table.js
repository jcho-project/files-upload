// =========================================================================
// Truck Update
// =========================================================================

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

// =========================================================================
// Slot Date & Time Update
// =========================================================================

// Slot Date input creation
$(".slotDate-td").dblclick(function (e) {
  if (!$(this).children(".slotInput").length) {
    if ($(this).length) {
      $(this).text("")
    }

    let input = $("<input />", { class: "slotInput", type: "date", name: "slotDate", autofocus: true });

    $(this).append(input);
  }
});

// Slot Date input submit and db update ajax PUT call
$(".slotDate-td").on("keyup", ".slotInput", function (e) {
  if (e.keyCode === 13) {
    let url = "/ha-dd/" + $(this).parent().attr("data-id") + "/slotDate?_method=PUT"
    let inputValue = new Date($(".slotInput").val() + " UTC");

    inputValue.setTime(inputValue.getTime() - new Date().getTimezoneOffset() * 60 * 1000)

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
  if (!$(this).children(".slotTimeInput").length) {
    if ($(this).length) {
      $(this).text("")
    }

    let input = $("<input />", { class: "slotTimeInput", type: "text", name: "slotTime", autofocus: true });

    $(this).append(input);
  }
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

// =========================================================================
// Reservation No. Update
// =========================================================================

$(".reservation-no").dblclick(function (e) {
  if (!$(this).children(".reservationInput").length) {
    if ($(this).length) {
      $(this).text("")
    }

    let input = $("<input />", { class: "reservationInput", type: "text", name: "reservation-no", autofocus: true });

    $(this).append(input);
  }
});

$(".reservation-no").on("keyup", ".reservationInput", function (e) {
  if (e.keyCode === 13) {
    let url = "/ha-dd/" + $(this).parent().siblings(".slotDate-td").attr("data-id") + "/reservationNo?_method_PUT"
    let inputValue = $(this).val();

    $.ajax({
      method: "PUT",
      url: url,
      dataType: "json",
      data: { "Reservation No": inputValue },
      success: function (response) {
        window.location.href = response.redirect_url;
      }
    })
  }
});

// =========================================================================
// Datatables Initialization
// =========================================================================

// DataTables
$(document).ready(function () {
  $('#dataTable').DataTable({
    "pageLength": 50
  });
});