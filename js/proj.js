/*global THREE*/


var camera, scene, renderer;
var ship, invaderA, invaderB;
var obj = [];
var oldClock, now;
var delta;
var camera_1, camera_2, camera_3

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
    
	//ADD SHIPS HERE
	for (var i = 0; i < 4; i++){

		invaderA = new InvaderA();
		invaderA.createInvaderA(-30 + 20 * i, 20, 0);
		scene.add(invaderA.getObject());
		obj.push(invaderA);

		invaderB = new InvaderB();
		invaderB.createInvaderB(-30 + 20 * i, 0, 0);
		scene.add(invaderB.getObject());
		obj.push(invaderB);
	}

	ship = new Ship();
	ship.createShip(0, -40, 0)
	scene.add(ship.getObject());
	obj.push(ship);
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
	camera_1 = true;
	camera_2 = false;
	camera_3 = false;
	
}

function camera2(){
	'use strict';
	var viewSize = 60;

	var aspectRatio = window.innerWidth / window.innerHeight;

	camera = new THREE.PerspectiveCamera(viewSize, aspectRatio, 1, 1000);

	camera.position.x = 0;
	camera.position.y = -150;
	camera.position.z = 200;
	camera.lookAt(scene.position);
	camera_1 = false;
	camera_2 = true;
	camera_3 = false;
	
}

function camera3(){
	'use strict';
	var x, y,z;
	var viewSize = 60;

	var aspectRatio = window.innerWidth / window.innerHeight;

	camera = new THREE.PerspectiveCamera(viewSize, aspectRatio, 1, 1000);

	camera.position.x = 0;
	camera.position.y = -150;
	camera.position.z = 50;
	camera.lookAt(ship.getObject().position);

	camera_1 = false;
	camera_2 = false;
	camera_3 = true;
	
}

function onResize(){
	'use strict';

	// Check on function createCamera() viewSize is the same (it must be!)
	var viewSize;

	var aspectRatio = window.innerWidth / window.innerHeight;

	renderer.setSize(window.innerWidth, window.innerHeight);

	if(camera_1){
		if(window.innerHeight > 0 && window.innerWidth > 0){
			viewSize = 100;
	        camera.left = -aspectRatio * viewSize;
	        camera.right = aspectRatio * viewSize;
	        camera.top = viewSize;
	        camera.bottom = -viewSize;
		}
	}
	else if(camera_2 || camera_3){
		if(window.innerHeight > 0 && window.innerWidth > 0)
			camera.aspect = renderer.getSize().width / renderer.getSize().height;
	}
	camera.updateProjectionMatrix();
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		case 65:
			for(var i = 0; i < obj.length; i++){
				obj[i].changeWireframe();
			}
			break;
		case 37: // left
			ship.turnOnLeftEngine();
        	break;
        case 39: // right
        	ship.turnOnRightEngine();
        	break;
        case 49: // camera 1
        	if(!camera1)
        		createCamera();
        	break;
        case 50: // camera 2
        	if (!camera2())
        		camera2();
        	break;
        case 51: // camera 3
        	if (!camera_3)
        		camera3();
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

	ship.move();

	ship.moveInercia();

	if (camera_3)
		camera.position.x = ship.getObject().position.x;
	
	render();

	requestAnimationFrame(animate);
}
