
var InvaderB = function(){

	this._invaderB = new THREE.Object3D();
	this._material;
	this._geometry;
	this._mesh;

	this.getObject = function(){
		return this._invaderB;
	}

	this.createInvaderB = function(x, y, z){
		'use strict';

		this.addHead(x, y, z);
		this.addComunnicater(x, y + 3, z);
		this.addBall(x, y + 6, z)
		this.addEye(x - 2, y, z + 2);
		this.addEye(x + 2, y, z + 2);
		this.addEar(x - 5.5, y, z, -1.55);
		this.addEar(x + 5.5, y, z, 1.55);
	}

	this.addHead = function(x, y, z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.CylinderGeometry(2,2,10,10,1,false,20,7); //(2, 10, 10)
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(0, 0, 0);
		_mesh.rotateZ(1.55);
		_mesh.position.set(x, y, z);

		this._invaderB.add(_mesh)
	}

	this.addComunnicater = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.CylinderGeometry(0.5,0.5,2,2, 1, false, 20, 7); //(2, 10, 10)
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x , y, z);

		this._invaderB.add(_mesh);
	}

	this.addBall = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0x3232ff, wireframe:true});
		_geometry = new THREE.SphereGeometry(2,20,20);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._invaderB.add(_mesh);

	}

	this.addEye = function(x,y,z){

		_material = new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true});
		_geometry = new THREE.CubeGeometry(1,2,0.5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._invaderB.add(_mesh);
	}

	this.addEar = function(x,y,z,rotate){

		_material = new THREE.MeshBasicMaterial({color:0xc3c3c3, wireframe:true});
		_geometry = new THREE.CylinderGeometry(0, 1.5, 2, 10, false);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(0 , 0, 0);
		_mesh.rotateZ(rotate)
		_mesh.position.set(x, y, z);

		this._invaderB.add(_mesh)
	}

	this.changeWireframe = function(){

		for(var i=0; i < this._invaderB.children.length; i++){
			var object = this._invaderB.children[i];

			object.material.wireframe = !object.material.wireframe;
		}
	}
}
