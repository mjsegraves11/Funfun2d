(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./map":2,"./player":3}],2:[function(require,module,exports){
"use strict";

module.exports = exports = Map;

function Map(totalWidth, totalHeight) {
  this.width = totalWidth;
  this.height = totalHeight;
  this.mapBlockWidth = totalWidth/8;
  this.mapBlockHeight = totalHeight/8;
  this.halfWidth = totalWidth/16;
  this.halfHeight = totalHeight/16;
}

Map.prototype.input = function(){}

Map.prototype.update = function(elapsedTime)
{

}

Map.prototype.render = function(context)
{
  // Left side of the map
  for(var y=0; y<this.height; y+=this.mapBlockHeight)
  {
    this.DrawMapBlock(context, 0, y, "green");
    this.DrawMapBlock(context, this.mapBlockWidth, y, "green");
  }
  for(var x=(this.mapBlockWidth*2); x<this.width/2; x+=this.mapBlockWidth)
  {
    this.DrawMapBlock(context, x, this.height-this.mapBlockHeight, "green");
    this.DrawMapBlock(context, x, this.height-(2*this.mapBlockHeight), "green");
    this.DrawMapBlock(context, x, this.height-(3*this.mapBlockHeight), "green");
  }

  // Middle of the map
  this.DrawMapBlock(context, (this.mapBlockWidth*2)+this.halfWidth, this.halfHeight, "black");
  this.DrawMapBlock(context, (this.mapBlockWidth*2)+this.halfWidth, (this.mapBlockHeight*3)+this.halfHeight, "black");
  this.DrawMapBlock(context, (this.mapBlockWidth*4)+this.halfWidth, this.halfHeight, "black");
  this.DrawMapBlock(context, (this.mapBlockWidth*4)+this.halfWidth, (this.mapBlockHeight*3)+this.halfHeight, "black");

  // Right side of the map
  for(var y=0; y<this.height; y+=this.mapBlockHeight)
  {
    this.DrawMapBlock(context, this.width-this.mapBlockWidth, y, "lightGreen");
    this.DrawMapBlock(context, this.width-(2*this.mapBlockWidth), y, "lightGreen");
  }
  for(var x=this.width-(this.mapBlockWidth*3); x>this.width/2-this.mapBlockWidth; x-=this.mapBlockWidth)
  {
    this.DrawMapBlock(context, x, this.height-this.mapBlockHeight, "lightGreen");
    this.DrawMapBlock(context, x, this.height-(2*this.mapBlockHeight), "lightGreen");
    this.DrawMapBlock(context, x, this.height-(3*this.mapBlockHeight), "lightGreen");
  }

  // Border
  context.moveTo(0, 0);
  context.lineTo(0, this.height);
  context.stroke();
  context.moveTo(0, this.height);
  context.lineTo(this.width, this.height);
  context.stroke();
  context.moveTo(this.width, this.height);
  context.lineTo(this.width, 0);
  context.stroke();
  context.moveTo(this.width, 0);
  context.lineTo(0, 0);
  context.stroke();
}

Map.prototype.DrawMapBlock = function(context, x, y, color)
{
  context.fillStyle = color;
  context.fillRect(x, y, this.mapBlockWidth, this.mapBlockHeight);
}


},{}],3:[function(require,module,exports){
"use strict";

const PLAYER_SPEED = 5;

module.exports = exports = Player;

function Player(start_x, start_y, color) {
  this.alive = true;
  this.position = {x: start_x, y: start_y};
  this.velocity = {x: 0, y: 0};
  this.health = 1000;
  this.color = color;
}

Player.prototype.alive = function(){ return this.alive; }
Player.prototype.position = function(){ return this.position; }
Player.prototype.velocity = function(){ return this.velocity; }
Player.prototype.health = function(){ return this.health; }

Player.prototype.input = function(currentInput)
{
  this.velocity.x = 0;
  this.velocity.y = 0;

  if(currentInput.up) this.velocity.y = -PLAYER_SPEED;
  if(currentInput.down) this.velocity.y = PLAYER_SPEED;
  if(currentInput.left) this.velocity.x = -PLAYER_SPEED;
  if(currentInput.right) this.velocity.x = PLAYER_SPEED;
  if(currentInput.up && currentInput.left) {
    this.velocity.y = -(Math.cos(Math.PI/4) * PLAYER_SPEED);
    this.velocity.x = -(Math.cos(Math.PI/4) * PLAYER_SPEED);
  }
  if(currentInput.up && currentInput.right) {
    this.velocity.y = -(Math.cos(Math.PI/4) * PLAYER_SPEED);
    this.velocity.x = (Math.cos(Math.PI/4) * PLAYER_SPEED);
  }
  if(currentInput.down && currentInput.left) {
    this.velocity.y = (Math.cos(Math.PI/4) * PLAYER_SPEED);
    this.velocity.x = -(Math.cos(Math.PI/4) * PLAYER_SPEED);
  }
  if(currentInput.down && currentInput.right) {
    this.velocity.y = (Math.cos(Math.PI/4) * PLAYER_SPEED);
    this.velocity.x = (Math.cos(Math.PI/4) * PLAYER_SPEED);
  }
}

Player.prototype.update = function(elapsedTime)
{
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
}

Player.prototype.render = function(context)
{
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.position.x, this.position.y, 40, 0, 2*Math.PI);
  context.stroke();
  context.fill();
}
},{}]},{},[1]);
