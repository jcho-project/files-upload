// =========================================================================
// Document Creation Button All Docs
// =========================================================================

$(".all-docs").click(() => {
  let url = "/he-dd/test"

  $.ajax({
    method: "GET",
    url: url,
    dataType: "json",
    data: { "Test": "Test" },
    success: function (response) {
      window.location.href = response.redirect_url;
    }
  })
});