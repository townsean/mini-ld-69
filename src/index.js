var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    // set the scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0,0,0.2);

    // create a camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 1.0, 1.0, 12, BABYLON.Vector3.Zero(), scene);

    // attach camera to canvas
    camera.attachControl(canvas, false);

    // add a light
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    // reflect the light off the ground to the light the mesh bottom
    light.groundColor = new BABYLON.Color3(0.5, 0, 0.5);

    // create a builtin shape
    var box = BABYLON.Mesh.CreateBox("mesh", 3, scene);
    box.showBoundingBox = true;

    // Define a material
    var material = new BABYLON.StandardMaterial("std", scene);
    material.diffuseColor = new BABYLON.Color3(0.5, 0, 0.5);

    // apply the material
    box.material = material;

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