window.onload = function () {
	var names = data[0]["Name_Msg"];
	var activities = data[0]["Doing_Msg"];
    document.getElementById('WhoIAm').innerHTML = "Hello, my name is " + names[Math.floor(Math.random()*names.length)];
	document.getElementById('WhatIAmDoing').innerHTML = "I am " + activities[Math.floor(Math.random()*activities.length)];
};
