const particles = [];
let delayLinesDrawn = true;

function setup() {
  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  const particlesLength = Math.floor(window.innerWidth / 100); // 75
  if (particlesLength > 50) particlesLength = 50;
  let iterations = 0;
  let timer = setInterval(() => {
    particles.push(new Particle());
    iterations++;
    if (iterations == particlesLength) {
      clearInterval(timer);
      setTimeout(() => {
        delayLinesDrawn = false;
      }, 3000);
    }
  }, 350);
}

function draw() {
  //
  background("#1D2937");
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParicles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    // Position
    this.pos = createVector(random(width), random(height - 65));
    // Size
    this.size = 10; //10
    // Velocity
    this.vel = createVector(random(-1, 1), random(-1, 1)); // -1 to 1
  }

  update() {
    //
    this.pos.add(this.vel);
    this.edges();
  }

  draw() {
    noStroke();
    fill("rgba(255,255,255,0.85)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  // Detect edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height - 65) {
      this.vel.y *= -1;
    }
  }

  // Connect particles
  checkParicles(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if (d < 275 && !delayLinesDrawn) {
        // 150
        const alpha = map(d, 0, 275, 0, 0.5);
        stroke(`rgba(255, 255, 255, ${alpha})`);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
