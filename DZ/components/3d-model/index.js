import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class ThreeDModel {
    constructor(parent, modelPath) {
        this.parent = parent;
        this.modelPath = modelPath;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
    }

    initThreeJS() {
        const container = this.parent;
        const width = container.clientWidth;
        const height = container.clientHeight;

        console.log("ThreeDModel initThreeJS вызван");

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111122);

        this.camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            0.1,
            1000,
        );
        this.camera.position.set(3, 2, 4);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        container.innerHTML = "";
        container.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(2, 5, 3);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(-2, 1, -3);
        this.scene.add(backLight);

        const fillLight = new THREE.PointLight(0x4466cc, 0.3);
        fillLight.position.set(1, 2, 2);
        this.scene.add(fillLight);

        const gridHelper = new THREE.GridHelper(5, 20, 0x888888, 0x444444);
        gridHelper.position.y = -0.5;
        this.scene.add(gridHelper);

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement,
        );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 1;
        this.controls.enablePan = true;

        this.loadModel();

        this.animate();

        window.addEventListener("resize", () => this.onWindowResize());
    }

    onWindowResize() {
        const container = this.parent;
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    loadModel() {
        const loader = new GLTFLoader();

        const loadingDiv = document.createElement("div");
        loadingDiv.textContent = "Загрузка 3D модели...";
        loadingDiv.style.position = "absolute";
        loadingDiv.style.top = "50%";
        loadingDiv.style.left = "50%";
        loadingDiv.style.transform = "translate(-50%, -50%)";
        loadingDiv.style.color = "white";
        loadingDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
        loadingDiv.style.padding = "10px";
        loadingDiv.style.borderRadius = "5px";
        loadingDiv.style.zIndex = "10";
        this.parent.style.position = "relative";
        this.parent.appendChild(loadingDiv);

        loader.load(
            this.modelPath,
            (gltf) => {
                this.model = gltf.scene;

                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                let scale = 1;

                if (maxDim > 3) {
                    scale = 2.5 / maxDim;
                } else if (maxDim < 0.5) {
                    scale = 2.5 / maxDim;
                } else {
                    scale = 1.5 / maxDim;
                }

                this.model.scale.set(scale, scale, scale);

                const newBox = new THREE.Box3().setFromObject(this.model);
                const newCenter = newBox.getCenter(new THREE.Vector3());
                const newMin = newBox.min;

                console.log("Новый центр после масштабирования:", newCenter);
                console.log("Новый минимум:", newMin);

                this.model.position.x = -newCenter.x;
                this.model.position.z = -newCenter.z;
                this.model.position.y = -newMin.y;

                console.log("Новая позиция модели:", this.model.position);

                this.scene.add(this.model);

                loadingDiv.remove();

                setTimeout(() => {
                    this.camera.position.set(3, 2, 4);
                    this.controls.target.set(0, 1, 0);
                    this.controls.update();
                }, 100);

                console.log("Модель добавлена в сцену");
            },
            (xhr) => {
                const percent = ((xhr.loaded / xhr.total) * 100).toFixed(0);
                loadingDiv.textContent = `Загрузка... ${percent}%`;
            },
            (error) => {
                console.error("Ошибка загрузки:", error);
                loadingDiv.textContent = "Ошибка загрузки модели";
                loadingDiv.style.backgroundColor = "rgba(255,0,0,0.7)";
                setTimeout(() => loadingDiv.remove(), 3000);
            },
        );
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.controls) {
            this.controls.update();
        }
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    render() {
        this.initThreeJS();
    }
}
