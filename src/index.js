var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    // set the scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0,0,0.2);
    scene.enablePhysics();

    // create a camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 1.0, 1.0, 12, BABYLON.Vector3.Zero(), scene);

    // attach camera to canvas
    camera.attachControl(canvas, false);

    // add a light
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    // reflect the light off the ground to the light the mesh bottom
    light.groundColor = new BABYLON.Color3(0.5, 0, 0.5);

    // create a builtin shape
    var box = BABYLON.Mesh.CreateBox("mesh", 1, scene);
    box.showBoundingBox = true;
    box.position.y = 1;

    // Define a material
    var material = new BABYLON.StandardMaterial("std", scene);
    material.diffuseColor = new BABYLON.Color3(0.5, 0, 0.5);

    // apply the material
    box.material = material;

    // create a builtin shape for ground
    var ground = BABYLON.Mesh.CreateGround("ground", 10, 10, 2, scene);
    ground.material = new BABYLON.GridMaterial("groundMaterial", scene);

    // load background music
    var backgroundAudio = new BABYLON.Sound("BackgroundAudio", "assets/Around_the_World.mp3", 
        scene, null, { loop: true, autoplay: true, volume: 0.50});

    // load sound effect for the ball launching
    var launchSoundEffect = new BABYLON.Sound("LaunchSoundEffect", "assets/Jingle_Win_Synth_01.wav", 
        scene);

     // load sound effect for the ball contact
    var ballSoundEffect = new BABYLON.Sound("BallSoundEffect", "assets/UI_Synth_02.wav", 
        scene);

    window.addEventListener("keydown", function(event) {
        // if space bar pressed
        if (event.keyCode === 32) {
            launchSoundEffect.play();
        }

        // if numpad 0 pressed
        if (event.keyCode === 96) {
            ballSoundEffect.play();
        }

        // if keyM pressed toggle between mute and unmute
        if (event.keyCode === 77) {
            if (BABYLON.Engine.audioEngine.getGlobalVolume() === 0) {
                BABYLON.Engine.audioEngine.setGlobalVolume(1);
            } else {                
                BABYLON.Engine.audioEngine.setGlobalVolume(0);
            }
        }
    }); 

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function() {
    scene.render();
});

// resize
window.addEventListener("resize", function() {
    engine.resize();
});