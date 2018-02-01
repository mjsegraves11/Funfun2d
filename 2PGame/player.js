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