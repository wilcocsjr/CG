
var Bullet = function(){

	MovingObject.apply(this);

	this._bullet = this._movingObject;

	this.createBullet = function(x, y, z){
		_material = new THREE.MeshBasicMaterial({color:0x00FF00, wireframe:false});
		_geometry = new THREE.CylinderGeometry(0.5,0.5,5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(0, 0, 0);

		this._bullet.add(_mesh);

		this._bullet.position.set(x,y,z);

		this.setBoundingForms(5);
	}

	this.move = function(){
		this._bullet.position.y += 1.5;
	}

	this.changeWireframe = function(){}

	this.collidesWith = function(scene, board, ship, alien_number){
		scene.remove(ship.getBullet().getObject());
		ship.setBulletFalse();
		scene.remove(board.getChildObject(alien_number));
		board.removeChild(alien_number);
	}
}