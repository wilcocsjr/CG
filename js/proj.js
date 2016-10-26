/*global THREE*/


var camera, scene, renderer;
var board, ship, collision;
var oldClock, now;
var delta;
var camera_1, camera_2, camera_3, camera_ort, camera_pers;
var shotSound, killSound, themeSound, playing;
var rotated1, rotated2;

function init(){
	'use strict';
	oldClock = Date.now();

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();
	
	getMusic();
	render();
	animate();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}

function getMusic(){
	'use strict';
	shotSound = document.createElement('audio');
	var shotSource = document.createElement('source');
	shotSource.src = 'sounds/shot.mp3';
	shotSound.appendChild(shotSource);
	shotSound.volume = 0.1;

	killSound = document.createElement('audio');
	var killSource = document.createElement('source');
	killSource.src = 'sounds/kill.mp3';
	killSound.appendChild(killSource);
	killSound.volume = 0.1;

	themeSound = document.createElement('audio');
	var themeSource = document.createElement('source');
	themeSource.src = 'sounds/theme.mp3';
	themeSound.appendChild(themeSource);
	themeSound.volume = 0.1;
	themeSound.loop = true;
	//themeSound.play();
	playing = false;
}

//CRIAR A CENA E CHAMAR OS OBJETOS
function createScene(){
	'use strict';

	scene = new THREE.Scene();

	board = new Board();

	board.createBoard();

	collision = new Collision();
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
	rotated1 = true;
	rotated2 = false;
}

function camera2(){
	'use strict';
	var viewSize = 60;

	var aspectRatio = window.innerWidth / window.innerHeight;

	camera_2 = new THREE.PerspectiveCamera(viewSize, aspectRatio, 1, 1000);

	camera_2.position.x = 0;
	camera_2.position.y = -150;
	camera_2.position.z = 75;
	camera_2.lookAt(scene.position);
}

function camera3(){
	'use strict';
	var viewSize = 60;

	var aspectRatio = window.innerWidth / window.innerHeight;

	camera_3 = new THREE.PerspectiveCamera(viewSize, aspectRatio, 1, 1000);

	camera_3.position.x = ship.getObject().position.x;
	camera_3.position.y = -88;
	camera_3.position.z = 16;
	camera_3.up = new THREE.Vector3(0 , 0, ship.getObject().position.x + viewSize);
	camera_3.lookAt(new THREE.Vector3(0, 0, 0));
}

function cameraRotateBack(){
	if (rotated1 == false && rotated2 == true)
		for(var i=1; i < board.getNumberOfChildren(); i++){
			var object = board.getChildObject(i);

			object.rotateX(-1.5);
		}
		rotated1 = true;
		rotated2 = false;
}

function cameraRotateFront(){
	if (rotated1 == true && rotated2 == false)
		for(var i=1; i < board.getNumberOfChildren(); i++){
			var object = board.getChildObject(i);

			object.rotateX(1.5);
		}
		rotated1 = false;
		rotated2 = true;
}

function onResize(){
	'use strict';

	// Check on function createCamera() viewSize is the same (it must be!)
	var viewSize = 100;

	var aspectRatio = window.innerWidth / window.innerHeight;

	renderer.setSize(window.innerWidth, window.innerHeight);

	if(camera_ort){
		if(window.innerHeight > 0 && window.innerWidth > 0){
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

	//board.resize();
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		case 65: // A change wireframe
			board.changeWireframe();
			break;
		case 66: // B shoot
			if (ship.shoot()){
				scene.add(ship.getBullet().getObject());
				shotSound.currentTime = 0;
				shotSound.play();
			}
			break;
		case 37: // left
			ship.turnOnLeftEngine();
        	break;
        case 39: // right
        	ship.turnOnRightEngine();
        	break;
        case 49: // 1 camera1
        	cameraRotateBack();
        	camera = camera_1;
        	camera_ort = true;
        	camera_pers = false;
        	break;
        case 50: // 2 camera2
        	cameraRotateFront();
        	camera = camera_2;
        	camera_pers = true;
        	camera_ort = false;
        	break;
        case 51: // 3 camera3
        	cameraRotateFront();
        	camera = camera_3;
        	camera_pers = true;
        	camera_ort = false;
        	break;
        case 77: // M music
        	if(playing){
        		themeSound.pause();
        		playing = false;
        	}else{
        		themeSound.play();
        		playing = true;
        	}
        	break;
        case 82: // R retart game
        	board.restartBoard();
        	camera = camera_1;
        	camera_ort = true;
        	camera_pers = false;
        	rotated1 = true;
			rotated2 = false;
        	break;
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
        	break;
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

	board.shipMove();

	if (ship.getBulletBoll()){
		if (board.y_Limits(ship.getBullet().getObject())){
			ship.getBullet().move();
			collision.checkBulletCollisions(ship, board, killSound);
		}
		else{
			scene.remove(ship.getBullet().getObject());
			ship.setBulletFalse();
		}	
	}

	collision.checkAlienCollisions(board);
	board.aliensMove();
	
	render();
	requestAnimationFrame(animate);
}