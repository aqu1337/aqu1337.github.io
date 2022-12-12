// Three JS Template
//----------------------------------------------------------------- BASIC parameters
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );

if (window.innerWidth > 800) {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.needsUpdate = true;
  //renderer.toneMapping = THREE.ReinhardToneMapping;
  //console.log(window.innerWidth);
};
//---

document.getElementById("dascont").append( renderer.domElement );

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 500 );

camera.position.set(0, 2, 14);

var scene = new THREE.Scene();
var city = new THREE.Object3D();
var smoke = new THREE.Object3D();
var town = new THREE.Object3D();

var createCarPos = true;
var uSpeed = 0.001;

//----------------------------------------------------------------- FOG background

//var setcolor = 0xF02050;
//var setcolor = 0xF2F111;
//var setcolor = 0xFF6347;

let setcolor = "0x"
		var link = ["./assets/css/theme-colors/blue.css", "./assets/css/theme-colors/green.css", "./assets/css/theme-colors/orange.css", "./assets/css/theme-colors/brown.css", "./assets/css/theme-colors/purple.css", "./assets/css/theme-colors/red.css", "./assets/css/theme-colors/beige.css", "./assets/css/theme-colors/green_light.css", "./assets/css/theme-colors/yellow.css", "./assets/css/theme-colors/yellow_light.css"]


		$(function () {
			var style = link[Math.floor(Math.random() * link.length)];
			if (document.createStyleSheet) {
				document.createStyleSheet(style);
			} else {
				$('<link />', {
					rel: 'stylesheet',
					type: 'text/css',
					href: style
				}).appendTo('head');
				let cColor = (style.split("theme-colors/")[1].split(".css")[0])
				console.log(cColor);
				switch (cColor) {
					case "beige":
						setcolor = setcolor + "DEC79B"
						break;
					case "blue":
						setcolor = setcolor + "4FCBE9"
						break;
					case "brown":
						setcolor = setcolor + "D48166"
						break;
					case "green_light":
						setcolor = setcolor + "B3E3B5"
						break;
					case "green":
						setcolor = setcolor + "4BFFA5"
						break;
					case "orange":
						setcolor = setcolor + "FB8122"
						break;
					case "purple":
						setcolor = setcolor + "632695"
						break;
					case "red":
						setcolor = setcolor + "FA292A"
						break;
					case "yellow_light":
						setcolor = setcolor + "F3E367"
						break;
					case "yellow":
						setcolor = setcolor + "FDD935"
						break;
					default:
						break;
				}

			}
      console.log(setcolor);
      setcolor = parseInt(setcolor)
      scene.background = new THREE.Color(setcolor);
      scene.fog = new THREE.Fog(setcolor, 10, 16);
      window.scene = scene
      //scene.fog = new THREE.FogExp2(setcolor, 0.05);
      //----------------------------------------------------------------- RANDOM Function
      function mathRandom(num = 8) {
        var numValue = - Math.random() * num + Math.random() * num;
        return numValue;
      };
      //----------------------------------------------------------------- CHANGE bluilding colors
      var setTintNum = true;
      function setTintColor() {
        if (setTintNum) {
          setTintNum = false;
          var setColor = 0x000000;
        } else {
          setTintNum = true;
          var setColor = 0x000000;
        };
        //setColor = 0x222222;
        return setColor;
      };
      
      //----------------------------------------------------------------- CREATE City
      
      function init() {
        var segments = 4;
        for (var i = 1; i<100; i++) {
          var geometry = new THREE.CubeGeometry(1,0,0,segments,segments,segments);
          var material = new THREE.MeshStandardMaterial({
            color:setTintColor(),
            wireframe:false,
            //opacity:0.9,
            //transparent:true,
            //roughness: 0.3,
            //metalness: 1,
            shading: THREE.SmoothShading,
            //shading:THREE.FlatShading,
            side:THREE.DoubleSide});
          var wmaterial = new THREE.MeshLambertMaterial({
            color:0xFFFFFF,
            wireframe:true,
            transparent:true,
            opacity: 0.03,
            side:THREE.DoubleSide/*,
            shading:THREE.FlatShading*/});
      
          var cube = new THREE.Mesh(geometry, material);
          var wire = new THREE.Mesh(geometry, wmaterial);
          var floor = new THREE.Mesh(geometry, material);
          var wfloor = new THREE.Mesh(geometry, wmaterial);
          
          cube.add(wfloor);
          cube.castShadow = true;
          cube.receiveShadow = true;
          cube.rotationValue = 0.1+Math.abs(mathRandom(8));
          
          //floor.scale.x = floor.scale.z = 1+mathRandom(0.33);
          floor.scale.y = 0.05;//+mathRandom(0.5);
          cube.scale.y = 0.1+Math.abs(mathRandom(8));
          //TweenMax.to(cube.scale, 1, {y:cube.rotationValue, repeat:-1, yoyo:true, delay:i*0.005, ease:Power1.easeInOut});
          /*cube.setScale = 0.1+Math.abs(mathRandom());
          
          TweenMax.to(cube.scale, 4, {y:cube.setScale, ease:Elastic.easeInOut, delay:0.2*i, yoyo:true, repeat:-1});
          TweenMax.to(cube.position, 4, {y:cube.setScale / 2, ease:Elastic.easeInOut, delay:0.2*i, yoyo:true, repeat:-1});*/
          
          var cubeWidth = 0.9;
          cube.scale.x = cube.scale.z = cubeWidth+mathRandom(1-cubeWidth);
          //cube.position.y = cube.scale.y / 2;
          cube.position.x = Math.round(mathRandom());
          cube.position.z = Math.round(mathRandom());
          
          floor.position.set(cube.position.x, 0/*floor.scale.y / 2*/, cube.position.z)
          
          town.add(floor);
          town.add(cube);
        };
        //----------------------------------------------------------------- Particular
        
        var gmaterial = new THREE.MeshToonMaterial({color:0xFFFF00, side:THREE.DoubleSide});
        var gparticular = new THREE.CircleGeometry(0.01, 3);
        var aparticular = 5;
        
        for (var h = 1; h<300; h++) {
          var particular = new THREE.Mesh(gparticular, gmaterial);
          particular.position.set(mathRandom(aparticular), mathRandom(aparticular),mathRandom(aparticular));
          particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
          smoke.add(particular);
        };
        
        var pmaterial = new THREE.MeshPhongMaterial({
          color:0x000000,
          side:THREE.DoubleSide,
          roughness: 10,
          metalness: 0.9,
          opacity:0.8,
          transparent:true});
        var pgeometry = new THREE.PlaneGeometry(60,60);
        var pelement = new THREE.Mesh(pgeometry, pmaterial);
        pelement.rotation.x = -90 * Math.PI / 180;
        pelement.position.y = -0.001;
        pelement.receiveShadow = true;
        // pelement.material.emissive.setHex(0xFFFFFF + Math.random() * 100000);
      
        city.add(pelement);
      };
      
      //----------------------------------------------------------------- MOUSE function
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2(), INTERSECTED;
      var intersected;
      
      function onMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      function onDocumentTouchStart( event ) {
        if ( event.touches.length == 1 ) {
          event.preventDefault();
          // mouse.x = event.touches[ 0 ].pageX -  window.innerWidth / 0.0002;
          // mouse.y = event.touches[ 0 ].pageY - window.innerHeight / 0.0002;
        };
      };
      function onDocumentTouchMove( event ) {
        if ( event.touches.length == 1 ) {
          event.preventDefault();

          // if (event.touches[ 0 ].pageX < window.innerWidth / 2) { 
          //   mouse.x = -0.5
          // } else {
          //   mouse.x = 0.5
          // }
          // if (event.touches[ 0 ].pageY < window.innerHeight / 2) { 
          //   console.log(event.touches[ 0 ].pageY);
          //   console.log(mouse.y);
          //   mouse.y = 0.5
          // } else {
          //   mouse.y = +0.5
          // }
          mouse.x = (event.touches[ 0 ].pageX -  window.innerWidth / 2) / 300;
          mouse.y = (event.touches[ 0 ].pageY - window.innerHeight / 2) / 300;
        }
      }
      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('touchstart', onDocumentTouchStart, {passive: false} );
      window.addEventListener('touchmove', onDocumentTouchMove, {passive: false} );
      
      //----------------------------------------------------------------- Lights
      var ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
      var lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
      var lightBack = new THREE.PointLight(0xFFFFFF, 0.5);
      
      var spotLightHelper = new THREE.SpotLightHelper( lightFront );
      //scene.add( spotLightHelper );
      
      lightFront.rotation.x = 45 * Math.PI / 180;
      lightFront.rotation.z = -45 * Math.PI / 180;
      lightFront.position.set(5, 5, 5);
      lightFront.castShadow = true;
      lightFront.shadow.mapSize.width = 6000;
      lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
      lightFront.penumbra = 0.1;
      lightBack.position.set(0,6,0);
      
      smoke.position.y = 2;
      
      scene.add(ambientLight);
      city.add(lightFront);
      scene.add(lightBack);
      scene.add(city);
      city.add(smoke);
      city.add(town);
      
      //----------------------------------------------------------------- GRID Helper
      var gridHelper = new THREE.GridHelper( 60, 120, 0xFF0000, 0x000000);
      city.add( gridHelper );
      
      //----------------------------------------------------------------- CAR world
      var generateCar = function() {
        
      }
      //----------------------------------------------------------------- LINES world
      
      var createCars = function(cScale = 2, cPos = 20, cColor = 0xFFFF00) {
        var cMat = new THREE.MeshToonMaterial({color:cColor, side:THREE.DoubleSide});
        var cGeo = new THREE.CubeGeometry(1, cScale/40, cScale/40);
        var cElem = new THREE.Mesh(cGeo, cMat);
        var cAmp = 3;
        
        if (createCarPos) {
          createCarPos = false;
          cElem.position.x = -cPos;
          cElem.position.z = (mathRandom(cAmp));
      
          TweenMax.to(cElem.position, 3, {x:cPos, repeat:-1, yoyo:true, delay:mathRandom(3)});
        } else {
          createCarPos = true;
          cElem.position.x = (mathRandom(cAmp));
          cElem.position.z = -cPos;
          cElem.rotation.y = 90 * Math.PI / 180;
        
          TweenMax.to(cElem.position, 5, {z:cPos, repeat:-1, yoyo:true, delay:mathRandom(3), ease:Power1.easeInOut});
        };
        cElem.receiveShadow = true;
        cElem.castShadow = true;
        cElem.position.y = Math.abs(mathRandom(5));
        city.add(cElem);
      };
      
      var generateLines = function() {
        for (var i = 0; i<60; i++) {
          createCars(0.1, 20);
        };
      };
      
      //----------------------------------------------------------------- CAMERA position
      
      var cameraSet = function() {
        createCars(0.1, 20, 0xFFFFFF);
        //TweenMax.to(camera.position, 1, {y:1+Math.random()*4, ease:Expo.easeInOut})
      };
      
      //----------------------------------------------------------------- ANIMATE
      
      window.animate = function() {
        requestAnimationFrame(animate);
        var time = Date.now() * 0.00005;
        
        city.rotation.y -= ((mouse.x * 8) - camera.rotation.y) * uSpeed;
        city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
        if (city.rotation.x < -0.05) city.rotation.x = -0.05;
        else if (city.rotation.x>1) city.rotation.x = 1;
        var cityRotation = Math.sin(Date.now() / 5000) * 13;
        //city.rotation.x = cityRotation * Math.PI / 180;
        
        //console.log(city.rotation.x);
        //camera.position.y -= (-(mouse.y * 20) - camera.rotation.y) * uSpeed;;
        
        for ( let i = 0, l = town.children.length; i < l; i ++ ) {
          var object = town.children[ i ];
          //object.scale.y = Math.sin(time*50) * object.rotationValue;
          //object.rotation.y = (Math.sin((time/object.rotationValue) * Math.PI / 180) * 180);
          //object.rotation.z = (Math.cos((time/object.rotationValue) * Math.PI / 180) * 180);
        }
        
        smoke.rotation.y += 0.01;
        smoke.rotation.x += 0.01;
        
        camera.lookAt(city.position);
        renderer.render( scene, camera );  
      }
      
      //----------------------------------------------------------------- START functions
      generateLines();
      init();
      animate();
		});

// var setcolor = "0x" + window.tColor;

