
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

	this.checkAlienCollisions = function(){}
	
}