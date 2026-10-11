var starCanvasSizeX = 0
var starCanvasSizeY = 0

const starCanvas = document.getElementById("stars")
const main = document.getElementsByTagName("main")[0]
const header = document.getElementsByTagName("header")[0]
const particleImage = new Image()
particleImage.src = "particle.png"

var particles = []

function resizeScreen(){
    starCanvas.setAttribute("width", main.clientWidth)
    starCanvas.setAttribute("height", main.clientHeight + header.clientHeight)
    starCanvasSizeX = starCanvas.clientWidth
    starCanvasSizeY = starCanvas.clientHeight

    particles = []

    for (let i = 0; i < Math.floor(starCanvasSizeX*starCanvasSizeY*0.0001); i++){
        p = new Particle(true)
        particles.push(p)
    }


}

window.onresize = resizeScreen;

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

            particles[j] = new Particle(false)

        }
    }
}

class Particle{
    constructor(firstTime){
        this.x = Math.random() * starCanvasSizeX
        if (firstTime){
            this.y = Math.random() * starCanvasSizeY
        }
        else{
            this.y = starCanvasSizeY
        }
        this.velocityy = Math.max(Math.random() * 50, 25)
    }
}

resizeScreen()

let start

function process(timestamp){
    if (start === undefined){
        start = timestamp
    }
    const deltaTime = (timestamp - start) * 0.001
    start = timestamp

    drawStars(deltaTime)

    requestAnimationFrame(process)
}

requestAnimationFrame(process)
