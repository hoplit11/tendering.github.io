
 $(document).ready(function(){
  //Carousel-->
  /*Carousel cycle frecuency*/
  $("#mycarousel").carousel( { interval: 2000});
  /**/
  $("#carouselButton").click(function() {
    if ($("#carouselButton").children("span").hasClass('fa-pause')) { /*if the span tag has the fa-pause class when is click  do*/
      $("#mycarousel").carousel('pause'); /*pause the carousel*/
      $("#carouselButton").children("span").removeClass('fa-pause');/*remove the pause button*//*fliping the pause button to a play button*/
      $("#carouselButton").children("span").addClass('fa-play'); /*add the play button*//*fliping the pause button to a play button*/
    }
    else if ($("#carouselButton").children("span").hasClass('fa-play')){ /* else if the span tag has fa-play tag when is click do*/
      $("#mycarousel").carousel("cycle"); /*cycle the carousel*/
      $("#carouselButton").children("span").addClass('fa-pause');/*add the class fa-pause(icon) to the span tag */
    }
  });

  //ReserveTable Modal
  /*modal is triggered when the button is clicked*/
  $("#ReserveTable").click(function(){
    $("#reserveForm").modal("show");
  });
  /*modal is hide when the x is clicked */
  $("#hideX").click(function(){
    $("#reserveForm").modal("hide");
  });
  /*modal is hide when the cancel button is clicked*/
  $("#hideCancell").click(function(){
    $("#reserveForm").modal("hide");
  });

  //Login Modal
  /*Login modal Method*/
  $('#loginModal').click(function(){
      $('#loginForm').modal('show');
  });
  /*Login modal Method close for the X*/
  $('#closeLog').click(function(){
      $('#loginForm').modal('hide');
  });
  /*Login modal Method close Cancel*/
  $('#closeLogcancel').click(function(){
      $('#loginForm').modal('hide');
  });

  });

  /* side bar scrips*/

  /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}

