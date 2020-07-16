// =========================================================================
// Truck Update
// =========================================================================

// Truck input creation
$(".truck-td").dblclick(function (e) {
  if (!$(this).children(".truckInput").length) {
    if (($(this).length)) {
      $(this).text("")
    }
  }

  let input = $("<input />", { class: "truckInput", type: "text", name: "truckNumber", autofocus: true });

  $(this).append(input);
});

// Truck input submit and db update ajax PUT call
$(".truck-td").on("keyup", ".truckInput", function (e) {
  if (e.keyCode === 13) {
    let url = "/he-dd/" + $(this).parent().siblings(".slotDate-td").attr("data-id") + "/truck?_method=PUT"
    let inputValue = $(this).val()

    $.ajax({
      method: "PUT",
      url: url,
      dataType: "json",
      data: { truck: inputValue },
      success: function (response) {
        window.location.href = response.redirect_url;
      }
    })
  }
})

// =========================================================================
// Slot Date Update
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
$(".slotDate-td").on("keydown", ".slotInput", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();

    let url = "/he-dd/" + $(this).parent().attr("data-id") + "/slotDate?_method=PUT"
    let inputValue = new Date($(".slotInput").val() + " UTC");

    // inputValue.setTime(inputValue.getTime() - new Date().getTimezoneOffset() * 60 * 1000)
    inputValue.setTime(inputValue.getTime())

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

// =========================================================================
// Slot Time Update
// =========================================================================

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
    let url = "/he-dd/" + $(this).parent().prev().attr("data-id") + "/slotTime?_method_PUT";
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

// Reservation No. input creation
$(".reservation-no").dblclick(function (e) {
  if (!$(this).children(".reservationInput").length) {
    if ($(this).length) {
      $(this).text("")
    }

    let input = $("<input />", { class: "reservationInput", type: "text", name: "reservation-no", autofocus: true });

    $(this).append(input);
  }
});

// Reservation No. input submit and db update ajax PUT call
$(".reservation-no").on("keyup", ".reservationInput", function (e) {
  if (e.keyCode === 13) {
    let url = "/he-dd/" + $(this).parent().siblings(".slotDate-td").attr("data-id") + "/reservationNo?_method_PUT"
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
// Delete Selected & Checkboxes
// =========================================================================

$(".delete-dd").click(() => {
  let url = "/he-dd/" + "?_method_DELETE";
  let ids = [];

  $(".checkbox:checked").each(function (index, value) {
    ids.push($(this).parent().siblings(".slotDate-td").attr("data-id"));
  });

  console.log(ids);

  // console.log($(".checkbox-td").siblings(".slotDate-td").attr("data-id"));

  // console.log($(".checkbox-td").attr("data-id"))

  // console.log(ids);

  $.ajax({
    method: "DELETE",
    url: url,
    dataType: "json",
    data: { "Delete Id": ids }
  })
});

// =========================================================================
// Datatables Initialization & Custom Sort
// =========================================================================

// Custom Sorting including Empty Cells
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  "non-empty-string-asc": function (str1, str2) {
    if (str1 == "")
      return 1;
    if (str2 == "")
      return -1;
    return ((str1 < str2) ? -1 : ((str1 > str2) ? 1 : 0));
  },

  "non-empty-string-desc": function (str1, str2) {
    if (str1 == "")
      return 1;
    if (str2 == "")
      return -1;
    return ((str1 < str2) ? 1 : ((str1 > str2) ? -1 : 0));
  }
});

// DataTables Initialization HE
$(document).ready(function () {
  $('#he-dataTable').DataTable({
    "pageLength": 50,
    columnDefs: [
      { type: "non-empty-string", targets: 0 },
      { type: "non-empty-string", targets: 5 },
      { type: "non-empty-string", targets: 6 },
      { type: "non-empty-string", targets: 7 }
    ]
  });
});
