var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

var canvas = document.getElementById('particles');
var clone = document.getElementById('blurCanvas');

var cloneCtx = clone.getContext('2d');
var ctx = canvas.getContext('2d');

var ww = w.innerWidth || e.clientWidth || g.clientWidth;
var wh = w.innerHeight|| e.clientHeight|| g.clientHeight;
canvas.width = ww;
canvas.height= wh;
var partCount = 25;
var particles = [];

function getDefinedColor() {
  var colors = ['rgba(100,200,220,'+ (Math.random()-0.3)+')'];
  var random = Math.floor(Math.random() * colors.length)
  return colors[random];
}

function particle(){
  this.color = getDefinedColor();
  // console.log(this.color);
  this.x = randomInt(0,ww);
  this.y = randomInt(0,wh);
  this.direction = {
    "x": -1 + Math.random() * 2,
    "y": -1 + Math.random() * 2
  };
  this.vx = 0.9 * Math.random();
  this.vy = 0.9 * Math.random();
  this.radius = randomInt(4,3);
  this.float = function(){
    this.x += this.vx * this.direction.x;
    this.y += this.vy * this.direction.y;
  };
  this.changeDirection = function (axis) {
    this.direction[axis] *= -1;
  };
  this.boundaryCheck = function () {
    if (this.x >= ww) {
      this.x = ww;
      this.changeDirection("x");
    } else if (this.x <= 0) {
      this.x = 0;
      this.changeDirection("x");
    }
    if (this.y >= wh) {
      this.y = wh;
      this.changeDirection("y");
    } else if (this.y <= 0) {
      this.y = 0;
      this.changeDirection("y");
    }
  };
  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  };
}

function clearCanvas() {
 cloneCtx.clearRect(0, 0, ww, wh);
 ctx.clearRect(0, 0, ww, wh);
}

function createParticles(){
  for (i=0;i<partCount;i++){
    var p = new particle();
    particles.push(p);
  }
}

function drawParticles() {
 for (i=0;i<particles.length;i++) {
   p = particles[i];
   p.draw();
 }
}

function updateParticles() {
  for (var i = particles.length - 1; i >= 0; i--) {
    p = particles[i];
    p.float();
    p.boundaryCheck();
  }
}

createParticles();
drawParticles();

function animateParticles() {
  clearCanvas();
  drawParticles();
  updateParticles();
  cloneCtx.drawImage(canvas, 0, 0);
  requestAnimationFrame(animateParticles);
}

requestAnimationFrame(animateParticles);
cloneCtx.drawImage(canvas, 0, 0);

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

addEvent(w, 'resize', resizer());

function resizer(){
  ww = w.innerWidth || e.clientWidth || g.clientWidth;
  wh = w.innerHeight|| e.clientHeight|| g.clientHeight;
  canvas.width = ww;
  canvas.height= wh;
  clearCanvas();
  particles = [];
  createParticles();
  drawParticles();
}

function randomInt(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function velocityInt(min,max) {
  return Math.random()*(max-min+1)+min;
}