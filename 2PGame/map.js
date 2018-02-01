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

