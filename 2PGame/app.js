"use strict";

//----------------//
//--LEFT TO DO----//
//----------------//
//  bulletpool 1  //
//  bulletpool 2  //
//  networking    //
//  boxes 1       //
//  boxes 2       //
//  game logic    //
//----------------//

// Set up classes
const Map = require('./map');
const Player = require('./player');

// Set up canvas variables
var canvas = document.getElementById('screen');
var context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

// Set up initial timing variable
var oldTime = performance.now();

// Set up initial input variables
var input1 = {
  up: false,
  down: false,
  left: false,
  right: false
}

var input2 = {
  up: false,
  down: false,
  left: false,
  right: false
}

// Set up game objects
var map = new Map(width, height);
var player1 = new Player(50, 50, "blue");
var player2 = new Player(width-50, 50, "lightBlue");

// Input handling
window.onkeydown = function(event) {
  switch(event.key) {
    case "ArrowUp":
      input2.up = true;
      event.preventDefault();
      break;
    case "w":
      input1.up = true;
      event.preventDefault();
      break;
    case "ArrowDown":
      input2.down = true;
      event.preventDefault();
      break;
    case "s":
      input1.down = true;
      event.preventDefault();
      break;
    case "ArrowLeft":
      input2.left = true;
      event.preventDefault();
      break;
    case "a":
      input1.left = true;
      event.preventDefault();
      break;
    case "ArrowRight":
      input2.right = true;
      event.preventDefault();
      break;
    case "d":
      input1.right = true;
      event.preventDefault();
      break;
  }
}

// Input handling
window.onkeyup = function(event) {
  switch(event.key) {
    case "ArrowUp":
      input2.up = false;
      event.preventDefault();
      break;
    case "w":
      input1.up = false;
      event.preventDefault();
      break;
    case "ArrowDown":
      input2.down = false;
      event.preventDefault();
      break;
    case "s":
      input1.down = false;
      event.preventDefault();
      break;
    case "ArrowLeft":
      input2.left = false;
      event.preventDefault();
      break;
    case "a":
      input1.left = false;
      event.preventDefault();
      break;
    case "ArrowRight":
      input2.right = false;
      event.preventDefault();
      break;
    case "d":
      input1.right = false;
      event.preventDefault();
      break;
  }
}

// Application loop for timing (calls our game loop each frame)
var masterLoop = function(timestamp) {
	GameLoop(timestamp);
	window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());

// ALL INPUT FOR EACH OBJECT
function Input()
{
	map.input();
	player1.input(input1);
	player2.input(input2);
}

// ALL UPDATES FOR EACH OBJECT
function Update(elapsedTime)
{
	map.update(elapsedTime);
	player1.update(elapsedTime);
	player2.update(elapsedTime);
}

// ALL RENDERING FOR EACH OBJECT
function Render()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	map.render(context);
	player1.render(context);
	player2.render(context);
}

function GameLoop(newTime)
{
	// Get the time inbetween frames
	var elapsedTime = newTime - oldTime;
	oldTime = newTime;

	// Calls these methods once each frame
	Input();
	Update(elapsedTime);
	Render();
}