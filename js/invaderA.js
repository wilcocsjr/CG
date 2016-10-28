
var InvaderA = function(){

	Invader.apply(this);

	this.createInvader = function(x, y ,z){

		this.addHead( 0, 0, 0);
		this.addHorn( 2.5, 5, 0);
		this.addHorn( -2.5, 5, 0)
		this.addEye( -3.5, 0, 3);
		this.addEye( 3, 0, 3);
		this.addEye( -1, 1, 3);
		this.addEye( 1, 1, 3);
		this.addMouth( 0, -1.5, 2.5);
		this.addEar( -4.25, 0, 0, -1.55);
		this.addEar( 4.75, 0, 0, 1.55);

		this._invader.position.set(x,y,z);

		this.setBoundingForms(4.75);
	}

	this.addHead = function(x, y, z){

		_material = new THREE.MeshBasicMaterial({color:0x004e00, wireframe:false})
		_geometry = new THREE.CubeGeometry(10, 5, 5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._invader.add(_mesh)
	}

	this.addHorn = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xc3c3c3, wireframe:false});
		_geometry = new THREE.CylinderGeometry(0, 1.5, 5, 10, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x , y, z);

		this._invader.add(_mesh);
	}

	this.addEye = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xaf0000, wireframe:false});
		_geometry = new THREE.CylinderGeometry(1, 1, 0, 0, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_mesh.rotateX(1.57079633);

		this._invader.add(_mesh);
	}

	this.addMouth = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xa1e1e1e, wireframe:false});
		_geometry = new THREE.CylinderGeometry(1, 1, 0, 0, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_mesh.rotateX(1.75);

		this._invader.add(_mesh);
	}

	this.addEar = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:false});
		_geometry = new THREE.SphereGeometry(2, 10, 10);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_mesh.rotateX(1);

		this._invader.add(_mesh)
	}

}
