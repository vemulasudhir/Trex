var trex, trex_run, trex_collide
var ground, ground_image, invisible_ground
var cloudImage, cloud
var obstacles1,obstacles2,obstacles3,obstacles4,obstacles5,obstacles6
var cloudGroup, obstacleGroup
var score = 0
var gameState = play
var play = 1
var end = 0

function preload() {
trex_run = loadAnimation("trex1.png","trex3.png","trex4.png")
trex_collide = loadAnimation("trex_collided.png")  
ground_image = loadImage("ground2.png")
cloudImage = loadImage("cloud.png")  
obstacles1 = loadImage("obstacle1.png")  
obstacles2 = loadImage("obstacle2.png") 
obstacles3 = loadImage("obstacle3.png")     
obstacles4 = loadImage("obstacle4.png")     
obstacles5 = loadImage("obstacle5.png")     
obstacles6 = loadImage("obstacle6.png")     
}



function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,170,20,20)
  trex.addAnimation("trex_run", trex_run)
  trex.addAnimation("trex_collided",trex_collide)
  trex.scale = .5
  ground = createSprite(300,180,20,600)
  ground.addImage("ground_image", ground_image)
  invisible_ground = createSprite(300,190,600,5)
  invisible_ground.visible = false
  cloudGroup = new Group()
  obstacleGroup= new Group()
}


function draw() {
  background(255);
  
  if(gameState === play){
  ground.velocityX = -3
  
  
  if(ground.x < 0){
  ground.x = ground.width/2
  }
  
  if(keyDown("space")&& trex.y > 150){
 trex.velocityY = -10
 
  }
 trex.velocityY = trex.velocityY + 0.8 
 
 
  
  if(frameCount % 80 === 0){
 spawnClouds()
 }
  spawnObstacles()
  score=score+ Math.round(getFrameRate()/60)
  }
else if(gameState===end){
ground.velocityX = 0
obstacleGroup.setVelocityXEach(0)
cloudGroup.setVelocityXEach(0)  
trex.changeAnimation("trex_collided",trex_collide)
obstacleGroup.setLifetimeEach(-1)
cloudGroup.setLifetimeEach(-1)  


}
  
  
  trex.collide(invisible_ground)
  text("score:"+score,500,50)   
  
 
  
  drawSprites()
  

}

function spawnClouds(){
var clouds = createSprite(570,random(130,0),30,30)
clouds.addImage("cloudImage",cloudImage)
clouds.velocityX = -3
 clouds.depth = trex.depth
  trex.depth = trex.depth + 1
  clouds.lifetime = 600/3
  cloudGroup.add(clouds)
}
function spawnObstacles(){
if(frameCount % 90=== 0) { 
var obstacles = createSprite(600,170,30,30)
obstacles.scale = .5
var randomNumber = Math.round(random(1,6))
switch(randomNumber){
  case 1: obstacles.addImage(obstacles1)  
    break;
  case 2: obstacles.addImage(obstacles2)  
    break; 
  case 3: obstacles.addImage(obstacles3) 
    break;    
  case 4: obstacles.addImage(obstacles4)  
    break; 
  case 5: obstacles.addImage(obstacles5)  
    break;  
  case 6: obstacles.addImage(obstacles6)  
    break;   
    default:break       
}
  obstacles.velocityX = -4
  obstacles.lifetime = 200
  obstacleGroup.add(obstacles)
}    
}