//Hambuerger Menu

const hamburger = document.getElementById('hamburger');
const navUlLeft = document.getElementById('navUlLeft');
const navUlRight = document.getElementById('navUlRight');

hamburger.addEventListener('click', () => {
	navUlLeft.classList.toggle('show');
	navUlRight.classList.toggle('show');
});