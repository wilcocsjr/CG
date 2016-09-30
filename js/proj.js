/*global THREE*/


var camera, scene, renderer;
var geometry, material, mesh;
var ship, invaderA, invaderB;
var oldClock, now; 

var viewSize, aspectRatio;

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();
	
	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
}

//CRIAR A CENA E CHAMAR OS OBJETOS

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	//scene.add(new THREE.AxisHelper(50));
    
    

	//ADD SHIPS HERE
	ship = new Ship();
	scene.add(ship.createShip(0, -40, 0));
	invaderB = new InvaderB();
	scene.add(invaderB.createInvaderB(0, 0, 0));
	invaderA = new InvaderA();
	scene.add(invaderA.createInvaderA(0, 40, 0));
}



//CENAS NAO IMPORTANTES, COISAS DA AULA

function createCamera(){
	'use strict';
	viewSize = 200;

	aspectRatio = window.innerWidth / window.innerHeight;

	camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize /2, -viewSize / 2, -1000, 1000);


	// 2D
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 1;
	camera.lookAt(scene.position);
	/*camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 50;
	camera.lookAt(scene.position);*/
}

function onResize(){
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	if(window.innerHeight > 0 && window.innerWidth > 0){
        aspectRatio = window.innerWidth / window.innerHeight;
        camera.left = -aspectRatio * viewSize / 2;
        camera.right = aspectRatio * viewSize / 2;
        camera.top = viewSize /2;
        camera.bottom = -viewSize /2;
        camera.updateProjectionMatrix();
	}
	
	render();
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		case 65:
		case 97:
			scene.traverse(function (node){
				if(node instanceof THREE.Mesh){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
		case 37: // left
			ship.moveLeft();
        break;
        case 39: // right
        	ship.moveRight();
        break;
	}
	render();
}


function render() {
	'use strict';
	renderer.render(scene, camera);
}