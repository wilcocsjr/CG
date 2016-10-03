
var InvaderA = function(){

	this._invaderA = new THREE.Object3D();
	this._material;
	this._geometry;
	this._mesh;

	this.getObject = function(){
		return this._invaderA;
	}

	this.createInvaderA = function(x, y ,z){

		this.addHead(x, y, z);
		this.addHorn(x + 2.5, y + 5, z);
		this.addHorn(x - 2.5, y + 5, z)
		this.addEye(x - 3.5, y, z + 2.5);
		this.addEye(x + 3, y, z + 2.5);
		this.addEye(x - 1, y + 1, z + 2.5);
		this.addEye(x + 1, y + 1, z + 2.5);
		this.addMouth(x, y - 1.5, z + 2.5);
		this.addEar(x - 4.25, y, z, -1.55);
		this.addEar(x + 4.75, y, z, 1.55);
	}

	this.addHead = function(x, y, z){

		_material = new THREE.MeshBasicMaterial({color:0x004e00, wireframe:true})
		_geometry = new THREE.CubeGeometry(10, 5, 5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._invaderA.add(_mesh)
	}

	this.addHorn = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xc3c3c3, wireframe:true});
		_geometry = new THREE.CylinderGeometry(0, 1.5, 5, 10, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x , y, z);

		this._invaderA.add(_mesh);
	}

	this.addEye = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xaf0000, wireframe:true});
		_geometry = new THREE.CylinderGeometry(1, 1, 0, 0, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);
		_mesh.rotateX(1.57079633);

		this._invaderA.add(_mesh);
	}

	this.addMouth = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xa1e1e1e, wireframe:true});
		_geometry = new THREE.CylinderGeometry(1, 1, 0, 0, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_mesh.rotateX(1.75);

		this._invaderA.add(_mesh);
	}

	this.addEar = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.SphereGeometry(2, 10, 10);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(0 , 0, 0);
		_mesh.rotateX(1)
		_mesh.position.set(x, y, z);

		this._invaderA.add(_mesh)
	}

	this.changeWireframe = function(){

		for(var i=0; i < this._invaderA.children.length; i++){
			var object = this._invaderA.children[i];

			object.material.wireframe = !object.material.wireframe;
		}
	}

}