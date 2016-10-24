
var Collision = function(){
	
	this.checkBulletCollisions = function(ship, board, killSound){
		'use strict';
		var bulletBox = new THREE.Box3().setFromObject(ship.getBullet().getObject());
		var bulletSphere = bulletBox.getBoundingSphere();
		for(var i = 1; i < board.getNumberOfChildren(); i++){
			var alienBox = new THREE.Box3().setFromObject(board.getChild(i));
			var alienSphere = alienBox.getBoundingSphere();
			if(bulletSphere.intersectsSphere(alienSphere)){
				if(bulletBox.intersectsBox(alienBox)){
					scene.remove(ship.getBullet().getObject());
					ship.setBulletFalse();
					scene.remove(board.getChild(i));
					board.removeChild(i);
					killSound.currentTime = 0;
					killSound.play();
					return;
				}
			}
		}
	}

	this.checkAlienCollisions = function(board){
		for (var i = 1; i < board.getNumberOfChildren(); i++){
			var alienBox = new THREE.Box3().setFromObject(board.getChild(i));
			var alienSphere = alienBox.getBoundingSphere();
			for(var k = 1; k < board.getNumberOfChildren(); k++){
				if(k!=i){
					var otheralienBox = new THREE.Box3().setFromObject(board.getChild(k));
					var otheralienSphere = otheralienBox.getBoundingSphere();
					if(alienSphere.intersectsSphere(otheralienSphere)){
						if(alienBox.intersectsBox(otheralienBox)){
							board.getAlien(i).reverseDirection();
							board.getAlien(k).reverseDirection();

						}
					}
				}
				
			}

		}

		for(var i = 1; i < board.getNumberOfChildren(); i++){
			if (board.getChild(i).position.x >= 100 || board.getChild(i).position.x <= -100){
				board.getAlien(i).reflectDirectionSides();
            }
            else if(board.getChild(i).position.y <= -60 || board.getChild(i).position.y >= 90){
                board.getAlien(i).reflectDirection();
			}
		}

	}
}
