
var InvaderB = function(){

	Invader.apply(this);

	this.createInvader = function(x, y, z){
		'use strict';

		this.addHead( 0, 0, 0);
		this.addComunnicater( 0, 3, 0);
		this.addBall( 0, 6, 0)
		this.addEye( -2, 0, 2);
		this.addEye( 2, 0, 2);
		this.addEar( -5.5, 0, 0, -1.55);
		this.addEar( 5.5, 0, 0, 1.55);

		this._invader.position.set(x, y, z);

		this.setBoundingForms(5.5);
	}

	this.addHead = function(x, y, z){

		this._materials.push(new THREE.MeshBasicMaterial({color:0x3232ff}));

		this._materials.push(new THREE.MeshLambertMaterial({color:0x3232ff}));

		this._materials.push(new THREE.MeshPhongMaterial({color:0x3232ff, specular: 0xffffff, shininess: 100}));

		this._geometry = new THREE.CylinderGeometry(2,2,10,10,1,false,20,7); //(2, 10, 10)
		this._mesh = new THREE.Mesh(this._geometry, this._materials[this._materials.length - 2]);

		this._mesh.position.set(x, y, z);

		this._mesh.rotateZ(1.55);

		this._invader.add(this._mesh);
	}

	this.addComunnicater = function(x,y,z){

		this._materials.push(new THREE.MeshBasicMaterial({color:0x3232ff}));

		this._materials.push(new THREE.MeshLambertMaterial({color:0x3232ff}));

		this._materials.push(new THREE.MeshPhongMaterial({color:0x3232ff, specular: 0xffffff, shininess: 100}));

		this._geometry = new THREE.CylinderGeometry(0.5,0.5,2,2, 1, false, 20, 7); //(2, 10, 10)
		this._mesh = new THREE.Mesh(this._geometry, this._materials[this._materials.length - 2]);

		this._mesh.position.set(x , y, z);

		this._invader.add(this._mesh);
	}

	this.addBall = function(x,y,z){

		this._materials.push(new THREE.MeshBasicMaterial({color:0x3232ff}));

		this._materials.push(new THREE.MeshLambertMaterial({color:0x3232ff}));

		this._materials.push(new THREE.MeshPhongMaterial({color:0x3232ff, specular: 0xffffff, shininess: 100}));

		this._geometry = new THREE.SphereGeometry(2,20,20);
		this._mesh = new THREE.Mesh(this._geometry, this._materials[this._materials.length - 2]);

		this._mesh.position.set(x, y, z);

		this._invader.add(this._mesh);

	}

	this.addEye = function(x,y,z){

		this._materials.push(new THREE.MeshBasicMaterial({color:0xffffff}));

		this._materials.push(new THREE.MeshLambertMaterial({color:0xffffff}));

		this._materials.push(new THREE.MeshPhongMaterial({color:0xffffff, specular: 0xffffff, shininess: 100}));

		this._geometry = new THREE.CubeGeometry(1,2,0.5);
		this._mesh = new THREE.Mesh(this._geometry, this._materials[this._materials.length - 2]);

		this._mesh.position.set(x, y, z);

		this._invader.add(this._mesh);
	}

	this.addEar = function(x,y,z,rotate){

		this._materials.push(new THREE.MeshBasicMaterial({color:0xc3c3c3}));

		this._materials.push(new THREE.MeshLambertMaterial({color:0xc3c3c3}));

		this._materials.push(new THREE.MeshPhongMaterial({color:0xc3c3c3, specular: 0xffffff, shininess: 100}));

		this._geometry = new THREE.CylinderGeometry(0, 1.5, 2, 10, false);
		this._mesh = new THREE.Mesh(this._geometry, this._materials[this._materials.length - 2]);

		this._mesh.position.set(x, y, z);

		this._mesh.rotateZ(rotate);

		this._invader.add(this._mesh);
	}
}
