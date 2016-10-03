
var Table = function(){
	
	this._table = new THREE.Object3D();
	this._children = []; // Vai substituir o obj do ficheiro proj.js
	this._material;
	this._geometry;
	this._mesh;

	this.getObject = function(){
		return this._table;
	}

	this.createTable = function(){}

	this.changeWireframe = function(){}
}