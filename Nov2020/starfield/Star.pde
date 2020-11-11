

class Star {
 
   private float x;
   private float y;
   private float velocity;
   private float light;
   private float angle;
   private float z;
   
   
   public Star( float originX, float originY, float originZ) {
     light = 10;
     velocity = random(.01, .025);
     x = originX;
     y = originY;
     z = originZ;
     
     calculateAngle();
   }
   
   void display() {
     
     float distance = sqrt( pow(x,2) + pow(y,2));
     float maxLen = map( velocity, .01, .03, 50, 250);
     float trailLen = map( distance, 0, maxDistance, 0, maxLen);
     float trailWidth = trailLen/50 + .1;
     
     //int maxColor = abs(-360-frames) % 360;
     //int minColor = abs(-frames) % 360;
     //int sat = (int) (100-light*.8);
     //color c1 = color(maxColor, sat, light);
     //color c2 = color(minColor, sat, light);
     
     //color grad = lerpColor(c1, c2, map(distance, 0, maxDistance, 0, 1)); 
     
     //fill(grad);
     fill(light);
     
     pushMatrix();
     translate(x, y, z);
     rotate(angle);
     ellipse(0,0,light/50, light/50);
     //ellipse(0, 0, trailLen, trailWidth);
     popMatrix();
     
     this.updatePos();
   }
   
   void updatePos() {
     
      x *= 1 + velocity * speed;
      y *= 1 + velocity * speed;
      z *= 1 + velocity * speed;
      light = light < 255 ? light * (1 + velocity*2) : 255;
      
      //if ( x > width || x < -width || y > height || y < -height) println("out");
      if (z > width*1.5) this.reset();
   }
   
   void reset() {
     
     light = 10;

     float 
       ranAngle = random(100),
       radius = 5,
       randomX1 = (cos(ranAngle) * radius),
       randomY1 = (sin(ranAngle) * radius),
       randomX2 = (cos(ranAngle) * radius * 4),
       randomY2 = (sin(ranAngle) * radius * 4),
       ranNum = random(1, 17);

      x =  (randomX2 * ranNum) + (randomX1 * ranNum) * random(1);
      y =  (randomY2 * ranNum) + (randomY1 * ranNum) * random(5);
      z =  random(500);
   
     calculateAngle();
   }
   
   void calculateAngle() {
   
     float hypotenuse = sqrt( pow(x,2) + pow(y,2));
     
     float trigVal = x / hypotenuse;
     
     float resultAngle = asin(trigVal) + PI/2;
     
     angle = y > 0 ? -resultAngle : resultAngle;
     
     
   }
   
}
