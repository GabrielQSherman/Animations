//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      size = 48.1;                                  //determins size of each square

   
    //ANIMATION CYCLE


    context.translate(width/2, height/2)
    context.rotate(.5)
    
    animate()
    function animate() {

            time+=.2

            if (time > 200) {
                return
            }

                
                
                console.log('before');

                setTimeout( () => {

                    create_pattern()

                    animate()

                }, 30 )

                console.log('after');
                
                
                // make_circle(time, time, curClr, time);
                
    
            

            

            console.log(time);
    }

    // FUNCTIONS

    function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 100%, 50%)'
        context.stroke()
        
    }

    function create_pattern() {

        // context.rotate(.03)

        let curClr = (time * 3) + 250;

        for ( let i = -2; i <= 2; i+=1) {

            context.save()

            context.rotate(Math.PI/i)

            let 
                translatex = time*time,
                translatey = (Math.sin(time) * 30) + time*6;

            context.translate(translatex, translatey);

             make_circle(time, time, curClr, time);

             context.restore()
        }
        
    }

