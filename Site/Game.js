const cvs=document.getElementById("canvas");
const ctx=cvs.getContext("2d");


let greenScore_td=document.getElementById("greenScore");
let greenScore=0;
let redScore_td=document.getElementById("redScore");
let redScore=0;

const result_div=document.getElementById("result");

const box=32;

const oldRedColor=[255,0,0,255];
const oldGreenColor=[0,128,0,255];
const newRedColor=[139,0,0,255];
const newGreenColor=[0,100,0,255];
const emptyColor=[0,0,0,0];

let line=0;
let column=0;

let directionGreenSquare;
let directionRedSquare;

let i=0;

let redSquare={
    x:480-box,
    y:480-box
}

let greenSquare={
    x:0,
    y:0
}

let widthLine=500;
let heightLine=.5;

document.addEventListener("keydown",directions);

function directions(event) {
    switch (event.keyCode) {
             case 37:
                 directionGreenSquare="LEFT";         
                 break;
            case 38:
                  directionGreenSquare="UP";         
                  break;
            case 39:
                directionGreenSquare="RIGHT";  
                break;
            case 40:
                 directionGreenSquare="DOWN";           
                 break;
            case 81:
                directionRedSquare="LEFT";         
                break;
            case 90:
                directionRedSquare="UP";         
                break;
            case 68:
                directionRedSquare="RIGHT";  
                break;
            case 83:
                directionRedSquare="DOWN";           
                break;
        default:
            break;
    }
}


function movement()
{

    // let oldRedSquare={
    //     x:redSquare.x+1,
    //     y:redSquare.y+1
    // }

    // let oldGreenSquare={
    //     x:greenSquare.x+1,
    //     y:greenSquare.y+1
    // }

    ctx.fillStyle="red";
    ctx.fillRect(redSquare.x+1,redSquare.y+1,box-2,box-2);

    ctx.fillStyle="green";
    ctx.fillRect(greenSquare.x+1,greenSquare.y+1,box-2,box-2);

    switch (directionGreenSquare) {
        case "LEFT":
            greenSquare.x-=box;
            break;
        case "RIGHT":
            greenSquare.x+=box;
            break;
        case "DOWN":
            greenSquare.y+=box;
            break;
        case "UP":
            greenSquare.y-=box;
            break; 
        default:
            break;
    }
    switch (directionRedSquare) {
        case "LEFT":
            redSquare.x-=box;
            break;
        case "RIGHT":
            redSquare.x+=box;
            break;
        case "DOWN":
            redSquare.y+=box;
            break;
        case "UP":
            redSquare.y-=box;
            break; 
        default:
            break;
    }
    const newRedPositionColor=ctx.getImageData(redSquare.x+1,redSquare.y+1,1,1).data;
    const newGreenPositionColor=ctx.getImageData(greenSquare.x+1,greenSquare.y+1,1,1).data;

     //new red is on a green cell
     if (newRedPositionColor[0]==oldGreenColor[0]&&newRedPositionColor[1]==oldGreenColor[1]
        &&newRedPositionColor[2]==oldGreenColor[2]&&newRedPositionColor[3]==oldGreenColor[3]) {
        redScore++;
        greenScore--;
    }else
    //new red is on an empty cell
    if (newRedPositionColor[0]==emptyColor[0]&&newRedPositionColor[1]==emptyColor[1]
        &&newRedPositionColor[2]==emptyColor[2]&&newRedPositionColor[3]==emptyColor[3])
        {
            redScore++;
        }
        //new green is on a red cell
    if (newGreenPositionColor[0]==oldRedColor[0]&&newGreenPositionColor[1]==oldRedColor[1]
        &&newGreenPositionColor[2]==oldRedColor[2]&&newGreenPositionColor[3]==oldRedColor[3]) {
        redScore--;
        greenScore++;
    }else
    //new red is on an empty cell
    if (newGreenPositionColor[0]==emptyColor[0]&&newGreenPositionColor[1]==emptyColor[1]
        &&newGreenPositionColor[2]==emptyColor[2]&&newGreenPositionColor[3]==emptyColor[3])
        {
            greenScore++;
        }

    ctx.fillStyle="darkgreen";
    ctx.fillRect(greenSquare.x+1,greenSquare.y+1,box-2,box-2);

    ctx.fillStyle="darkred";
    ctx.fillRect(redSquare.x+1,redSquare.y+1,box-2,box-2);
}

function scores() {

    greenScore_td.textContent=greenScore;
    redScore_td.textContent=redScore;

    if (greenScore==100&&redScore==100) {
        result_div.innerHTML="<h1>IT'S A DRAW ! </h1>"
        clearInterval(game);
    }else if (greenScore==100) {
        result_div.innerHTML="<h1>GREEN WINS !</h1>"
        clearInterval(game);
    }else if (redScore==100) {
        result_div.innerHTML="<h1>RED WINS!</h1>"
        clearInterval(game);
    }

}


   
function draw() {

    //Moving the squares
    movement();

    //Calculating the scores
    scores();

    //Drawing the gameboard
    ctx.fillStyle="blue";
    for (let i = 0; i <= (480/box)*(480/box); i++) {
        column++;
        if (column>=480/box) {
            widthLine=.5;
            heightLine=500;
            line++;
            column=0;
        }
        ctx.fillRect(line*box,column*box,widthLine,heightLine);
    }
}

 let game=setInterval(draw,100);