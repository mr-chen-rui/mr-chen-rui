var starCanvasSizeX = 0
var starCanvasSizeY = 0

const starCanvas = document.getElementById("stars")
const particleImage = new Image()
particleImage.src = "particle.png"

var particles = []

function resizeScreen(){
    starCanvasSizeX = starCanvas.clientWidth
    starCanvasSizeY = starCanvas.clientHeight

}

function getDistance(ax, ay, bx, by){
    return Math.sqrt(Math.pow(ax-bx,2)+Math.pow(ay-by, 2))
}

function drawStars(delta){
    const ctx = starCanvas.getContext("2d");
    ctx.clearRect(0,0,starCanvasSizeX,starCanvasSizeY);

    for (var j = 0; j < particles.length; j++){
        var i = particles[j]
        i.y -= i.velocityy * delta;
        ctx.drawImage(particleImage, i.x, i.y)
        if (i.y <= -10){

            particles[j] = new Particle()

        }
    }
}

class Particle{
    constructor(){
        this.x = Math.random() * starCanvasSizeX
        this.y = Math.random() * starCanvasSizeY
        this.velocityy = Math.max(Math.random()*0.1, 0.05)
    }
}

resizeScreen()

for (let i = 0; i < 100; i++){
    p = new Particle()
    particles.push(p)
}

let start

function process(timestamp){
    if (start === undefined){
        start = timestamp
    }
    const deltaTime = (timestamp - start) * 0.001

    drawStars(deltaTime)

    requestAnimationFrame(process)
}

requestAnimationFrame(process)
