var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    // set the scene and background color
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.66, 0.66, 0.66);
    scene.enablePhysics();

    // create a camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0.0, 0.75, 24, BABYLON.Vector3.Zero(), scene);    

    // attach camera to canvas
    camera.attachControl(canvas, false);

    // display camera keyboard controls
    camera.inputs.remove(camera.inputs.attached.keyboard);

    // add a light
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    // reflect the light off the ground to the light the mesh bottom
    light.groundColor = new BABYLON.Color3(0.5, 0, 0.5);

    // create ball material
    var ballMaterial = new BABYLON.StandardMaterial("ballMaterial", scene);
    ballMaterial.diffuseColor = new BABYLON.Color3(0.0, 0.0, 1.0);

    // draw 5 balls
    var balls = new Array();
    for(var x = 0; x < 5; x++) {
        var ball = BABYLON.Mesh.CreateSphere("ball" + x, 16, 1.0, scene, false);
        ball.material = ballMaterial;
        ball.position = new BABYLON.Vector3(x, 0.5, 0);
        
        balls.push(ball);
    }

    // update balls remaining display
    document.getElementById("ballCount").textContent = balls.length;

    // create the launched ball
    var startingBall = BABYLON.Mesh.CreateSphere("startingBall", 16, 1.0, scene, false);

    // starting ball is orange
    var spreadMaterial = new BABYLON.StandardMaterial("spreadMaterial", scene);
    spreadMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.0, 0.0);
    startingBall.material = spreadMaterial;
    startingBall.position = new BABYLON.Vector3(5.75, 0.5, 0);

    // create ball animations
    var animationBall = new BABYLON.Animation("ballEasingAnimation", "position", 30, 
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3, 
        BABYLON.Animation.ANIMATIONLOOMODE_RELATIVE);

    var easingFunction = new BABYLON.BounceEase(3, 3);
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);

    // add easing function to animation
    animationBall.setEasingFunction(easingFunction);
    startingBall.animations.push(animationBall);

    // create a builtin shape for ground
    var ground = BABYLON.Mesh.CreateGround("ground", 12, 12, 2, scene);
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

    // load arrow sprite
    var spriteManagerArrow = new BABYLON.SpriteManager("arrowManager", "assets/glove3.png", 1, 72, scene);
    var arrow = new BABYLON.Sprite("arrow", spriteManagerArrow);
    arrow.position = new BABYLON.Vector3(7, 0, 0);

    // update starting angle such that the arrow is pointing towards the center
    arrow.angle -= .75;

    window.addEventListener("keydown", function(event) {
        // if space bar pressed
        if (event.keyCode === 32) {
            launchSoundEffect.play();

            startingBall.moveWithCollisions(new BABYLON.Vector3(-3, 0, 0));
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

        // if left arrow key pressed
        if(event.keyCode === 37) {
            arrow.angle += 0.25;
        }

        // if right arrow key pressed
        if (event.keyCode === 39) {
            arrow.angle -= 0.25;
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