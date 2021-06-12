var slideIndex = 0;
showSlidesImage();

function showSlidesImage() {
  var i;
  var slides = document.getElementsByClassName("imageslideshow");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlidesImage, 2000); // Change image every 2 seconds
}