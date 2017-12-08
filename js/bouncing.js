var THREE=require('three');
var that;
var sphere = function () {
    this.scene = new THREE.Scene();
    that = this;
};

sphere.prototype.init = function () {
    this.createCamera();
    this.createRenderer();

    this.createBoxes();

    this.createFloor();
    this.createLights();

    this.animateBalls();

    this.render();
    this.datGUI();
};

sphere.prototype.createCamera = function () {
    this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -1000, 1000);
    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;

    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.zoom = 0.5;
    this.camera.updateProjectionMatrix();

    //Adjust the scene to center the balls
    this.scene.position.z = 170;
    this.scene.position.y = -70;
};

/*Display or not 2D view*/
sphere.prototype.swap2DView = function (value) {
    if (value == true) {
        this.camera.position.set(100, 0, 0);
        this.scene.position.y = -120;
    } else {
        this.camera.position.set(100, 100, 100);
        this.scene.position.y = -70;
    }
    this.controls.update(); //update camera view
};

sphere.prototype.createRenderer = function () {
    this.renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xededed);
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
    this.renderer.shadowMapSoft = true;
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize, false);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement); //rotate camera with the mouse
    this.controls.enablePan = false; //disable pan because it causes bugs
};

sphere.prototype.createBoxes = function () {

    this.sphereOne;
    var sphereMaterials = [];
    var spherePosY = 250;
    var spherePosZ = 0;

    // set up the sphere vars
    var radius = 50,
        segments = 32,
        rings = 32;

    var geometry = new THREE.SphereGeometry(radius, segments, rings);
    sphereMaterials[1] = new THREE.MeshBasicMaterial({
        color: 0x006600,
        shading: THREE.SmoothShading
    });

    var height = window.innerHeight;
    var width = window.innerWidth;

    this.sphereOne = new THREE.Mesh(geometry, sphereMaterials[1]);
    this.sphereOne.position.y = spherePosY;
    this.sphereOne.position.z = spherePosZ;
    this.sphereOne.castShadow = true;
    this.sphereOne.receiveShadow = true;
    this.scene.add(this.sphereOne);
    spherePosY += 100;
    spherePosZ += -120;




};

sphere.prototype.createFloor = function () {
    var geometry2 = new THREE.PlaneBufferGeometry(1000, 1000);
    var material2 = new THREE.MeshBasicMaterial({
        color: 0xededed
    });
    var floor = new THREE.Mesh(geometry2, material2);
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = 90 * Math.PI / 180;
    floor.doubleSided = true;
    floor.receiveShadow = true;
    this.scene.add(floor);
};

sphere.prototype.createLights = function () {
    var shadowLight = new THREE.DirectionalLight(0xffffff, 0.5);
    shadowLight.position.set(-400, 1000, 0);
    shadowLight.target.position.set(this.scene.position);
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = 0.1;
    //shadowLight.shadowCameraVisible = true;
    this.scene.add(shadowLight);
};


sphere.prototype.animateBalls = function () {
    this.tl = new TimelineMax({
        repeat: -1,
        repeatDelay: 0
    });
    this.tl.to(this.sphereOne.position, 0.6, {
        y: innerHeight,
        ease: Power2.easeIn
    });
    this.tl.to(this.sphereOne.position, 0.8, {
        x: innerWidth,
        ease: Power2.easeOut
    });
    this.tl.to(this.sphereOne.position, 0.8, {
        x: -innerWidth + 10,
        ease: Circ.easeOut
    });
    this.tl.to(this.sphereOne.position, 0.95, {
        y: 250,
        ease: Circ.easeOut
    });


};



sphere.prototype.render = function () {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, that.camera);
};

sphere.prototype.onWindowResize = function () {
    that.camera.left = window.innerWidth / -2;
    that.camera.right = window.innerWidth / 2;
    that.camera.top = window.innerHeight / 2;
    that.camera.bottom = window.innerHeight / -2;
    that.camera.updateProjectionMatrix();
    that.renderer.setSize(window.innerWidth, window.innerHeight);
};

/*User interface - display or not 2D view*/
sphere.prototype.datGUI = function () {
    var Configuration = function () {
        this.view2D = false;
    };
    var config = new Configuration();

    var gui = new dat.GUI();
    gui.add(config, 'view2D').onFinishChange(function () {
        that.swap2DView(config.view2D);
    });


};

var sphere = new sphere();
sphere.init();