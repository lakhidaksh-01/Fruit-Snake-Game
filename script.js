    document.querySelectorAll('.controls i').forEach(key=>{
        key.addEventListener('click',()=>changeDirection({key:key.dataset.key}));
    });


    const foodSound = new Audio('music/food.mp3');
    const gameOverSound = new Audio('music/gameover.mp3');
    const moveSound = new Audio('music/move.mp3');
    const musicSound = new Audio('music/music.mp3');
    musicSound.loop = true; // Loop the background music

    // Start the music when the game initializes
    function startMusic() {
        musicSound.play().catch(err => console.log('Music playback blocked by browser:', err));
    }
    function stopMusic() {
        musicSound.pause();
        musicSound.currentTime = 0; // Reset to the beginning
    }

        let scoreElement = document.querySelector('.score');
        let highscoreElement=document.querySelector('.high-score');
        let playBoard=document.querySelector(".play-board");
        let foodX, foodY;
        let snakeBody=[];
        let snakeX =5,snakeY=10;
        let velocityX=0,velocityY=0;
        let gameOver=false;
        let setinterval= setInterval(initGame, 160); // Calls initGame every 200ms
        let score=0;


        let highscore=localStorage.getItem("highscore")||0;
        highscoreElement.innerText=`High Score: ${highscore}`;
        scoreElement.innerText=`Score: ${score}`;


    document.addEventListener("keydown",changeDirection);
    function changeDirection(e){
    startMusic();
    if (e.key === "ArrowUp" && velocityY != 1) {
        moveSound.play();
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        moveSound.play();
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        moveSound.play();
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        moveSound.play();
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === " " && velocityX != -1) {
        moveSound.play();
        velocityX = 1;
        velocityY = 0;
    }
        initGame();
    }
    

        function initGame(){

            if(gameOver){
                return handleGameOver();
            }

            let htmlMarkup=`<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
            if(snakeX===foodX&&snakeY===foodY){
                changeFoodPosition();
                snakeBody.push([foodX,foodY]);
                score++;
                foodSound.play();


                scoreElement.innerText=`Score: ${score}`;


                if(score> highscore){
                    highscore=score;
                    localStorage.setItem("highscore",highscore);
                    highscoreElement.innerText=`High Score: ${highscore}`;
                }
            }

            for(let i=snakeBody.length-1;i>0;i--){
                snakeBody[i]=snakeBody[i-1];
            }

            snakeBody[0]=[snakeX,snakeY];//setting first element of snake body to current snake position.

            snakeX+=velocityX;
            snakeY+=velocityY;

            if(snakeX<=0 || snakeX>25 || snakeY<=0 || snakeY>25){
                gameOver=true;
            }

            for(let i=0;i<snakeBody.length;i++){
                let className = i === 0 ? 'head' : 'body'; 

                htmlMarkup +=`<div class="${className}" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
                // Checking if the snake head hit body,if so set game over
            if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
                gameOver=true;
            }
            }
            
            playBoard.innerHTML=htmlMarkup;
        }


        function changeFoodPosition(){
            foodX=Math.floor(Math.random()*25)+1;
            foodY=Math.floor(Math.random()*25)+1;           
        }
        changeFoodPosition();
        initGame();



        function handleGameOver(){ 
            gameOverSound.play();
            stopMusic(); // Stop background music
            alert("Game Over! Press OK to replay...");
            location.reload();
            gameOver=false;
            changeFoodPosition();
        }