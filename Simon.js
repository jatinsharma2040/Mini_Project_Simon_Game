let gameSeq = [];
let userSeq = [];
let btns = ["red","yellow","green","purple"];
let started = false;
let level = 0;
let Highscore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is started.");
        started = true;

        levelUp();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randBtn);
}

function checkAns(idx){
// let idx = level - 1;

if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
        setTimeout(levelUp,1000);
    }
}
else{
    if(level > Highscore){
        Highscore = level;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start. <br> Highscore:${Highscore}`;
    document.querySelector("body").style.background = "red";
    setTimeout(function(){
        document.querySelector("body").style.background = "linear-gradient(to right, rgb(25, 184, 248), rgb(252, 52, 252))";
    },250);
    reset();

}
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress);
} 

function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}