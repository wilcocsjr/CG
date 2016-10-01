var _invaderB;
var _x, _y, _z;

class InvaderB{

	constructor(){}

	createInvaderB(x, y, z){

		_x = x;
		_y = y;
		_z = z;

		this._material;

		this._geometry;

		this._mesh;

		_invaderB = new THREE.Object3D();

		this.addHead(x, y, z);

		this.addComunnicater(x, y + 3, z);

		this.addBall(x, y + 6, z)

		this.addEye(x - 2, y, z + 2);

		this.addEye(x + 2, y, z + 2);

		this.addEar(x - 5.5, y, z, -1.55);

		this.addEar(x + 5.5, y, z, 1.55);

		return _invaderB;
	}

	addHead(x, y, z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.CylinderGeometry(2,2,10,10,1,false,20,7); //(2, 10, 10)
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(0, 0, 0);
		_mesh.rotateZ(1.55);
		_mesh.position.set(x, y, z);

		_invaderB.add(_mesh)
	}

	addComunnicater(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.CylinderGeometry(0.5,0.5,2,2, 1, false, 20, 7); //(2, 10, 10)
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x , y, z);

		_invaderB.add(_mesh);
	}

	addBall(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.SphereGeometry(2,20,20);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_invaderB.add(_mesh);

	}

	addEye(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true});
		_geometry = new THREE.CubeGeometry(1,2,0.5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		_invaderB.add(_mesh);
	}

	addEar(x,y,z,rotate){

		_material = new THREE.MeshBasicMaterial({color:0xc3c3c3, wireframe:true});
		_geometry = new THREE.CylinderGeometry(0, 1.5, 2, 10, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(0 , 0, 0);
		_mesh.rotateZ(rotate)
		_mesh.position.set(x, y, z);

		_invaderB.add(_mesh)
	}
}
