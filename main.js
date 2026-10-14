var starCanvasSizeX = 0
var starCanvasSizeY = 0

const starCanvas = document.getElementById("stars")
const main = document.getElementsByTagName("main")[0]
const header = document.getElementsByTagName("header")[0]
const html = document.getElementsByTagName("html")[0]

const particleImage = new Image()
particleImage.src = "Assets/particle.png"

const particleImageBlue = new Image()
particleImageBlue.src = "Assets/particleblue.png"
const linkLength = 100

var mousex = 0
var mousey = 0

var particles = []

function resizeScreen(){
    console.log("Reloaded Page!")
    starCanvas.setAttribute("width", html.clientWidth)
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
onfocus = resizeScreen;

function getDistance(ax, ay, bx, by){
    return Math.sqrt(Math.pow(ax-bx,2)+Math.pow(ay-by, 2))
}

function handleMouseMove(event){
    event = event || window.event
    mousex = event.pageX
    mousey = event.pageY
}

document.onmousemove = handleMouseMove

function drawStars(delta){
    
    const ctx = starCanvas.getContext("2d");
    ctx.clearRect(0,0,starCanvasSizeX,starCanvasSizeY);

    for (var j = 0; j < particles.length; j++){
        var p1 = particles[j]
        p1.y -= p1.velocityy * delta;

        if (p1.image){
            ctx.drawImage(particleImage, p1.x, p1.y)
        }
        else{
            ctx.drawImage(particleImageBlue, p1.x, p1.y)
        }
        if (p1.y <= -10){

            particles[j] = new Particle(false)

        }
        for (var k = 0; k < particles.length; k++){
            if (j == k){
                continue
            }
            var p2 = particles[k]
            var dist = getDistance(p1.x,p1.y,p2.x,p2.y)
            if (dist < linkLength){
                ctx.strokeStyle =`rgba(255,255,255,${0.1+(1/linkLength)}`
                ctx.beginPath()
                ctx.moveTo(p1.x + 2,p1.y + 2)
                ctx.lineTo(p2.x + 2,p2.y + 2)
                ctx.stroke();
            }
        }

        var dist = getDistance(p1.x,p1.y,mousex,mousey)
        if (dist < linkLength){
            ctx.strokeStyle =`rgba(255,255,255,${0.2+(1/linkLength)}`
            ctx.beginPath()
            ctx.moveTo(p1.x + 2,p1.y + 2)
            ctx.lineTo(mousex,mousey)
            ctx.stroke();
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

        this.image = Math.random() >= 0.5
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

    if (deltaTime>1){
        resizeScreen()
    }
    drawStars(deltaTime)

    requestAnimationFrame(process)
}

requestAnimationFrame(process)
