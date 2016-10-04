
var Board = function(){
	
	this._board = new THREE.Object3D();
	this._children = []; // Vai substituir o obj do ficheiro proj.js
	this._material;
	this._geometry;
	this._mesh;

	this.getObject = function(){
		return this._board;
	}

	this.createBoard = function(x, y, z){
		this.addBoard(x, y, z);

	}

	this.addBoard = function(x, y, z){

		_material = new THREE.MeshBasicMaterial({color:0x004e00, wireframe:true});
		_geometry = new THREE.CubeGeometry(10, 10, 5);
		_mesh = new THREE.Mesh(_geometry, _material);

		_mesh.position.set(x, y, z);

		this._board.add(_mesh);
	}

	this.changeWireframe = function(){
		for(var i=0; i < this._board.children.length; i++){
			var object = this._board.children[i];

			object.material.wireframe = !object.material.wireframe;
	}
}