
var Collision = function(){
	
	this.checkBulletCollisions = function(ship, board, killSound){
		'use strict';
		var bulletSphere = ship.getBullet().getSphere();
		for(var i = 1; i < board.getNumberOfChildren(); i++){
			var alienSphere = board.getChild(i).getSphere();
			if(intersect(alienSphere, bulletSphere)){
				scene.remove(ship.getBullet().getObject());
				ship.setBulletFalse();
				scene.remove(board.getChildObject(i));
				board.removeChild(i);
				killSound.currentTime = 0;
				killSound.play();
				return;
			}
		}
	}

	this.checkAlienCollisions = function(board){
		for (var i = 1; i < board.getNumberOfChildren(); i++){
			var alienSphere = board.getChild(i).getSphere();
			for(var k = 1; k < board.getNumberOfChildren(); k++){
				if(k!=i){
					var otheralienSphere = board.getChild(i).getSphere();
					if(intersect(alienSphere, otheralienSphere)){
						//board.getChild(i).reverseDirection();   //ele fica todo queimado ao fazer qualquer açao neste if
						//board.getChild(k).reverseDirection();
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
