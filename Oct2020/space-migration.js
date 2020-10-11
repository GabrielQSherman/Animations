console.log(`Press Space to Start/Stop Animation,\n\n < and > (Comma and Period): cycle through diffrent 3D structures\n\nLeft/Right Arrow Keys: control how much of the object stays in view\n\nPress 'I' to display current settings\n\nPress 'M' to cycle through 4 color modes\n\nPress 'G' to toggle view in grayscale\n\nPress 'O' to decrease speed that complexity is being added to the object 'P' to increase speed\n\nPress 'L' to toggle camera locking on mouse position/auto-rotate\n\nPress 'F' to toggle flipping of structure's latitude and logitude coordinates`);

// alert('Look At Dev Console For Instructions\nFull Screen Recommended When You Click  \'OK\'')

const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    radius = 222,

    distanceStyle = 4,

    renderPaused = false,    //user can toggle animation paused/unpaused

    grayScale = false,     //user can toggle grayscale

    lockPos = false,     //user can toggle if the object roates on its own or is locked to the mouse position

    flipPos = false,   //user can see what will happen to a given structure if the logitude and latitude get flipped

    viewLimit = 30,  //user can change how much of the object is in view

    cmplxSpd = 47, //user can control how quickly more points will be added to object, range(0-333)

    SSindex = 0, //controls what structure is being displayed on the canvas

    colorMode = 0, //controls what variable determins the color of a given point
    
    coordinates = {   //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    mosPos = { //track mouse position 
        x: 0,
        y: 0,
    },

    superSpos = [ //longitude is represented by true, latitude by false, a ternary oporater will change how the object is structured to showcased diffrent super structures with less code
        {   //torus horizontal
            x1: true,
            x2: true,
            y1: false,
            y2: true,
            z:  false 
        },
        {   //torus vertical
            x1: false,
            x2: false,
            y1: false,
            y2: true,
            z:  true 
        },
    ];

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; cursor: none; margin:auto`


    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)
   
   //ANIMATION CYCLE
     render()

      function render() {

        // console.log(frames);

        clearFullScreen() //clear the canvas of previous animation cycle

        createSphere() //render the sphere

        //counts how many frames have occured
        frames++


        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 10, render)
        }

      }

    function createSphere() {

        let reso = frames/cmplxSpd + 3,//resolution of sphere coord detail
            r = radius; //radius of sphere
    //first loop tracks longitude then the nested loop tracks latitude
        for (let i = 0; i < reso && i < 88; i++) {
            
            let lon = mapNumber(i , 0, reso, 0, pi);

            for (let j = 0; j < reso; j++) {

            let lat = mapNumber(j , 0, reso, 0, pi*2),
                structureObj = {...(superSpos[SSindex])};

            if (flipPos) {   
                for (const key in structureObj) {
                    structureObj[key] = !structureObj[key];
                }
            }

            let x1 = structureObj.x1 ? lon : lat, x2 = structureObj.x2 ? lon : lat,
                y1 = structureObj.y1 ? lon : lat, y2 = structureObj.y2 ? lon : lat,
                z1 = structureObj.z  ? lon : lat;

            //formula for finding  xyz position based on polar angle in a xy system
            const x = (r * Math.sin(x1) * Math.cos(x2)),
                  y = (r * Math.cos(y1) * Math.sin(y2)),
                  z =  r * Math.sin(z1);

            //store the points calculated into a object
            coordinates = {
                x: x,
                y: y,
                z: z
            };

            let xRotation, yRotation;

            if (lockPos) {
                
                xRotation = mosPos.x/177 - Math.PI,
                yRotation = -mosPos.y/177 - Math.PI*3/5;

            } else {
                xRotation = frames/999,
                yRotation = frames/999;
                rotateZ(frames/2222)

            }

            //rotate the points about the origin to give the illusion of 3d
            rotateX(xRotation)
            rotateY(yRotation)
            
            renderPoint(coordinates, j, i)

            }
            
        }

    }

    //render an object's point's position onto the canvas
    function renderPoint(origin, j, i) {

        let light = (origin.z/radius) * 100 > viewLimit + 20 ? (origin.z/radius) * 100 : viewLimit + 20;
        const dis = Math.sqrt((Math.pow(origin.x,2))+(Math.pow(origin.y,2))-(Math.pow(origin.z,2)))/200;
        
        if (light > 5) {
            
            let size  = origin.z/107-.2>.88 ? origin.z/107 : .88;

            context.fillStyle = `hsl(${dis*333+frames*3}, 100%, ${light}%)`

            const renderX = (origin.x/(dis/.5))//mapNumber(origin.x, 0, height/3, 0, dis)*130
            const renderY = (origin.y/(dis/.5))//mapNumber(origin.y, 0, height/3, 0, dis)*130
            
            context.beginPath()
            context.arc(renderX,renderY,size,0, pi*2)
            context.fill()
            
        }
        
    }

    //functions to roate object's positions about the 0,0,0 origin

    function rotateY(radians) {

        let y = coordinates.y;
        coordinates.y = (y * Math.cos(radians)) + (coordinates.z * Math.sin(radians) * -1.0);
        coordinates.z = (y * Math.sin(radians)) + (coordinates.z * Math.cos(radians));
    }

    function rotateX(radians) {

        let x = coordinates.x;
        coordinates.x = (x * Math.cos(radians)) + (coordinates.z * Math.sin(radians) * -1.0);
        coordinates.z = (x * Math.sin(radians)) + (coordinates.z * Math.cos(radians));
    }

    function rotateZ(radians) {

        let x = coordinates.x;
        coordinates.x = (x * Math.cos(radians)) + (coordinates.y * Math.sin(radians) * -1.0);
        coordinates.y = (x * Math.sin(radians)) + (coordinates.y * Math.cos(radians));
    }

    //function clears entire canvas
    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    function mapNumber (number, min1, max1, min2, max2) {
        return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
    };