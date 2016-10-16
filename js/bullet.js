
var Bullet = function(){
	
	this._bullet = new THREE.Object3D();

	this._material;
	this._geometry;
	this._mesh;

	this.getObject = function(){
		return this._bullet;
	}

	this.createBullet = function(x, y, z){
		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.CylinderGeometry(1,1,5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._bullet.add(_mesh);
	}

	this.changeWireframe = function(){

		for(var i=0; i < this._bullet.children.length; i++){
			var object = this._bullet.children[i];

			object.material.wireframe = !object.material.wireframe;
		}
	}

	this.move = function(){
		this._bullet.position.y += 1;
	}
}