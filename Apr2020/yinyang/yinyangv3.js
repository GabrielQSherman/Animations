let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 0;

    document.body.style.backgroundColor = 'deeppink';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

     render()

      function render() {
        time = time < 444 ? time + 1 : 444;

        clearFullScreen()

        yinyang(time)

        let radian = (537 - time)/17000

        // context.rotate(-radian)

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function yinyang(radius) {

        context.save()

        context.fillStyle = 'white';
        context.beginPath()
        context.arc(0,0,radius/1.39,Math.PI*2/3,Math.PI*4/3)
        context.arc(radius/3,0,radius/1.39,Math.PI*2/3,Math.PI*4/3)
        context.fill()

        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius/1.39,Math.PI*4/3,Math.PI*6/3)
        context.arc(-radius/7,radius/4,radius/1.39,Math.PI*4/3,Math.PI*6/3)
        context.fill()

        context.fillStyle = 'lightgrey';
        context.beginPath()
        context.arc(0,0,radius/1.39,Math.PI*6/3,Math.PI*2/3)
        context.arc(-radius/7,-radius/4,radius/1.39,Math.PI*6/3,Math.PI*2/3)
        context.fill()
        //first circle origin in the middle of all three circles
        context.translate(Math.sqrt(3)*.22222*radius, 0);


        // circle 1
        context.fillStyle = 'lightgrey';
        context.beginPath()
        context.arc(0,0,radius/3,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'darkgrey'; 
        context.beginPath()
        context.arc(0,0,radius/7,0,Math.PI*2)
        context.fill()

        //translate to next circle origin
        context.rotate(Math.PI/3)
        context.translate(0, radius/3*2);

        //circle 2
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius/3,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius/7,0,Math.PI*2)
        context.fill()

        context.rotate(Math.PI/1.5)
        context.translate(0, radius/3*2);


        //circle 3
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius/3,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius/7,0,Math.PI*2)
        context.fill()

     
        context.restore()
    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }