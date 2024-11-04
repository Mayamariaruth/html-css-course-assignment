document.addEventListener('DOMContentLoaded', function() {
    const navBox = document.getElementById('nav-box');
    const header = document.querySelector('header');
  
    navBox.addEventListener('click', function() {
        header.classList.toggle('active');
    });
});