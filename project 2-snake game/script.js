const board = document.querySelector("#board");
const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockWidth);
let intervalId = null;
const blocks = [];
const startGame = document.getElementById("start-game");
const restartGame = document.getElementById("restart-game");
const restartButton = document.getElementById("restart-btn");
const allowedKey = ["ArrowUp","ArrowDown","ArrowRight","ArrowLeft"]
const startButton = document.getElementById("st-btn");
const snakeModel = document.getElementById("model");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score")
const timeElement = document.getElementById("time");
let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
let direction = "ArrowRight";
let snake = [
    {
        x:1,
        y:2
    },
    {
        x:1,
        y:3
    }
]

let score = 0;
let time = `00-00`;
let highScore = localStorage.getItem("highScore") || 0;
const timeIntervalId = null;

highScoreElement.textContent = highScore;

for(let row = 0;row<rows;row++){
    for(let col = 0;col<cols;col++){
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }  
}

function render(){

    let head = null;

    // calculate new head
    if(direction === 'ArrowRight')
        head = { x: snake[0].x, y: snake[0].y + 1 };
    else if(direction === 'ArrowLeft')
        head = { x: snake[0].x, y: snake[0].y - 1 };
    else if(direction === 'ArrowDown')
        head = { x: snake[0].x + 1, y: snake[0].y };
    else if(direction === 'ArrowUp')
        head = { x: snake[0].x - 1, y: snake[0].y };

    // boundary check
    if(
        head.x < 0 ||
        head.y < 0 ||
        head.x >= rows ||
        head.y >= cols
    ){
        clearInterval(intervalId);
        snakeModel.style.display = "flex";
        startGame.style.display = "none";
        restartGame.style.display = "flex";

        score = 0;
        time = `00-00`;
        scoreElement.textContent = score;
        timeElement.textContent = time;
        return;
    }

    // remove old snake from screen
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    // food logic
    if(head.x === food.x && head.y === food.y){

        blocks[`${food.x}-${food.y}`].classList.remove("food");

        food = {
            x: Math.floor(Math.random()*rows),
            y: Math.floor(Math.random()*cols)
        };

        snake.unshift(head);   // grow

        score+=10;
        scoreElement.textContent = score;

        if(score>highScore){
            highScore = score;
            highScoreElement.textContent= highScore;
            localStorage.setItem("highScore",highScore)
        }

    } else {

        snake.unshift(head);   // normal move
        snake.pop();           // remove tail
    }

    // render snake again
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });

    // render food
    blocks[`${food.x}-${food.y}`].classList.add("food");
}

addEventListener("keydown",(event)=>{
    if(allowedKey.includes(event.key))
    direction=event.key;
})

startButton.addEventListener("click",()=>{

    snakeModel.style.display = "none";

    intervalId = setInterval(() => {
        render();
    }, 300);

    timeIntervalId = setInterval(()=>{
        let [min,sec] = time.split("-").map(Number)

        if(sec==59){
            min+=1;
            sec = 0;
        }
        else {
            sec+=1;
        }

        time = `${min}-${sec}`
        timeElement.textContent = time;
    },1000)
})

restartButton.addEventListener("click",restart);

function restart(){
    clearInterval(intervalId);
    snakeModel.style.display = "none";
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    })
    direction = "ArrowRight";
    snake = [
        {
            x:1,
            y:2
        },
        {
            x:1,
            y:3
        }
    ]
    food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
    intervalId = setInterval(() => {
        render();
    }, 300);
}



