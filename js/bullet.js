
var Bullet = function(){

	MovingObject.apply(this);

	this._bullet = this._movingObject;

	this.createBullet = function(x, y, z){

		this._materials.push(new THREE.MeshBasicMaterial({color:0x00FF00}));

		this._materials.push(new THREE.MeshLambertMaterial({color:0x00FF00}));

		this._materials.push(new THREE.MeshPhongMaterial({color:0x00FF00, specular: 0xffffff, shininess: 100}));

		this._geometry = new THREE.CylinderGeometry(0.5,0.5,5);
		this._mesh = new THREE.Mesh(this._geometry, this._materials[this._materials.length - 3]);

		this._mesh.position.set(0, 0, 0);

		this._bullet.add(this._mesh);

		this._bullet.position.set(x,y,z);

		this.setBoundingForms(5);
	}

	this.move = function(){
		this._bullet.position.y += 1.5;
	}

	this.changeWireframe = function(){}

	this.changeLighting = function(){}

    this.changeSombreamento = function(gouraud){}

	this.collidesWith = function(scene, board, ship, alien_number){
		scene.remove(ship.getBullet().getObject());
		ship.setBulletFalse();
		scene.remove(board.getChildObject(alien_number));
		board.removeChild(alien_number);
	}
}