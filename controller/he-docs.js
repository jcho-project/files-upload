// =========================================================================
// Document Creation Button All Docs
// =========================================================================

$(".all-docs").click(() => {
  let url = "/he-dd/alldocs?_method_PUT"

  $.ajax({
    method: "PUT",
    url: url,
    dataType: "json",
    data: { "Test": "Test" },
    success: function (response) {
      window.location.href = response.redirect_url;
    }
  })
});