const heading = document.getElementById("myHeading");

heading.addEventListener("click", () => {
  heading.textContent = "You clicked me!";
  heading.style.color = "blue";
});