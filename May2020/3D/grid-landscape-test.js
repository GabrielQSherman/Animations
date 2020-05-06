const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    renderPaused = true, //user can toggle animation

    mosPos = {
        x: 1000,
        y: 1000,
    },

    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    landscapePoints = []; // array to contain sphere points before they are rendered

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; cursor: none; margin:auto`

    //event listener for user input
    document.addEventListener('keydown', (evn) => {

        switch (evn.code) {
            case 'Space':
                renderPaused = !renderPaused;
            
                if (!renderPaused) { 
                    render()
                }

                break;
        
        }

    }, false)


    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.strokeStyle = 'white';

    context.lineWidth = .8;
   
   //ANIMATION CYCLE

     render()

      function render() {

        // console.log(frames);

        //counts how many frames have occured
        frames++

        clearFullScreen()

        createGrid()

        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

    function createGrid() {

        for (let i = 2; i < height/2; i*=(1+ height/7000) + frames/40000) {
            
            context.beginPath()
            context.moveTo(0,height/2 + i)
            context.lineTo(width,height/2 + i)
            context.stroke()

            
        }

        for (let i = 10; i < width/2; i+=20) {
            
            context.beginPath()
            context.moveTo(width/2 - i,height/2+2)
            context.lineTo(width/2 - i*2.5,height)
            context.stroke()

            context.beginPath()
            context.moveTo(width/2 + i,height/2+2)
            context.lineTo(width/2 + i*2.5,height)
            context.stroke()
        }

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

