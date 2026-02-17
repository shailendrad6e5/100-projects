const board = document.querySelector("#board");
const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockWidth);
let intervalId = null;
const blocks = [];

let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};

const snake = [
    {
        x:1,
        y:2
    },
    {
        x:1,
        y:3
    }
]


let direction = "ArrowRight";


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

    blocks[`${food.x}-${food.y}`].classList.add("food");

    if(direction ==='ArrowRight') head={x:snake[0].x,y:snake[0].y+1};
    else if(direction === 'ArrowLeft') head={x:snake[0].x,y:snake[0].y-1}
    else if(direction === 'ArrowDown') head={x:snake[0].x+1,y:snake[0].y}
    else if(direction === 'ArrowUp') head={x:snake[0].x-1,y:snake[0].y}

    
    if(head.x<0 || head.y<0 || head.x>rows || head.y>cols){
        clearInterval(intervalId);
    }

    if(head.x == food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food");
        
        snake.unshift(head);
    }

    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");  
    })
}

intervalId = setInterval(() => {
    render();
}, 300);

addEventListener("keydown",(event)=>{
    direction=event.key;
})