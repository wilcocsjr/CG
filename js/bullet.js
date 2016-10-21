
var Bullet = function(){

	MovingObject.apply(this);

	this._bullet = this._movingObject;

	this.createBullet = function(x, y, z){
		_material = new THREE.MeshBasicMaterial({color:0x00FF00, wireframe:false});
		_geometry = new THREE.CylinderGeometry(0.5,0.5,5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._bullet.add(_mesh);
	}

	this.move = function(){
		this._bullet.position.y += 1;
	}

	this.changeWireframe = function(){}
}