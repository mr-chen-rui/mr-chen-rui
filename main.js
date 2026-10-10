var starCanvasSizeX = 0
var starCanvasSizeY = 0

const starCanvas = document.getElementById("stars")

function resizeScreen(){
    starCanvasSizeX = starCanvas.clientWidth
    starCanvasSizeY = starCanvas.clientHeight

}

function clearStars(){
    const ctx = starCanvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,starCanvasSizeX,starCanvasSizeY);
}

class Particle{
    constructor(){
        this.x = Math.random() 
    }
}

resizeScreen()