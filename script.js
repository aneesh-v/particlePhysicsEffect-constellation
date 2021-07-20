/**@type {DOMTokenList} */
/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const mouse = {
	x: undefined,
	y: undefined,
};
const particleArray = [];
let hue = 1;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

canvas.addEventListener('click', function (e) {
	mouse.x = e.x;
	mouse.y = e.y;
	for (i = 0; i < 5; i++) {
		particleArray.push(new Particle());
	}
	// drawCircle();
});
canvas.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
	for (i = 0; i < 5; i++) {
		particleArray.push(new Particle());
	}
	// drawCircle();
});

class Particle {
	constructor() {
		// this.x = Math.random() * canvas.width;
		// this.y = Math.random() * canvas.height;
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = Math.random() * 7 + 5;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
		this.color = `hsl(${hue}, 100%, 50%)`;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) {
			this.size -= 0.1;
			// console.log(this.size);
		}
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

// function init() {
// 	for (let i = 0; i < 100; i++) {
// 		particleArray.push(new Particle());
// 	}

// }
// init();

function handleParticle() {
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].update();
		particleArray[i].draw();
		// For checking the distance between each particle we use for loop
		// to prevent it checking already looped particle we use j=i declaration
		for (j = i; j < particleArray.length; j++) {
			const dx = particleArray[i].x - particleArray[j].x;
			const dy = particleArray[i].y - particleArray[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particleArray[i].color;
				// ctx.lineWidth = particleArray[i].size / 10;
				ctx.lineWidth = 0.2;

				ctx.moveTo(particleArray[i].x, particleArray[i].y);
				ctx.lineTo(particleArray[j].x, particleArray[j].y);
				ctx.stroke();
				ctx.closePath();
			}
		}
		// console.log('particle size', particleArray[i].size);
		if (particleArray[i].size <= 0.3) {
			particleArray.splice(i, 1);
			// Since we are deleting element from somewhere in the middle
			// if we don't minus one from 'i', the next element will skip in the for loop
			// because array length is reduced in if loop. and it will create glich in the animation
			i--;
		}
	}
}

function animate() {
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgba(0,0,0,0.6)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	handleParticle();
	requestAnimationFrame(animate);
	hue += 2;
}

animate();
