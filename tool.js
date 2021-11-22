let optionsContainer = document.querySelector(".options-cont");
let toolsContainer = document.querySelector(".tools-cont");
let pencil = document.getElementById("pencil");
let eraser = document.getElementById("eraser");
let sticky = document.getElementById("sticky");
let upload = document.getElementById("upload");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");

// by default toolbar is visible
let optionsFlag = true;  

// by default pencil and eraser containers are not visible
let pencilFlag = false;  
let  eraserFlag = false;  


optionsContainer.addEventListener("click", function(){
    optionsFlag = !optionsFlag;

    let iconElem = optionsContainer.children[0];
    if(optionsFlag){   //open toolbar
        iconElem.classList.remove("fa-times");
        iconElem.classList.add("fa-bars");
        toolsContainer.style.display = "flex";

    }
    else{    //close toolbar
        iconElem.classList.remove("fa-bars");
        iconElem.classList.add("fa-times");
        toolsContainer.style.display = "none";
    }
    
})

pencil.addEventListener("click", function(){
    pencilFlag = !pencilFlag;

    if(pencilFlag){   //show pencil tool 
        pencilToolCont.style.display = "block";
    }
    else{    //hide pencil tool
        pencilToolCont.style.display = "none";
    }
    
})
eraser.addEventListener("click", function(){
    eraserFlag = !eraserFlag;

    if(eraserFlag){   //show pencil tool 
        eraserToolCont.style.display = "block";
    }
    else{    //hide pencil tool
        eraserToolCont.style.display = "none";
    }
    
})

upload.addEventListener("click", function(){
    // open file eplorer
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.setAttribute("accept","image/*");
    input.click();

    input.addEventListener("change", function(){
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        console.log(url);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize" style="background-color: #2ed573;"></div>
            <div class="remove" style="background-color: #ff4757;"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `;

        createSticky(stickyTemplateHTML);

    })

});

sticky.addEventListener("click", function(event){
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize" style="background-color: #2ed573;"></div>
        <div class="remove" style="background-color: #ff4757;"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHTML);

});

function createSticky(stickyTemplateHTML){
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    let stickyHeader = stickyCont.querySelector(".header-cont");
    stickyHeader.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

function noteActions(minimize,remove, element){
    remove.addEventListener("click", function(){
        element.remove();
    });
    minimize.addEventListener("click",function(){
        let noteCont = element.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");

        if(display === "none"){
            noteCont.style.display = "block";
        }
        else{
            noteCont.style.display = "none";
        }
    })
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}

