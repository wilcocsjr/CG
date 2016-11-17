
var Collision = function(){
	
	this.checkBulletCollisions = function(ship, board, killSound){
		'use strict';
		var bulletSphere = ship.getBullet().getSphere();
		for(var i = 1; i < board.getNumberOfChildren(); i++){
			var alienSphere = board.getChild(i).getSphere();
			if(intersect(alienSphere, bulletSphere)){
				ship.getBullet().collidesWith(scene, board, ship, i);
				killSound.currentTime = 0;
				killSound.play();
				return;
			}
		}
	}

	this.checkAlienCollisions = function(board){
		for (var i = 1; i < board.getNumberOfChildren(); i++){
			var alienSphere = board.getChild(i).getSphere();
			for(var k = 0; k < board.getNumberOfChildren(); k++){
				if(k!=i){
					var otheralienSphere = board.getChild(k).getSphere();
					if(intersect(alienSphere, otheralienSphere)){
                        if (board.getChildObject(i).position.x < board.getChildObject(k).position.x){
                            board.getChildObject(i).position.x -= 1;
                            if(k == 0){
                            	scene.remove(board.getChildObject(i));
                            	board.removeChild(i);
                            	board.getChild(k).collidesWith();
                            	continue;
                            }
                            else if(k > 0)
                                board.getChildObject(k).position.x += 1;
                        }
                        if (board.getChildObject(i).position.x > board.getChildObject(k).position.x){
                            board.getChildObject(i).position.x += 1;
                            if(k == 0){
                            	scene.remove(board.getChildObject(i));
                            	board.removeChild(i);
                            	board.getChild(k).collidesWith();
                            	continue
                            }
                            else if(k > 0)
                                board.getChildObject(k).position.x -= 1;
                        }
						board.getChild(i).collidesWith(); 
						board.getChild(k).collidesWith();
					}
				}
				
			}

		}

	}


	function intersect(a, b) {
		'use strict';
		return (Math.pow((a.getMovingObjectPosition().x - b.getMovingObjectPosition().x), 2)
				 + Math.pow((a.getMovingObjectPosition().y - b.getMovingObjectPosition().y), 2) 
				 + Math.pow((a.getMovingObjectPosition().z - b.getMovingObjectPosition().z), 2) < Math.pow((a.getRadius() + b.getRadius()), 2));
		
	}
}
