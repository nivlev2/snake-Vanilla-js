
const snake = [
    {x:11,y:11}
]
let gameOver = false
const position = {x: 0, y: 0}
const eat = document.createElement('div')
let direction = ''
let num = 1

reset("You want start the game?")

function movesnake(x,y){
    
    for (let i = snake.length - 2; i >= 0; i--){
        snake[i+1] = {...snake[i]}
        // console.log({...snake[i]});
    }
    snake[0].x +=x
    snake[0].y +=y
    
    gameOn()
}

function createSnake (){
    for (let i = 0; i < snake.length; i++){
        const body = document.createElement('div')
        body.className = 'player'
        body.style.gridRowStart = snake[i].y
        body.style.gridColumnStart = snake[i].x
        document.querySelector('.container').appendChild(body)
    }
}
function food(){
    gameOn()
    if(gameOver){
        num++
    }
    console.log("run");
    const x = Math.floor(Math.random()*21)
    const y = Math.floor(Math.random()*21)
    // const eat = document.createElement('div')
    position.x = y;
    position.y= x
    // console.log(position);
    eat.className = 'food'
    eat.style.gridRowStart = x
    eat.style.gridColumnStart = y
    eat.innerHTML = '🍎'
    document.querySelector('.container').appendChild(eat)
    console.log(`from ${num}`);
    if(!gameOver){
       return setTimeout(()=>{
        document.querySelector('.container').removeChild(eat)
        food()
    },5000)
    }
}
function clear(){
    document.querySelectorAll('.player').forEach(element =>{
        document.querySelector('.container').removeChild(element)
    })
}
function grow(){
    const x = snake[snake.length-1].x
    const y = snake[snake.length-1].y 
    const g = {x:x,y:y}
    snake.push(g)
    eat.innerHTML = ''
}

class Snake {
    left(){
        if(direction != 'left'){
            return
        }
        if(position.x == snake[0].x && position.y == snake[0].y){
            console.log('work');
            grow()
        }
        if(!gameOver){
            clear()
            movesnake(-1,0)
            createSnake()
            setTimeout(()=>{
                this.left()
            },300)    
        }
    }
    right(){
        if(direction != 'right'){
            return
        }
        if(position.x == snake[0].x && position.y == snake[0].y){
            grow()
        }
       
            if(!gameOver){ 
                clear()
                movesnake(1,0)
                createSnake()    
                setTimeout(()=>{
                    this.right()
                },300)    
            }else{
                return
            }
    }
    up(){
        if(direction != 'up' ){
            return
        }
        if(position.x == snake[0].x && position.y == snake[0].y){
            grow()
        }
        if(!gameOver){
            clear()
            movesnake(0,-1)
            createSnake()
            setTimeout(()=>{
                this.up()
            },300)    
        }else{
            return
        }
    }
    down(){
        if(direction != 'down'){
            return
        }
        if(position.x == snake[0].x && position.y == snake[0].y){
            grow()
        }
        if(!gameOver){
            clear()
            movesnake(0,1)
            createSnake()
            setTimeout(()=>{
                this.down()
            },300)
        }
    }
}

let player = new Snake

document.addEventListener('keyup',(e)=>{
    if(e.key == 'ArrowLeft'){
        if (direction == 'left' || direction == 'right') {
            return
        }
        direction = 'left'
        player.left()
    }else if(e.key == 'ArrowRight'){
        if (direction == 'right' || direction == 'left') {
            return
        }

        direction = 'right'
        player.right()
    }else if(e.key == 'ArrowUp'){
        if (direction == 'up' || direction == 'down') {
            return
        }

        direction = 'up'
        player.up()
    }else if(e.key == 'ArrowDown'){
        if (direction == 'down' || direction == 'up') {
            return
        }

        direction = 'down'
        player.down()
    }
})

function gameOn(){
    for(let i=1; i< snake.length; i++){
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            gameOver = true
            reset("Do you want to play again?")
        }
    }
    if(snake[0].y > 21 || snake[0].y <= 0 || snake[0].x >21 || snake[0].x < 1){
        gameOver = true
        reset("Do you want to play again?")
    }
    return
}
function reset(msg){
    if(confirm(msg)){
        snake.splice(0,snake.length,{x:11,y:11})
        createSnake()
        food()       
        gameOver = false
        direction = ''
    }
}