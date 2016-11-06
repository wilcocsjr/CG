
var MovingObject = function(){

	this._movingObject = new THREE.Object3D();

	// To check collisions
	this._box;
	this._sphere;

	this._materials = [];
	this._material;
	this._geometry;
	this._mesh;

	this.getObject = function(){
		return this._movingObject;
	}

	this.getSphere = function(){
		return this._sphere;
	}
	
	this.move = function(){
		throw new Error('Cannot call abstract method \"move\" ');
	}

	this.setBoundingForms = function(radius){
		this._sphere = new BoundingForm();
		this._sphere.setSphere(this._movingObject, radius);
	}

	this.changeWireframe = function(){

		for(var i=0; i < this._movingObject.children.length; i++){
			var object = this._movingObject.children[i];

			object.material.wireframe = !object.material.wireframe;
		}
	}

	this.changeLighting = function(){
     	for(var i=0; i < this._movingObject.children.length - 1; i++){
			var object = this._movingObject.children[i];

			object.material = this._materials[3*i];
     	}
    }

     this.changeSombreamento = function(gouraud){
     	for(var i=0; i < this._movingObject.children.length - 1; i++){
			var object = this._movingObject.children[i];

			if(gouraud == true)
				object.material = this._materials[3 * (i + 1) - 1];
			else
				object.material = this._materials[3 * (i + 1) - 2];
		}
     }
}