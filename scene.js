var scene, renderer, camera;
var controls;

init();
animate();
render();

var delta = 0;
var prevTime = Date.now();

function init()
{
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setClearColor(0x0D65B4)
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);

    window.addEventListener('resize', function()
    {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    });

    

    scene = new THREE.Scene();

    //LIGHTS
    var light = new THREE.AmbientLight(0x000000, .8);
    scene.add(light);

    light.position.y=20;
    light.position.x=-10;
    light.position.z=-12;
    

    var light2 = new THREE.SpotLight(0xffffff, 0.95);
    scene.add(light2);

    light2.position.y=30;
    light2.position.x=2;
    light2.position.z=-3;

    
    var light3 = new THREE.SpotLight(0xffffff, 0.95);
    scene.add(light3);

    light3.position.z=-19;
    light3.position.y=-6;




    var loader = new THREE.GLTFLoader();

    loader.load("Tachikoma.glb", handle_load);

    var mesh;

    function handle_load(gltf) {
        console.log(gltf);
        mesh = gltf.scene;
        console.log(mesh.children[0]);
        mesh.children[0].material = new THREE.MeshLambertMaterial({
          color: 009900});
        scene.add(mesh)
        mesh.position.z = 0;
        mesh.position.y = -4;
        mesh.position.x = 0.75;
    }
   

    camera = new THREE.PerspectiveCamera (35, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z=40;
    camera.position.y=3;
    camera.position.x=0;

    controls = new THREE.OrbitControls (camera, renderer.domElement);
    
    //Remove these slashes below to view the grid
    //var gridXZ = new THREE.GridHelper(100, 10);
    //gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
    //scene.add(gridXZ);

}

var delta = 0;
var prevTime = Date.now();

function render()
{
    
    delta += 0.1;

        if (mesh) {
            mesh.rotation.y += 0.01;
            
            //animation mesh
            // mesh.morphTargetInfluences[ 0 ] = Math.sin(delta) * 20.0;
        }
 
        renderer.render(scene, camera);

        requestAnimationFrame ( render );
        
}

function animate()
{
    controls.update();
    requestAnimationFrame ( animate );  
    renderer.render (scene, camera);
}


