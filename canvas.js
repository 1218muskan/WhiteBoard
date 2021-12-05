let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColors = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.getElementById("download");
let undo  = document.getElementById("undo");
let redo  = document.getElementById("redo");
let clearAll  = document.getElementById("clear-all");

let straightLine = document.getElementById("straight-line");
let rectangle = document.getElementById("rectangle");
let circle = document.getElementById("circle");


let penColor = "black";     // by default color of pencil
let eraserColor = "white";
let shapeColor = "black";
let shapeType = "line";    // by default shape is straight line
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let shapeWidth = "3";
let mousedown = false;

let undoRedoTracker = [];  // to store our actions
let track = -1;  // to keep track of our cureent action

// For keeping track of beginning points to draw shape
let beginX , beginY ; 


// API
let ctx = canvas.getContext('2d');
ctx.strokeStyle = penColor;
ctx.lineWidth = penWidth;

// mousedown -> start new path , mousemove -> path fill
canvas.addEventListener("mousedown", function(event){
    mousedown = true;

    if(isShape){
        beginX = event.clientX;
        beginY = event.clientY;
    }

    ctx.beginPath();
    if((isShape && shapeType!="circle") || (!isShape)){
        ctx.moveTo(event.clientX , event.clientY);  
    }
    
});
canvas.addEventListener("mousemove", function(event){
    if(mousedown){

        if(!isShape){
            ctx.lineTo(event.clientX , event.clientY);
            ctx.stroke();
        }
        
    }
});
canvas.addEventListener("mouseup", function(event){
    mousedown = false;

    if(isShape){
        drawShape(event.clientX , event.clientY);
    }

    let url = canvas.toDataURL();
    track++;
    undoRedoTracker[track] = url;

    if(track != undoRedoTracker.length-1){
        undoRedoTracker.length = track+1;
    }
});

undo.addEventListener("click" , function(){
    if(track >= 0){
        track = track-1;
    }
    
    //track action
    undoRedoCanvas();

});
redo.addEventListener("click" , function(){
    if(track < undoRedoTracker.length-1){
        track = track+1;
    }

    // track action
    undoRedoCanvas();
});

function undoRedoCanvas(){

    if(track === -1){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    else{
        let url = undoRedoTracker[track];
        let img = new Image();  // new image reference element
        img.src = url;
    
        img.onload = function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // clearing the canvas
            ctx.drawImage(img, 0, 0, canvas.width , canvas.height);
        }
    }

}

function drawShape(endX , endY){

    ctx.lineWidth = shapeWidth;
    ctx.strokeStyle = shapeColor;

    if(shapeType === "line"){
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    else if(shapeType=== "rect"){
        var breadth = endY - beginY;
        var length = endX - beginX ;

        // ctx.lineTo(beginX, beginY+breadth);
        // ctx.lineTo(endX , endY);
        // ctx.lineTo(endX , endY - breadth);
        // ctx.lineTo(beginX , beginY);
        ctx.strokeRect(beginX , beginY , length , breadth);
        ctx.stroke();
    }

    else{   // circle is left only

        // if(length===0) var angle = Math.PI/2;
        // else var angle = Math.atan(breadth/length);

        // distance formula
        var diameter = Math.hypot(endY - beginY , endX - beginX);
        var radius = diameter/2;

        // mid-point formula
        var centerX = (beginX + endX)/2;
        var centerY = (beginY + endY)/2;

        ctx.arc(centerX , centerY , radius , 0 ,Math.PI*2 , false );
        ctx.stroke();
    }

}


pencil.addEventListener("click",function(){
    isShape = false;
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
});
pencilColors.forEach((colorElem) => {
    colorElem.addEventListener("click", function(){
        // let color = colorElem.classList[0];
        let color = colorElem.style.backgroundColor;
        penColor = color;
        ctx.strokeStyle = penColor;
    });
})
pencilWidthElem.addEventListener("change", function(){
    penWidth = pencilWidthElem.value;
    ctx.lineWidth = penWidth;
});

eraser.addEventListener("click",function(){
    isShape = false;
    ctx.strokeStyle = eraserColor;
    ctx.lineWidth = eraserWidth;
});
eraserWidthElem.addEventListener("change", function(){
    eraserWidth = eraserWidthElem.value;
    ctx.lineWidth = eraserWidth;
});

straightLine.addEventListener("click", function(){
    shapeType = "line";
});
rectangle.addEventListener("click", function(){
    shapeType = "rect";
});
circle.addEventListener("click", function(){
    shapeType = "circle";
});


download.addEventListener("click", function(){
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
});

clearAll.addEventListener("click", function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let blankURL = canvas.toDataURL();
    track++;
    undoRedoTracker[track]= blankURL;
});
