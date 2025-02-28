//Меню
document.getElementById("menu-toggle").addEventListener("click", function() {
  document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("close-menu").addEventListener("click", function() {
  document.getElementById("sidebar").classList.remove("open");
});
