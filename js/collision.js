
var Collision = function(){
	
	this.checkBulletCollisions = function(ship, board, killSound){
		'use strict';
		var bulletBox = new THREE.Box3().setFromObject(ship.getBullet().getObject());
		var bulletSphere = bulletBox.getBoundingSphere();
		for(var i = 1; i < board.getNumberOfChildren(); i++){
			var alienBox = new THREE.Box3().setFromObject(board.getChildObject(i));
			var alienSphere = alienBox.getBoundingSphere();
			if(bulletSphere.intersectsSphere(alienSphere)){
				if(bulletBox.intersectsBox(alienBox)){
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
	}

	this.checkAlienCollisions = function(board){
		for (var i = 1; i < board.getNumberOfChildren(); i++){
			var alienBox = new THREE.Box3().setFromObject(board.getChildObject(i));
			var alienSphere = alienBox.getBoundingSphere();
			for(var k = 1; k < board.getNumberOfChildren(); k++){
				if(k!=i){
					var otheralienBox = new THREE.Box3().setFromObject(board.getChildObject(k));
					var otheralienSphere = otheralienBox.getBoundingSphere();
					if(alienSphere.intersectsSphere(otheralienSphere)){
						if(alienBox.intersectsBox(otheralienBox)){
							board.getChild(i).reverseDirection();
							board.getChild(k).reverseDirection();

						}
					}
				}
				
			}

		}

	}
}
