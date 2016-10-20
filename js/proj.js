/*global THREE*/


var camera, scene, renderer;
var board, ship;
var oldClock, now;
var delta;
var camera_1, camera_2, camera_3, camera_ort, camera_pers;

function init(){
	'use strict';
	oldClock = Date.now();

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();
	
	render();
	animate();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}

//CRIAR A CENA E CHAMAR OS OBJETOS
function createScene(){
	'use strict';

	scene = new THREE.Scene();

	board = new Board();

	board.createBoard();
}

function createCamera(){
	'use strict';
	// Check on function onResize() viewSize is the same (it must be!)
	var viewSize = 100;

	var aspectRatio = window.innerWidth / window.innerHeight;

	camera = new THREE.OrthographicCamera(-aspectRatio * viewSize, aspectRatio * viewSize, viewSize, -viewSize, -1000, 1000);
	// 2D
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 1;
	camera.lookAt(scene.position);
	camera_ort = true;
	camera_1 = camera;
	camera2();
	camera3();
}

function camera2(){
	'use strict';
	var viewSize = 60;

	var aspectRatio = window.innerWidth / window.innerHeight;

	camera_2 = new THREE.PerspectiveCamera(viewSize, aspectRatio, 1, 1000);

	camera_2.position.x = 0;
	camera_2.position.y = -150;
	camera_2.position.z = 200;
	camera_2.lookAt(scene.position);
}

function camera3(){
	'use strict';
	var viewSize = 60;

	var aspectRatio = window.innerWidth / window.innerHeight;

	camera_3 = new THREE.PerspectiveCamera(viewSize, aspectRatio, 1, 1000);

	camera_3.position.x = ship.getObject().position.x;
	camera_3.position.y = -150;
	camera_3.position.z = 50;
	camera_3.up = new THREE.Vector3(0 , 0, ship.getObject().position.x + viewSize);
	camera_3.lookAt(new THREE.Vector3(0, 0, 0));
}

function onResize(){
	'use strict';

	// Check on function createCamera() viewSize is the same (it must be!)
	var viewSize;

	var aspectRatio = window.innerWidth / window.innerHeight;

	renderer.setSize(window.innerWidth, window.innerHeight);

	if(camera_ort){
		if(window.innerHeight > 0 && window.innerWidth > 0){
			viewSize = 100;
	        camera.left = -aspectRatio * viewSize;
	        camera.right = aspectRatio * viewSize;
	        camera.top = viewSize;
	        camera.bottom = -viewSize;
		}
	}
	else if(camera_pers){
		if(window.innerHeight > 0 && window.innerWidth > 0)
			camera.aspect = renderer.getSize().width / renderer.getSize().height;
	}
	camera.updateProjectionMatrix();
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		case 65:
			board.changeWireframe();
			break;
		case 66:
			if (ship.shoot())
				scene.add(ship.getBullet().getObject());
			break;
		case 37: // left
			ship.turnOnLeftEngine();
        	break;
        case 39: // right
        	ship.turnOnRightEngine();
        	break;
        case 49: // camera 1
        	camera = camera_1;
        	camera_ort = true;
        	camera_pers = false;
        	break;
        case 50: // camera 2
        	camera = camera_2;
        	camera_pers = true;
        	camera_ort = false;
        	break;
        case 51: // camera 3
        	camera = camera_3;
        	camera_pers = true;
        	camera_ort = false;
        	break;
        case 82:
        	board.restartBoard();
        default:
        	break;
	}
}

function onKeyUp(e){
	'use strict';

	switch(e.keyCode){
		case 37: // left
			ship.turnOfLeftEngine();
        	break;
        case 39: // right
        	ship.turnOfRightEngine();
        	break;
        default:
        	//break;
	}
}

function render() {
	'use strict';
	renderer.render(scene, camera);
}

function animate(){
	'use strict';
	var now = Date.now();
	delta = now - oldClock;
	oldClock = now;

	if(board.shipInLimits()){
		ship.move();

		ship.moveInercia();

		camera_3.position.x = ship.getObject().position.x;
	}

	if (ship.getBulletBoll()){
		if (board.bulletInLimits()){
			ship.getBullet().move();
			checkColisions(ship.getBullet(), board.getChildren())
		}
		else{
			scene.remove(ship.getBullet().getObject());
			ship.setBulletFalse();
		}	
	}	
	render();
	requestAnimationFrame(animate);
}



function checkColisions(a, b){
	'use strict';
	var bulletBox = new THREE.Box3().setFromObject(ship.getBullet().getObject());
	for(var i = 1; i < board.getNumberOfChildren(); i++){
		var alienBox = new THREE.Box3().setFromObject(board.getChild(i));
		if(intersect(bulletBox, alienBox)){
			console.log("colided");
			scene.remove(ship.getBullet().getObject());
			ship.setBulletFalse();
			scene.remove(board.getChild(i));
			board.removeChild(i);
			return;
		}
	}
}


function intersect(a, b) {
	'use strict';
	return (a.min.x <= b.max.x && a.max.x >= b.min.x) &&
		(a.min.y <= b.max.y && a.max.y >= b.min.y) &&
		(a.min.z <= b.max.z && a.max.z >= b.min.z);
}