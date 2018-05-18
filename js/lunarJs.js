

var game = document.getElementById("gameWindow");
var gameRect = game.getBoundingClientRect();
var gameHeight = Math.round(gameRect.bottom - gameRect.top);
var gameWidth = Math.round(gameRect.right - gameRect.left);



var moonImage = document.getElementById("moon");
moonImage.style.zIndex = "0";

var landerImage = document.getElementById('lander');
landerImage.style.position = "absolute";
landerImage.style.zIndex = "0";
landerImage.style.display = "block";



var targetImage = document.getElementById('target');
targetImage.style.position = "absolute";
targetImage.style.zIndex = "0";
targetImage.style.display = "block";

var flameImage = document.getElementById('flame');
flameImage.style.position = "absolute";
flameImage.style.zIndex = "0";
flameImage.style.display = "none";

var blowUpImage = document.getElementById('blowup');
blowUpImage.style.position = "absolute";
blowUpImage.style.zIndex = "1";
blowUpImage.style.display = "none";



var targetX;
var targetY;
var targetWidth = 120;

var menu = document.getElementById("screen");
var menuRect = menu.getBoundingClientRect();
var menuHeight = Math.round(menuRect.bottom - menuRect.top);
var menuWidth = Math.round(menuRect.right - menuRect.left);

var landerX;
var landerY;
var landerWidth = 110;
var landerDX;
var landerDY;
var crashed  = false;
var moving = false;

var flameX;
var flameY;

var id = setInterval(frame, 40);





function frame() {
	moveLander();
}


function moveLander() {

	if(moving === true){
		if(checkForTargetWin() === false){
			landerX += landerDX;
			landerY += landerDY;
			landerDY +=1;

			if( landerX <= menuWidth + 40 && landerDX < 0){

				console.log("landerX is: " + landerX + ". menuWidth is " + menuWidth);
				landerX = menuWidth + 40;
				landerDX = 0;
				console.log("x left shutdown");
			}
			if( (landerX > (menuWidth + 40 + (gameWidth - landerWidth))) && landerDX > 0){
				landerX = menuWidth + 40 + (gameWidth - landerWidth);
				landerDX = 0;
				console.log("x right shutdown");
			}


			if(landerY >= gameHeight - landerWidth){
				landerY = gameHeight - landerWidth;

				if(landerDY>4) {
					crashed = true;
					landerDX = 0;
				}

				landerDY = 0;
				landerDX = 0;

			}

			if(crashed === false) {
				landerImage.style.left = landerX + 'px';
				landerImage.style.top = landerY + 'px';
				setFlamePosition();

			} else {
				moving = false;
				landerImage.style.display = "none";
				hideFlame();
				blowUpImage.style.left = menuWidth + 30 + landerX + 'px';
				blowUpImage.style.top = landerY + 'px';
				blowUpImage.style.display = "block";

			}
		} else {
			flameImage.style.display = "none";
			moving = false;
			landerDX = 0;
			landerDY = 0;
			setTimeout(doTheWinAlert, 750);

			
		}
	}
}





function setLanderLocation() {
	crashed = false;
	landerImage.style.display = "block";
	blowUpImage.style.display = "none";

	landerY = 0;
	landerX = menuWidth+30+Math.round(gameWidth/2)-Math.round(landerWidth/2);
	landerImage.style.left = landerX + 'px';
	landerImage.style.top = landerY + 'px';
	setFlamePosition();

}

function setTargetLocation() {


	targetY = gameHeight-30;
	targetX = menuWidth + 10 + Math.round(Math.random() * (gameWidth - targetWidth - 20));

	targetImage.style.left = targetX + 'px';
	targetImage.style.top = targetY + 'px';
}



function setFlamePosition() {
	flameX = landerX + 40;
	flameY = landerY + 80;
	flameImage.style.top = flameY + 'px';
	flameImage.style.left = flameX + 'px';
}

function showFlame() {
	flameImage.style.display = "block";
}

function hideFlame() {
	flameImage.style.display = "none";
}

function resetAnimation(){
	landerDY = 0;
	landerDX = 0;
	setTargetLocation();
	setLanderLocation();

}

function startAnimation() {
	moving = true;
	landerDY = 3;

}


function checkForTargetWin(){
	var didIWin = false;

	if(Math.abs(landerX - targetX) < 30) {
		if(((targetY + 5)-(landerY + 80)) < 20) {
			if(Math.abs(landerDY) < 6){
				didIWin = true;
			}
		}
	}
	return didIWin;
}


function doTheWinAlert(){
	alert("Nice Job dude!!")
}

setTargetLocation();
setLanderLocation();
showFlame();

document.getElementById('reset').onclick = resetAnimation;
document.getElementById('start').onclick = startAnimation;





document.onkeydown = function(e){


	switch(e.keyCode) {
		case 32:
			crashed = false;
			resetAnimation();
			startAnimation();
			break;

		case 37:

			landerDX += -1;
			showFlame();
			break;

		case 38:
			landerDY -=9;
			showFlame();
			break;

		case 39:
			landerDX += 1;
			showFlame();
			break;

		case 40:
			break;
	}
}



document.onkeyup = function(e){
	switch(e.keyCode){
		case 32:
		break;
		case 37:
			hideFlame();
		break;
		case 38:
		hideFlame();
		break;
		case 39:
			hideFlame();
		break;

		case 40:
		break;
	}
}








