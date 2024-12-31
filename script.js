// Get canvas elements  
const rollerIntakeCanvas = document.getElementById('roller-intake-canvas');  
const clawIntakeCanvas = document.getElementById('claw-intake-canvas');  
const hybridIntakeCanvas = document.getElementById('hybrid-intake-canvas');  
  
// Get button elements  
const rollerIntakeButton = document.getElementById('roller-intake-button');  
const clawIntakeButton = document.getElementById('claw-intake-button');  
const hybridIntakeButton = document.getElementById('hybrid-intake-button');  
  
// Create scenes and renderers  
const rollerIntakeScene = new THREE.Scene();  
const rollerIntakeCamera = new THREE.PerspectiveCamera(75, rollerIntakeCanvas.width / rollerIntakeCanvas.height, 0.1, 1000);  
const rollerIntakeRenderer = new THREE.WebGLRenderer({ canvas: rollerIntakeCanvas, antialias: true });  
  
const clawIntakeScene = new THREE.Scene();  
const clawIntakeCamera = new THREE.PerspectiveCamera(75, clawIntakeCanvas.width / clawIntakeCanvas.height, 0.1, 1000);  
const clawIntakeRenderer = new THREE.WebGLRenderer({ canvas: clawIntakeCanvas, antialias: true });  
  
const hybridIntakeScene = new THREE.Scene();  
const hybridIntakeCamera = new THREE.PerspectiveCamera(75, hybridIntakeCanvas.width / hybridIntakeCanvas.height, 0.1, 1000);  
const hybridIntakeRenderer = new THREE.WebGLRenderer({ canvas: hybridIntakeCanvas, antialias: true });  
  
// Create ambient light  
const ambientLight = new THREE.AmbientLight(0x404040);  
rollerIntakeScene.add(ambientLight);  
clawIntakeScene.add(ambientLight.clone());  
hybridIntakeScene.add(ambientLight.clone());  
  
// Create spot light  
const spotLight = new THREE.SpotLight(0xffffff);  
spotLight.position.set(100, 100, 100);  
spotLight.castShadow = true;  
spotLight.shadow.mapSize.width = 1024;  
spotLight.shadow.mapSize.height = 1024;  
rollerIntakeScene.add(spotLight);  
clawIntakeScene.add(spotLight.clone());  
hybridIntakeScene.add(spotLight.clone());  
  
// Create roller intake model  
const rollerIntakeGeometry = new THREE.CylinderGeometry(20, 20, 80, 32);  
const rollerIntakeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });  
const rollerIntake1 = new THREE.Mesh(rollerIntakeGeometry, rollerIntakeMaterial);  
rollerIntake1.position.set(-50, 0, 0);  
const rollerIntake2 = rollerIntake1.clone();  
rollerIntake2.position.set(50, 0, 0);  
rollerIntakeScene.add(rollerIntake1);  
rollerIntakeScene.add(rollerIntake2);  
  
// Create block for roller intake  
const blockGeometry = new THREE.BoxGeometry(20, 20, 20);  
const blockMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });  
const block = new THREE.Mesh(blockGeometry, blockMaterial);  
block.position.set(0, -50, 0);  
rollerIntakeScene.add(block);  
  
// Create claw intake model  
const clawIntakeGeometry = new THREE.BoxGeometry(20, 20, 80);  
const clawIntakeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });  
const clawIntakeBase = new THREE.Mesh(clawIntakeGeometry, clawIntakeMaterial);  
const clawIntakeArm1 = clawIntakeBase.clone();  
const clawIntakeArm2 = clawIntakeBase.clone();  
clawIntakeArm1.position.set(50, 0, 0);  
clawIntakeArm2.position.set(-50, 0, 0);  
clawIntakeScene.add(clawIntakeBase);  
clawIntakeScene.add(clawIntakeArm1);  
clawIntakeScene.add(clawIntakeArm2);  
  
// Create block for claw intake  
const clawBlock = block.clone();  
clawBlock.position.set(0, -50, 0);  
clawIntakeScene.add(clawBlock);  
  
// Create hybrid intake model  
const hybridIntakeGeometry = new THREE.BoxGeometry(20, 20, 80);  
const hybridIntakeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });  
const hybridIntakeBase = new THREE.Mesh(hybridIntakeGeometry, hybridIntakeMaterial);  
const hybridIntakeRoller1 = rollerIntake1.clone();  
const hybridIntakeRoller2 = rollerIntake2.clone();  
hybridIntakeRoller1.position.set(-30, 0, 0);  
hybridIntakeRoller2.position.set(30, 0, 0);  
hybridIntakeScene.add(hybridIntakeBase);  
hybridIntakeScene.add(hybridIntakeRoller1);  
hybridIntakeScene.add(hybridIntakeRoller2);  
  
// Create block for hybrid intake  
const hybridBlock = block.clone();  
hybridBlock.position.set(0, -50, 0);  
hybridIntakeScene.add(hybridBlock);  
  
// Position the cameras  
rollerIntakeCamera.position.z = 300;  
clawIntakeCamera.position.z = 300;  
hybridIntakeCamera.position.z = 300;  
  
// Add event listeners to buttons  
let rollerIntakePickedUp = false;  
rollerIntakeButton.addEventListener('click', () => {  
  if (!rollerIntakePickedUp) {  
   block.position.y = 0;  
   rollerIntakePickedUp = true;  
  } else {  
   block.position.y = -50;  
   rollerIntakePickedUp = false;  
  }  
});  
  
let clawIntakePickedUp = false;  
clawIntakeButton.addEventListener('click', () => {  
  if (!clawIntakePickedUp) {  
   clawBlock.position.y = 0;  
   clawIntakeArm1.position.x = 30;  
   clawIntakeArm2.position.x = -30;  
   clawIntakePickedUp = true;  
  } else {  
   clawBlock.position.y = -50;  
   clawIntakeArm1.position.x = 50;  
   clawIntakeArm2.position.x = -50;  
   clawIntakePickedUp = false;  
  }  
});  
  
let hybridIntakePickedUp = false;  
hybridIntakeButton.addEventListener('click', () => {  
  if (!hybridIntakePickedUp) {  
   hybridBlock.position.y = 0;  
   hybridIntakeRoller1.rotation.y = Math.PI / 2;  
   hybridIntakeRoller2.rotation.y = Math.PI / 2;  
   hybridIntakePickedUp = true;  
  } else {  
   hybridBlock.position.y = -50;  
   hybridIntakeRoller1.rotation.y = 0;  
   hybridIntakeRoller2.rotation.y = 0;  
   hybridIntakePickedUp = false;  
  }  
});  
  
// Render the scenes  
function animate() {  
  requestAnimationFrame(animate);  
  rollerIntakeRenderer.render(rollerIntakeScene, rollerIntakeCamera);  
  clawIntakeRenderer.render(clawIntakeScene, clawIntakeCamera);  
  hybridIntakeRenderer.render(hybridIntakeScene, hybridIntakeCamera);  
}  
  
animate();


noutjgyhigyhjhhjhhnjyfg