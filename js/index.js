window.onload = function () {
	var names = [
		"Zoni",
		"DJ MC Hongkong Ferienwohnung",
		"Tobi",
		"Tobias Jungbluth",
		"Tobias Jungblut",
		"Tobias Jungbluth ohne h",
		"Tobot",
		"Diggi",
		"Dein Freund Tobi",
		"Traubentobias",
		"Bodenmensch",
		"Tobi Tebi Taben Torben Torsten Hauptachsentransformation xXDoggolover96Xx Gram-Schmidt-Verfahren Penisdestroyer Singulärwertzerlegung",
		"Bia",
		"WeGlove",
		"TPJ",
		"Bili",
		"Tobens",
		"Juniorelf",
		"die beste Soraka",
		"der beste Jhin"
	];
	var activites = [
		"slapping",
		"coding something",
		"making triangles",
		"admiring you",
		"vomiting in some toilet",
		"reading Papers",
		"working",
		"making memories",
		"playing games",
		"casting fireballs",
		"petting my dog",
		"doggoing",
		".",
		"on a Spongebob marathon",
		"making \"art\"",
		"talking about life",
		"still mad at Jojo for that one time I was standing in front of Boudicca with my 3 missionaries when he declared war on them",
		"playing bad games",
		"protecting weak men",
		"writing a highschool wrestling fanfiction",
		"hosting a cultural exchange",
		"coding this website",
		"starting projects I am never going finish",
		"showing the police my underwear",
		"famous on YouTube",
		"eating Zwieback"
	];
    document.getElementById('WhoIAm').innerHTML = "Hello, my name is " + names[Math.floor(Math.random()*names.length)];
	document.getElementById('WhatIAmDoing').innerHTML = "I am " + activites[Math.floor(Math.random()*activites.length)];
};
