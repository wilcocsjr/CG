
var MovingObject = function(){

	this._movingObject = new THREE.Object3D();

	this._material;
	this._geometry;
	this._mesh;

	this.getObject = function(){
		return this._movingObject;
	}
	
	this.move = function(){
		throw new Error('Cannot call abstract method \"move\" ');
	}

	this.setBoundingForms = function(){
		var boundingForm = new BoundingForm();

		boundingForm.setBox(this._movingObject);
		boundingForm.setSphere(this._movingObject);
	}

	this.changeWireframe = function(){

		for(var i=0; i < this._movingObject.children.length; i++){
			var object = this._movingObject.children[i];

			object.material.wireframe = !object.material.wireframe;
		}
	}
}