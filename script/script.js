var dirX, dirY, nave, velN, pjX, pjY;
var velS, shootSelect, qntS, shootQnt, timeShot, muni;
var meteorsSelect, velM, tempMakeMeteors, qntM, meteors, mFodeu, mFodeuSelect, qntMF, velMF
var score, scoreP;
var boxWidth;
var start;
var frames;
var colidiu;
var ie, isom;


//TECLAS
function teclaDown() {
    var tecla = event.keyCode;
    muni = document.querySelector('.muni');
    if (tecla == 37) {
        dirX = -1;
    } else if (tecla == 39) {
        dirX = 1;
    }

    if (tecla == 38) {
        dirY = -1;
    } else if (tecla == 40) {
        dirY = 1;
    }

    if (tecla == 32) {
        if(start && shootQnt <= 10 && shootQnt > 0) {
            shootQnt--;
            muni.style.width = `${(shootQnt * 10)}px`;
            shoot(pjX + 28, pjY);
            console.log(shootQnt);
            clearTimeout(timeShot);
            
            
        } if (start && shootQnt == 0) {
            timeShot = setTimeout(function() {
                shootQnt = 10; 
                console.log(shootQnt); 
                muni.style.width = `100px`;
            }, 2000);
            
        }
    }

}

function teclaUp() {
    var tecla = event.keyCode;
    if ((tecla == 37) || (tecla == 39)) {
        dirX = 0;
    }

    if ((tecla == 38) || (tecla == 40)) {
        dirY = 0;
    }
}
//TECLAS

//NAVE
function naveControls() {
    pjX += dirX * velJ;
    pjY += dirY * velJ;

    nave.style.top = `${pjY}px`;
    nave.style.left = `${pjX}px`;
    meteorsCollisionNave();
    meteorsFodeuCollisionNave();

    if(pjX <= 0) {
        pjX = 0;
    } if(pjX >= boxWidth - 64) {
        pjX = boxWidth - 64;
    }

    if(pjY <= 0) {
        pjY = 0;
    } if(pjY >= boxHeight - 64) {
        pjY = boxHeight - 64;
    }
}
//NAVE

//Meteors
function makeMeteors() {
    if(start) {
        let y = 0;
        let x = Math.random() * boxWidth;
        let box = document.querySelector('.box');

        meteors = document.createElement('div');
        attr = document.createAttribute('class');
        attr2 = document.createAttribute('style');
        attr.value = "meteors";
        attr2.value = `top: ${y}px; left: ${x}px;`;
        meteors.setAttributeNode(attr);
        meteors.setAttributeNode(attr2);

        box.appendChild(meteors);
    }
}

function meteorsControl() {
    meteorsSelect = document.querySelectorAll('.meteors');
    qntM = meteorsSelect.length;

    for(let i = 0; i < qntM; i++) {
        if(meteorsSelect[i]) {
            let pmY = meteorsSelect[i].offsetTop;
            pmY += velM;
            meteorsSelect[i].style.top = `${pmY}px`;
            if(pmY > boxHeight) {
                scoreP++
                meteorsSelect[i].remove();   
            }
        }
    }
}
//Meteors

//Meteors Fodeu
function makeMeteorsFodeu() {
    if(start) {
        let yF = 0;
        let xF = Math.random() * boxWidth;
        let boxF = document.querySelector('.box');

        mFodeu = document.createElement('div');
        attrF = document.createAttribute('class');
        attrF2 = document.createAttribute('style');
        attrF.value = "meteoroFodeu";
        attrF2.value = `top: ${yF}px; left: ${xF}px`;
        mFodeu.setAttributeNode(attrF);
        mFodeu.setAttributeNode(attrF2);
        
        boxF.appendChild(mFodeu);
    }
}

function meteorsFodeuControl() {

    mFodeuSelect = document.querySelectorAll('.meteoroFodeu');
    qntMF = mFodeuSelect.length;

    for(let i = 0; i < qntMF; i++) {
        if(mFodeuSelect[i]) {
            let pmfY = mFodeuSelect[i].offsetTop;
            pmfY += velMF;
            mFodeuSelect[i].style.top = `${pmfY}px`;
            if(pmfY > boxHeight) {
                mFodeuSelect[i].remove();
                scoreP++
            }
        }
    }
}
//Meteors Fodeu

//Shot
function shoot(x, y) {

    if(start) {
        boxS = document.querySelector('.box');

        let shootBox = document.createElement('div');
        let attrSH = document.createAttribute('class');
        let attrSH2 = document.createAttribute('style');
        attrSH.value = "shot";
        attrSH2.value = `top: ${y}px; left: ${x}px;`;
        shootBox.setAttributeNode(attrSH);
        shootBox.setAttributeNode(attrSH2);

        boxS.appendChild(shootBox);
    }
}

function shootControls() {
    shootSelect = document.querySelectorAll('.shot');
    qntS = shootSelect.length;

    for(let i = 0; i < qntS; i++) {
        if(shootSelect[i]) {
            let pS = shootSelect[i].offsetTop;
            pS -= velS;
            shootSelect[i].style.top = `${pS}px`;
            shootCollision(shootSelect[i]);
            shootCollisionBig(shootSelect[i]);

            if(pS < 0) {
                shootSelect[i].remove();
            } 
        }
    }
}
//Shot

//Collision
function meteorsCollisionNave() {
    for(let i = 0; i < qntM; i++) {
        if(meteorsSelect[i]) {

            if( 
                ( (nave.offsetTop <= (meteorsSelect[i].offsetTop + 45) ) && 
                ( (nave.offsetTop + 45) >= meteorsSelect[i].offsetTop) ) && 
                ( (nave.offsetLeft <= (meteorsSelect[i].offsetLeft + 45) ) &&
                ( (nave.offsetLeft + 45 ) >= meteorsSelect[i].offsetLeft ) )
            ) {
                makeExplosion(1, nave.offsetLeft + 32, nave.offsetTop + 32);
                nave.style.display = "none";
                
                colidiu = true;
                start = false;
                
            }
        }
    }
}

function meteorsFodeuCollisionNave() {
    for(let i = 0; i < qntMF; i++) {
        if(mFodeuSelect[i]) {

            if( 
                ( (nave.offsetTop <= (mFodeuSelect[i].offsetTop + 75) ) && 
                ( (nave.offsetTop + 55 ) >= mFodeuSelect[i].offsetTop) ) && 
                ( (nave.offsetLeft <= (mFodeuSelect[i].offsetLeft + 80) ) &&
                ( (nave.offsetLeft + 60) >= mFodeuSelect[i].offsetLeft ) )
            ) {
                makeExplosion(1, nave.offsetLeft + 32, nave.offsetTop + 32);
                nave.style.display = "none";
                colidiu = true;
                start = false;
                
            }
        }
    }
}

function shootCollision(fire) {
    for(let i = 0; i < qntM; i++) {
        if(meteorsSelect[i]) {

            if( 
                ( (fire.offsetTop <= (meteorsSelect[i].offsetTop + 40) ) && 
                ( (fire.offsetTop + 6) >= meteorsSelect[i].offsetTop) ) && 
                ( (fire.offsetLeft <= (meteorsSelect[i].offsetLeft + 40) ) &&
                ( (fire.offsetLeft + 6) >= meteorsSelect[i].offsetLeft ) )
            ) {
                makeExplosion(2, meteorsSelect[i].offsetLeft + 20, meteorsSelect[i].offsetTop + 20);
                fire.remove();
                meteorsSelect[i].remove();
                scoreP++
            }
        }
    }
}

function shootCollisionBig(fire) {
    for(let i = 0; i < qntMF; i++) {
        if(mFodeuSelect[i]) {

            if( 
                ( (fire.offsetTop <= (mFodeuSelect[i].offsetTop + 80) ) && 
                ( (fire.offsetTop + 6) >= mFodeuSelect[i].offsetTop) ) && 
                ( (fire.offsetLeft <= (mFodeuSelect[i].offsetLeft + 80) ) &&
                ( (fire.offsetLeft + 6) >= mFodeuSelect[i].offsetLeft ) )
            ) {
                fire.remove();
                let pmfYE = mFodeuSelect[i].offsetTop;
                pmfYE += velMF + 50;
                mFodeuSelect[i].style.top = `${pmfYE}px`;
            }
        }
    }
}
//Collision

//score
function scoreF() {
    score = document.querySelector('.score');
    score.innerHTML = scoreP;
}
//score

//Sounds/Exlplosion
function makeExplosion(type, x, y) {
    if(document.getElementById(`explosion${ie - 1}`)) {
        document.getElementById(`explosion${ie - 1}`).remove();
    }

    var boxExplo = document.querySelector('.box');
    var explosionSS = document.createElement('div');
    var imgSS = document.createElement('img');
    var somSS = document.createElement('audio');
    //attributes SS div
    var att1SS = document.createAttribute('class');
    var att2SS = document.createAttribute('id');
    var att3SS = document.createAttribute('style');
    //attributes SS img
    var att4SS = document.createAttribute('src');
    //attributes SS audio
    var att5SS = document.createAttribute('src');
    var att6SS = document.createAttribute('id');
    
    att2SS.value = `explosion${ie}`;
    att5SS.value = "bom.wav?" + new Date();
    att6SS.value = `som${isom}`;

    if(type == 1) {
        att1SS.value = "explosionSS";
        att3SS.value = `left: ${x - 32}px; top: ${y - 32}px;`;
        att4SS.value = "imgs/exploSS.gif?" + new Date();
    } else {
        att1SS.value = "explosionM";
        att3SS.value = `left: ${x - 20}px; top: ${y}px;`;
        att4SS.value = "imgs/exploM.gif?" + new Date();
    }

    explosionSS.setAttributeNode(att1SS);
    explosionSS.setAttributeNode(att2SS);
    explosionSS.setAttributeNode(att3SS);

    imgSS.setAttributeNode(att4SS);

    somSS.setAttributeNode(att5SS);
    somSS.setAttributeNode(att6SS);
    explosionSS.appendChild(imgSS);
    explosionSS.appendChild(somSS);
    boxExplo.appendChild(explosionSS);

    document.querySelector(`#som${isom}`).play();
    document.querySelector(`#som${isom}`).volume = 0.3;
    ie++;
    isom++;
    

}   
//Sounds

//Play Again/start
function playAgain() {
        let again2 = document.querySelector('.again');
    
        again2.onclick = () => {
            colidiu = false;
            cancelAnimationFrame(frames);
            let again3 = document.querySelector('.again');
            again3.style.display = "none";
            gameLoop();
            
            let allM = document.querySelectorAll('.meteors');
            let allMF = document.querySelectorAll('.meteoroFodeu');
            let allS = document.querySelectorAll('.shot');
            

            for (let i = 0; i < allM.length; i++){
                if(allM[i]) {
                    allM[i].remove();
                }   
            }

            for (let i = 0; i < allMF.length; i++) {
                if(allMF[i]) {
                    allMF[i].remove();
                }
            }

            for (let i = 0; i < allS.length; i++) {
                if(allS[i]) {
                    allS[i].remove();
                }
            }
            pjX = boxWidth / 2 - 30;
            pjY = boxHeight;
            shootQnt = 10;
            scoreP = 0;
            muni.style.width = `100px`;
            nave.style.display = "block";
            start = true;
            console.log(start);
            if(document.querySelector('.explosionSS')) {
                document.querySelector('.explosionSS').remove();
            }
        }
        
        
}
//Play Again/start

function gameLoop() {
    if (start) {
        naveControls();
        meteorsControl();
        meteorsFodeuControl();
        shootControls();
        scoreF();
        
    }
    if(colidiu) {
        let again = document.querySelector('.again');
        again.style.display = "block";
        playAgain();
    }
    frames = requestAnimationFrame(gameLoop);
}

function play() {

    if(!start) {
        let ini = document.querySelector('.play');
        //let kvs = document.querySelector('#kvs');
        ini.onclick = () => {
            //kvs.play();
            //kvs.volume = 0.1;
            ini.style.display = "none";
            start = true;
            gameLoop();
        }
    }

    
    start = false;
    
    colidiu = false;
    //box
    boxWidth = document.querySelector('.box').offsetWidth;
    boxHeight = document.querySelector('.box').offsetHeight;

    //nave
    dirX = 0;
    dirY = 0;
    pjX = boxWidth / 2 - 32;
    pjY = boxHeight;
    velJ = 8;
    nave = document.querySelector('.nave');
    nave.style.left = `${pjX}px`;
    nave.style.top = `${pjY - 70}px`;

    //Shot
    velS = 5;
    shootQnt = 10;

    //Meteors
    clearInterval(tempMakeMeteors);
    velM = 5;
    velMF = 3;
    tempMakeMeteors = setInterval(makeMeteors, 1300);
    tempMakeMeteors = setInterval(makeMeteors, 1100);
    tempMakeMeteors = setInterval(makeMeteors, 1000);
    tempMakeMeteorsF = setInterval(makeMeteorsFodeu, 3000);

    //Score
    scoreP = 0;

    //explosion control

    ie = 0;
    isom = 0;
    
}

window.addEventListener('load', play);
window.addEventListener('keydown', teclaDown);
window.addEventListener('keyup', teclaUp);

