



function firstChallenge() {
    const editor = ace.edit("editor");
    editor.setTheme("ace-twilight");
    editor.getSession().setMode("ace/mode/javascript");

    /*
         ******************
         store the editor code into the localStore
         run the code every time you press enter
    
         ******************
    */

    editor.getSession().on('change', function () {
        localStorage.setItem('code', editor.getSession().getValue());
    });

    document.body.addEventListener('keydown', run);

    function run(event) {
        if (event.key === 'Enter') {
            // eval(localStorage.getItem('code'));
            eval(editor.getSession().getValue());
        }
    }


    /*
        ******************
        game challenge one
        ******************
    */


    const justus = document.querySelector('.justus');
    const bomb = document.querySelector('.bomb');
    const gameDisplay = document.querySelector('#game-display');
    const diamond = document.querySelector('#diamond');
    const avatar = document.querySelector('#avatar');

    /**lives*/
    let lives = 3;
    console.log(lives);

    /**
    steps
    they are necessary to calculate the bomb falling
    */
    let step = 0;

    /**setting the width of the game field*/
    let displayWidth = gameDisplay.offsetWidth;

    /**
    setting the colliders and
    call the collision functions
    The function detectCollision 
    runs at every time (it is called inside the animate function)
    */

    function detectCollision() {
        let justusCollider = justus.getBoundingClientRect();
        let bombCollider = bomb.getBoundingClientRect();
        let diamondCollider = diamond.getBoundingClientRect();

        if ((justusCollider.left < bombCollider.left + justusCollider.width)
            && (justusCollider.left + justusCollider.width > bombCollider.left)
            && (justusCollider.top < bombCollider.top + bombCollider.height)
            && (justusCollider.height + justusCollider.top > bombCollider.top)) {

            if (justus.firstElementChild.className == "justus-shield") {
                shieldBombCollision();
            } else {
                onBombCollision(justusCollider, bombCollider);
            }
        } else if ((justusCollider.left < diamondCollider.left + justusCollider.width)
            && (justusCollider.left + justusCollider.width > diamondCollider.left)
            && (justusCollider.top < diamondCollider.top + diamondCollider.height)
            && (justusCollider.height + justusCollider.top > diamondCollider.top)) {

            assembleShield();

        }

    }

    /**
    collision with bomb. 
    triggerOnce is used to call the function only once
    */

    let triggerOnce = true;
    function onBombCollision() {

        if (lives > 0 && triggerOnce === true) {
            triggerOnce = false;

            justus.firstElementChild.src = "";
            justus.firstElementChild.alt = "";

            justus.classList.add('justus-explosion');
            bomb.classList.add('bomb-explosion');

            bomb.addEventListener('transitionend', function () {

                justus.firstElementChild.src = "images/character-stand-one.svg";
                justus.firstElementChild.alt = "avatar-start-position";
                justus.className = "justus";
                justus.classList.add('justus-beat-on-stage');

            })

            lives = lives - 1;

            /*
            create help messages
            */

            if ((lives == 1) && (justus.style.bottom == "10px")) {
                let newAceLine = document.querySelector('.ace_text-layer');
                console.log(newAceLine);
                let msg = document.createElement('div');
                msg.style.position = "absolute";
                msg.style.top = "70vh";
                msg.innerHTML = `<div class="ace_line msg_blinking" style="height: 14px; top: 140px;">
                <span style="color: yellow; opacity:1;">
<h3>you only have one life left!...</h3>
//why not try something like: justus.style.top = "0px"; ?</span></div>`;
                newAceLine.appendChild(msg);
                setTimeout(function () {
                    newAceLine.removeChild(msg);
                }, 9000)

            }

        } else if (lives == 0) {
            justus.firstElementChild.src = "";
            justus.firstElementChild.alt = "";
            bomb.classList.add('bomb-explosion');
            justus.classList.add('justus-explosion');
            bomb.addEventListener('transitionend', function () {
                justus.parentNode.removeChild(justus);
            })
        }
    }




    /*
    collision with the diamond
    */

    function assembleShield() {
        console.log('collision with diamond');

        //we create a shield around our hero
        let parent = avatar.parentNode;
        let shield = document.createElement('div');
        shield.classList.add('justus-shield');
        parent.appendChild(shield);
        avatar.style.position = "relative";
        avatar.style.left = "25%";
        avatar.style.top = "3%";
        shield.appendChild(avatar);
        gameDisplay.removeChild(diamond);
        justus.style.borderRadius = "50%";
        justus.style.width = "250px";
        justus.style.height = "250px";
    }

    function shieldBombCollision() {

        bomb.classList.add('bomb-explosion');
    }


    //setting a random position for the bomb


    bomb.style.left = Math.floor(Math.random() * displayWidth) + "px";

    function animate() {
        step += 2;
        bomb.style.top = step + 'px';
        if (bomb.style.top == window.innerHeight + "px") {
            // console.log('test');
            bomb.className = 'bomb';
            bomb.style.left = Math.floor(Math.random() * displayWidth) + "px";
            step = 0;
            justus.classList.remove('justus-beat-on-stage');
            triggerOnce = true;
        }
        detectCollision(step);
        requestAnimationFrame(animate);
    }

    animate();
}