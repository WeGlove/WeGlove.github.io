window.onload = function () {
	var names = [
		"Zoni",
		"DJ MC Hongkong Ferienwohnung",
		"Tobi",
		"Tobias Jungbluth",
		"Tobias Jungblut",
		"Tobias Jungbluth ohne h",
		"Tobot"
	]
    document.getElementById('HEAD').innerHTML = "Hello, my name is " + names[Math.floor(Math.random()*names.length)];
};
