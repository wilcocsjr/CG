
var BoundingForm = function(){

	this._radius;
	this._movingObject;

	this.setSphere = function(movingObject){
		var material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
		//var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true});
		var geometry = new THREE.SphereGeometry(this.calculateRadius(movingObject), 10, 10);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 0);
		movingObject.add(mesh);
		this._movingObject = movingObject;
	}

	this.calculateRadius = function(object){
		'use strict';
		var box = new THREE.Box3().setFromObject(object);
		var diameter = box.size().x;
		if(box.size().y > diameter){
			diameter = box.size().y;
		}
		if(box.size().z > diameter){
			diameter = box.size().z;
		}
		this._radius = diameter/2
		return (this._radius);
	}

	this.getRadius = function(){
		return this._radius;
	}

	this.getMovingObjectPosition = function(){
		return this._movingObject.position;
	}
}


