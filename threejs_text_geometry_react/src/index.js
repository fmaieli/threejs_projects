import ReactDOM from 'react-dom';
import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ConfettiStream from '../fonts/Confetti Stream_Regular.json';

class App extends React.Component {

    componentDidMount() {
        // SCENE
        const scene = new THREE.Scene();

        // CAMERA
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // INIT CAMERA
        camera.position.z = 45;
        camera.position.x = 3;
        camera.position.y = 12;

        // RENDERER
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true

        // CONTROLS
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target = new THREE.Vector3(0, 0, -40);
        controls.update();

        // RESIZE HANDLER
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onWindowResize);

        // INIT HEMISPHERE LIGHT
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // SCENE
        scene.background = new THREE.Color(0xffffff);

        // FLOOR
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(175, 100), new THREE.MeshPhongMaterial({ color: 0x4efc03 }));
        plane.rotation.x = - Math.PI / 2
        plane.receiveShadow = true
        scene.add(plane);

        // WALL
        const plane_wall = new THREE.Mesh(new THREE.PlaneGeometry(175, 50), new THREE.MeshPhongMaterial({ color: 0x4efc03 }));
        plane_wall.position.y = + 25
        plane_wall.position.z = - 50
        plane_wall.receiveShadow = true
        scene.add(plane_wall);

        // POINT LIGHT
        const light1 = new THREE.PointLight(0xff6666, 1, 100);
        light1.castShadow = true;
        light1.shadow.mapSize.width = 4096;
        light1.shadow.mapSize.height = 4096;
        scene.add(light1);

        const light2 = new THREE.PointLight(0x33ff33, 1, 100);
        light2.castShadow = true;
        light2.shadow.mapSize.width = 4096;
        light2.shadow.mapSize.height = 4096;
        scene.add(light2);

        // TEXT
        THREE.Cache.enabled = true;
        const loader = new THREE.FontLoader();

        var font = loader.parse(ConfettiStream);
        const geometry = new THREE.TextGeometry('three.js', {
            font: font,
            size: 6,
            height: 3,
            curveSegments: 10,
            bevelEnabled: false,
            bevelOffset: 0,
            bevelSegments: 1,
            bevelSize: 0.3,
            bevelThickness: 1
        });

        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xff6600 }), // front
            new THREE.MeshPhongMaterial({ color: 0x0000ff }) // side
        ];

        const textMesh1 = new THREE.Mesh(geometry, materials);
        textMesh1.castShadow = true
        textMesh1.position.y += 3
        textMesh1.position.x -= 12
        scene.add(textMesh1)

        // ANIMATE
        function animate() {
            const now = Date.now() / 1000;
            light1.position.y = 15;
            light1.position.x = Math.cos(now) * 20;
            light1.position.z = Math.sin(now) * 20;

            light2.position.y = 15;
            light2.position.x = Math.sin(now) * 20;
            light2.position.z = Math.cos(now) * 20;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        document.body.appendChild(renderer.domElement);
        animate();
    }

    render() {
        return <div ref={ref => (this.mount = ref)} />;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));