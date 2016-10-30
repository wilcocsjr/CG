/*global THREE*/


var camera, scene, renderer;
var board, ship, collision;
var oldClock, now;
var delta;
var camera_1, camera_2, camera_3, camera_ort, camera_pers;
var shotSound, killSound, themeSound, playing;
var rotated1, rotated2;
var dLight, day, stars = [], starOn;

function init(){
	'use strict';
	oldClock = Date.now();

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;

	renderer.shadowMapBias = 0.0039;
	renderer.shadowMapDarkness = 0.5;
	renderer.shadowMapWidth = 1024;
	renderer.shadowMapHeight = 1024;

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	renderer.shadowCameraNear = 3;
	renderer.shadowCameraFar = camera.far;
	renderer.shadowCameraFov = 50;
	
	getMusic();
	render();
	animate();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);

    // Create Lights
    createLight();

    var table = new THREE.Object3D();
    var material = new THREE.MeshLambertMaterial({color:0xffffff, wireframe:false});
	var geometry = new THREE.CubeGeometry(200 , 1, 100); //(2, 10, 10)
	var mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0,0, -10);

	mesh.rotateX(1.5);

	mesh.receiveShadow = true;

	table.add(mesh);

	scene.add(table);

	table = new THREE.Object3D();
    material = new THREE.MeshLambertMaterial({color:0xffffff, wireframe:false});
	geometry = new THREE.CubeGeometry(200 , 1, 100); //(2, 10, 10)
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0,98, 0);

	mesh.receiveShadow = true;

	table.add(mesh);

	scene.add(table);

}

function createLight(){
    'use strict'
    dLight = new THREE.DirectionalLight(0xffffff);
    dLight.position.set(0, -0.5, 1);

    dLight.shadowCameraVisible = true;
    dLight.shadow.camera.left = -100;
    dLight.shadow.camera.right = 100;
    dLight.shadow.camera.bottom = -100;
    dLight.shadow.camera.top = 100;
    dLight.shadow.camera.near = -100;
    dLight.shadow.camera.far = 100;

    dLight.castShadow = true;
    
    scene.add(dLight);
    day = true;
    
    createPointLight();
}

function createPointLight(){
    var starobject = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({color:0xcccccc, wireframe:false});
	var geometry = new THREE.SphereGeometry(1, 10, 10);
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, 0);
	starobject.add(mesh);

    var star = new THREE.PointLight(0xffffff, 3, 200); 
    star.position.set(0, 0, 1);
    star.castShadow = true;
    star.shadow.camera.near = -10;
    star.shadow.camera.far = 10;

    starobject.add(star);

    scene.add(starobject);

    stars.push(starobject);
    starOn = true;
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
        case 67: // C stars
			for(var i = 0; i < stars.length; i++){
                if(starOn)
                    scene.remove(stars[i]);
                else
                    scene.add(stars[i]);
            }
            starOn = !starOn;
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
        case 76: // L enable/disable lighting
        	dLight.castShadow = !dLight.castShadow;
        	
        	/* Como a estrela so tem uma esfera e a pointLight que 
        	e adicionada em segundo lugar podemos ter a certeza que 
        	star.children[1] e uma pointLight */
        	for(var i=0; i < stars.length; i++)
        		stars[i].children[1].castShadow = !stars[i].children[1].castShadow;
        	break;
        case 77: // M music
        	if(playing)
        		themeSound.pause();
        	else
        		themeSound.play();
        	playing = !playing;
        	break;
        case 78: // N day/night
        	if(day)
        		scene.remove(dLight);
        	else
                scene.add(dLight);
            day = !day;
        	break;
        case 82: // R retart game
        	board.restartBoard();
            scene.add(dLight);
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
