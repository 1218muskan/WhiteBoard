let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let whiteColorElem = document.getElementById("white");
let blackColorElem = document.getElementById("black");

let multiplePagesCont = document.querySelector(".pagination");
let nextPage = document.getElementById("next-page");
let prevPage = document.getElementById("prev-page");
let currentPageNo = document.querySelector("#current-page > p");


let pencilColors = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let shapeElem = document.querySelectorAll(".geometric-shape");
let shapeColors = document.querySelectorAll(".shape-color");
let download = document.getElementById("download");
let undo  = document.getElementById("undo");
let redo  = document.getElementById("redo");
let clearAll  = document.getElementById("clear-all");


let penColor = "black";            // by default color of pencil
let shapeOutlineColor = "black";   // by default color of shape is black
let shapeType = "line";            // by default shape is straight line
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let shapeWidth = "3";
let mousedown = false;

let undoRedoTracker = []  // Main 2D array which will conatin all undo-redo-tracker arrays for all pages
let track = -1            // for main 2D array ... to keep track of total no of pages

let trackArr = []        // array to maintain the last action of all pages.... i.e. track position for each page


let Tracker1 = [];  // to store our actions for page 1
let track1 = -1;  // to keep track of our current action for each page (here for page 1)

undoRedoTracker.push(Tracker1);
track++;
//undoRedoTracker[track]  --> current array on which we are working


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
    if(!isShape){
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
    track1++;
    undoRedoTracker[track][track1] = url;

    if(track1 != undoRedoTracker[track].length-1){
        undoRedoTracker[track].length = track1+1;
    }
});



undo.addEventListener("click" , function(){
    if(track1 >= 0){
        track1 = track1-1;
    }
    
    //track action
    undoRedoCanvas();

});
redo.addEventListener("click" , function(){
    if(track1 < undoRedoTracker[track].length-1){
        track1 = track1+1;
    }

    // track action
    undoRedoCanvas();
});

function undoRedoCanvas(){

    if(ctx.globalCompositeOperation==="destination-out"){
        ctx.globalCompositeOperation="source-over";
    }

    if(track1 === -1){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    else{
        let url = undoRedoTracker[track][track1];
        let img = new Image();  // new image reference element
        img.src = url;
    
        img.onload = function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // clearing the canvas
            ctx.drawImage(img, 0, 0, canvas.width , canvas.height);
        }
    }

}


pencil.addEventListener("click",function(){
    isShape = false;

    ctx.globalCompositeOperation="source-over";
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
});
pencilColors.forEach((colorElem) => {
    colorElem.addEventListener("click", function(){

        let color = colorElem.classList[0];
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

    ctx.globalCompositeOperation="destination-out";
    ctx.lineWidth = eraserWidth;
});
eraserWidthElem.addEventListener("change", function(){
    eraserWidth = eraserWidthElem.value;
    ctx.lineWidth = eraserWidth;
});

shapeElem.forEach( diffShapes => {
    diffShapes.addEventListener("click", function(){
        var selectedShape = document.querySelector(".selected-shape");
        selectedShape.classList.remove("selected-shape");
        diffShapes.classList.add("selected-shape");

        shapeType= diffShapes.id;
        
    })
});
shapeColors.forEach((colorElem) => {
    colorElem.addEventListener("click", function(){

        let color = colorElem.classList[0];
        shapeOutlineColor = color;
        ctx.strokeStyle = shapeOutlineColor;
    });
})


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
    track1++;
    undoRedoTracker[track][track1]= blankURL;
});


function drawShape(endX , endY){

    ctx.globalCompositeOperation="source-over";
    ctx.lineWidth = shapeWidth;
    ctx.strokeStyle = shapeOutlineColor;

    if(shapeType === "line"){
        ctx.moveTo(beginX , beginY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    else if(shapeType=== "rectangle"){
        ctx.moveTo(beginX , beginY);

        var breadth = endY - beginY;
        var length = endX - beginX ;

        ctx.strokeRect(beginX , beginY , length , breadth);
        ctx.stroke();
    }

    else if(shapeType === "circle"){  

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

    else if(shapeType=== "triangle"){
        // length and breadth or rectangle
        var breadth = endY - beginY;
        var length = endX - beginX ;

        ctx.moveTo(beginX, beginY+breadth);
        ctx.lineTo(beginX + length/2 , beginY);
        ctx.lineTo(endX , endY);
        ctx.lineTo(beginX, beginY+breadth);
        ctx.stroke();
    }

    else {  // rhombus
        // length and breadth or rectangle
        var breadth = endY - beginY;
        var length = endX - beginX ;

        ctx.moveTo(beginX, beginY + breadth/2);
        ctx.lineTo(beginX + length/2 , beginY);
        ctx.lineTo(endX , endY - breadth/2);
        ctx.lineTo(endX - length/2 , endY);
        ctx.lineTo(beginX, beginY + breadth/2);
        ctx.stroke();
    }

}


// ************************ Color Theme **********************************
blackColorElem.addEventListener("click", function(){
    whiteColorElem.style.boxShadow = "none";
    blackColorElem.style.boxShadow = "rgb(10,10,10) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -2px -2px 6px 1px inset";

    // changing pencil colors
    pencilColors[0].style.backgroundColor = "white";
    pencilColors[1].style.backgroundColor = "cyan";
    pencilColors[2].style.backgroundColor = "yellow";
    pencilColors[3].style.backgroundColor = "violet";
    pencilColors[4].style.backgroundColor = "lime";

    for(var i=0; i<5; i++){
        pencilColors[i].style.border = "1px solid lightgray";
    }

    // changing shape colors
    shapeColors[0].style.backgroundColor = "white";
    shapeColors[1].style.backgroundColor = "cyan";
    shapeColors[2].style.backgroundColor = "yellow";

    for(var i=0; i<3; i++){
        shapeColors[i].style.border = "1.5px solid lightgray";
    }
    
    canvas.style.filter = "invert(100%)";
    

    // changing box shadow of conatiners
    optionsContainer.style.boxShadow = "rgba(255, 255, 255 , 0.7) 0px 5px 15px";
    toolsContainer.style.boxShadow = "rgba(255, 255, 255, 0.5) 0px 5px 15px";

    pencilToolCont.style.boxShadow = "rgba(255, 255, 255, 0.6) 0px 5px 15px";
    eraserToolCont.style.boxShadow = "rgba(255, 255, 255, 0.6) 0px 5px 15px";
    shapeToolCont.style.boxShadow = "rgba(255, 255, 255, 0.6) 0px 5px 15px";


    // changing the display of options for multiple pages
    multiplePagesCont.style.backgroundColor = "white";

})
whiteColorElem.addEventListener("click", function(){
    blackColorElem.style.boxShadow="none";
    whiteColorElem.style.boxShadow = "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset";

    // changing pencil and shape colors
    pencilColors[0].style.backgroundColor = "black";
    pencilColors[1].style.backgroundColor = "red";
    pencilColors[2].style.backgroundColor = "blue";
    pencilColors[3].style.backgroundColor = "green";
    pencilColors[4].style.backgroundColor = "purple";

    // changing shape outline colors
    shapeColors[0].style.backgroundColor = "black";
    shapeColors[1].style.backgroundColor = "red";
    shapeColors[2].style.backgroundColor = "blue";

    // changing box shadow of conatiners
    optionsContainer.style.boxShadow = "rgba(66, 47, 47, 0.3) 0px 5px 15px";
    toolsContainer.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";

    pencilToolCont.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    eraserToolCont.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    shapeToolCont.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";

    // changing the display of options for multiple pages
    multiplePagesCont.style.backgroundColor = "none";

    canvas.style.filter = "invert(0%)";
})



// ************************ Multiple Pages **************************
nextPage.addEventListener("click", function(){

    //  adding last position of track of current page
    trackArr[track]= track1;


    //  we are already on last page ...... i.e. current page = last page
    if(track === undoRedoTracker.length-1){

        let newTracker = [];   // declaring a new array to maintain data for next page
        undoRedoTracker[++track] = newTracker;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        track1 = -1;
    }

    else{        // we are not on last page , so no need to make new array

        track++;
        track1 = trackArr[track];    // showing last image

        if(track1 === -1){    // no image on page... blank canvas

            ctx.clearRect(0 ,0 , canvas.width, canvas.height);
        }

        else{

            //  for drawing image
            let url = undoRedoTracker[track][track1];
            let img = new Image();  // new image reference element
            img.src = url;
    
            img.onload = function(){

                ctx.clearRect(0, 0, canvas.width, canvas.height);  // clearing the canvas
                ctx.drawImage(img, 0, 0, canvas.width , canvas.height);
            }
        }

    }

    currentPageNo.textContent = (track+1) + "/" + undoRedoTracker.length;
    
});
prevPage.addEventListener("click", function(){

    //  adding last position of track of current page
    trackArr[track]= track1;

    track--;
    track1= trackArr[track];

    if(track1 === -1){

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    else{

        let url = undoRedoTracker[track][track1];
        let img = new Image();  // new image reference element
        img.src = url;
    
        img.onload = function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // clearing the canvas
            ctx.drawImage(img, 0, 0, canvas.width , canvas.height);
        }

    }

    currentPageNo.textContent = (track+1) + "/" + undoRedoTracker.length;

});

