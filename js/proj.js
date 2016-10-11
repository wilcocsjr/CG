/*global THREE*/


var camera, scene, renderer;
var ship, invaderA, invaderB;
var obj = [];
var oldClock, now;
var delta; 

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
}

function onResize(){
	'use strict';

	// Check on function createCamera() viewSize is the same (it must be!)
	var viewSize = 100;

	var aspectRatio = window.innerWidth / window.innerHeight;

	renderer.setSize(window.innerWidth, window.innerHeight);

	if(window.innerHeight > 0 && window.innerWidth > 0){
        aspectRatio = window.innerWidth / window.innerHeight;
        camera.left = -aspectRatio * viewSize;
        camera.right = aspectRatio * viewSize;
        camera.top = viewSize;
        camera.bottom = -viewSize;
        camera.updateProjectionMatrix();
	}
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		case 65:
		case 97:
			for(var i = 0; i < obj.length; i++){
				obj[i].changeWireframe();
			}
			break;
		case 37: // left
			ship.moveLeft();
        	break;
        case 39: // right
        	ship.moveRight();
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

	ship.moveInercia();
	
	render();

	requestAnimationFrame(animate);
}
