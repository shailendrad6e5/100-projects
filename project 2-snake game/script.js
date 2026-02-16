const board = document.querySelector("#board");
const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockWidth);

const blocks = [];

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


let direction = "ArrowRight";


for(let row = 0;row<rows;row++){
    for(let col = 0;col<cols;col++){
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        // block.textContent= `${row}-${col}`
        blocks[`${row}-${col}`] = block;
    }  
}

function render(){
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    })
}

setInterval(() => {
    let head = null;
    if(direction ==='ArrowRight') head={x:snake[0].x,y:snake[0].y+1};
    else if(direction === 'ArrowLeft') head={x:snake[0].x,y:snake[0].y-1}
    else if(direction === 'ArrowDown') head={x:snake[0].x+1,y:snake[0].y}
    else if(direction === 'ArrowUp') head={x:snake[0].x-1,y:snake[0].y}
    
    snake.forEach(segment =>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
    snake.unshift(head);
    snake.pop();
    render();
}, 300);

addEventListener("keydown",(event)=>{
    direction=event.key;
})