
var Bullet = function(){
	
	this._bullet = new THREE.Object3D();

	this.getObject = function(){
		return this._bullet;
	}

	this.createBullet = function(){

	}

	this.changeWireframe = function(){

		for(var i=0; i < this._bullet.children.length; i++){
			var object = this._bullet.children[i];

			object.material.wireframe = !object.material.wireframe;
		}
	}
}