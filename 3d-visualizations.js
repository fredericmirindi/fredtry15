// 3D Visualizations JavaScript
// Advanced Three.js visualizations for research laboratory

class ThreeDVisualizations {
    constructor() {
        this.scenes = new Map();
        this.renderers = new Map();
        this.cameras = new Map();
        this.animationFrames = new Map();
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded. 3D visualizations will be disabled.');
            return;
        }
        
        this.initializeScenes();
        this.setupEventListeners();
        this.isInitialized = true;
        console.log('3D Visualizations initialized successfully');
    }

    initializeScenes() {
        // Initialize different 3D scenes for various components
        this.initializeResearchLabScene();
        this.initializeTimelineScene();
        this.initializeHeroScene();
        this.initializeMetricsVisualization();
    }

    initializeResearchLabScene() {
        const container = document.getElementById('research-3d-scene');
        if (!container) return;

        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa);
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(
            75, 
            container.clientWidth / container.clientHeight, 
            0.1, 
            1000
        );
        camera.position.set(0, 10, 20);
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);
        
        // Add lighting
        this.addLighting(scene);
        
        // Create research area visualization
        this.createResearchAreaVisualization(scene);
        
        // Add controls
        if (typeof THREE.OrbitControls !== 'undefined') {
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
        }
        
        // Store references
        this.scenes.set('researchLab', scene);
        this.cameras.set('researchLab', camera);
        this.renderers.set('researchLab', renderer);
        
        // Start animation
        this.animateResearchLab();
    }

    initializeTimelineScene() {
        const container = document.getElementById('timeline-3d-scene');
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        
        const camera = new THREE.PerspectiveCamera(
            75, 
            container.clientWidth / container.clientHeight, 
            0.1, 
            1000
        );
        camera.position.set(0, 5, 15);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Add timeline visualization
        this.createTimelineVisualization(scene);
        
        this.scenes.set('timeline', scene);
        this.cameras.set('timeline', camera);
        this.renderers.set('timeline', renderer);
        
        this.animateTimeline();
    }

    initializeHeroScene() {
        const container = document.getElementById('hero-3d-scene');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, 
            container.clientWidth / container.clientHeight, 
            0.1, 
            1000
        );
        camera.position.set(0, 0, 10);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Create particle system for hero background
        this.createHeroParticleSystem(scene);
        
        this.scenes.set('hero', scene);
        this.cameras.set('hero', camera);
        this.renderers.set('hero', renderer);
        
        this.animateHero();
    }

    initializeMetricsVisualization() {
        // Create dynamic 3D charts for metrics
        this.createMetricsCharts();
    }

    addLighting(scene) {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);
        
        // Point lights for accent
        const pointLight1 = new THREE.PointLight(0x21808d, 0.5, 50);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x32b8c6, 0.3, 30);
        pointLight2.position.set(-10, 5, 5);
        scene.add(pointLight2);
    }

    createResearchAreaVisualization(scene) {
        // Create floating research nodes
        const researchAreas = [
            { name: 'Economic Forecasting', position: [0, 2, 0], color: 0x21808d },
            { name: 'NLP Economics', position: [-3, 0, -2], color: 0x32b8c6 },
            { name: 'Blockchain Economics', position: [3, -1, 1], color: 0x667eea },
            { name: 'Policy Analysis', position: [0, -2, 3], color: 0xf5576c }
        ];
        
        const nodeGroup = new THREE.Group();
        
        researchAreas.forEach((area, index) => {
            // Create main node
            const geometry = new THREE.SphereGeometry(0.8, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: area.color,
                transparent: true,
                opacity: 0.8
            });
            const node = new THREE.Mesh(geometry, material);
            node.position.set(...area.position);
            node.castShadow = true;
            node.userData = { name: area.name, type: 'research-node' };
            
            // Add pulsing effect
            node.userData.originalScale = node.scale.clone();
            
            // Create orbital rings
            const ringGeometry = new THREE.RingGeometry(1.2, 1.4, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: area.color,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.copy(node.position);
            ring.rotation.x = Math.PI / 2;
            
            // Create data connections
            this.createDataConnections(node, nodeGroup, area.color);
            
            nodeGroup.add(node);
            nodeGroup.add(ring);
        });
        
        // Add interconnection lines
        this.createInterconnections(researchAreas, nodeGroup);
        
        scene.add(nodeGroup);
        
        // Store for animation
        scene.userData.researchNodes = nodeGroup;
    }

    createDataConnections(centerNode, group, color) {
        // Create floating data points around each research node
        const dataPointCount = 8;
        const radius = 2;
        
        for (let i = 0; i < dataPointCount; i++) {
            const angle = (i / dataPointCount) * Math.PI * 2;
            const height = (Math.random() - 0.5) * 2;
            
            const geometry = new THREE.SphereGeometry(0.1, 8, 8);
            const material = new THREE.MeshBasicMaterial({ color: color });
            const dataPoint = new THREE.Mesh(geometry, material);
            
            dataPoint.position.set(
                centerNode.position.x + Math.cos(angle) * radius,
                centerNode.position.y + height,
                centerNode.position.z + Math.sin(angle) * radius
            );
            
            dataPoint.userData = {
                angle: angle,
                radius: radius,
                centerNode: centerNode,
                speed: 0.01 + Math.random() * 0.02
            };
            
            group.add(dataPoint);
        }
    }

    createInterconnections(areas, group) {
        // Create lines connecting research areas
        for (let i = 0; i < areas.length; i++) {
            for (let j = i + 1; j < areas.length; j++) {
                const start = new THREE.Vector3(...areas[i].position);
                const end = new THREE.Vector3(...areas[j].position);
                
                const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
                const material = new THREE.LineBasicMaterial({
                    color: 0x888888,
                    transparent: true,
                    opacity: 0.3
                });
                const line = new THREE.Line(geometry, material);
                
                group.add(line);
            }
        }
    }

    createTimelineVisualization(scene) {
        // Create 3D timeline with milestones
        const timelineData = [
            { year: 2025, type: 'research', position: [0, 3, 0], color: 0x21808d },
            { year: 2024, type: 'publication', position: [2, 1, -1], color: 0x32b8c6 },
            { year: 2023, type: 'award', position: [-2, -1, 1], color: 0xf5576c },
            { year: 2022, type: 'education', position: [0, -3, 0], color: 0x667eea }
        ];
        
        const timelineGroup = new THREE.Group();
        
        // Create main timeline spine
        const spineGeometry = new THREE.CylinderGeometry(0.05, 0.05, 8, 8);
        const spineMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
        const spine = new THREE.Mesh(spineGeometry, spineMaterial);
        timelineGroup.add(spine);
        
        timelineData.forEach((milestone, index) => {
            // Create milestone node
            const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
            const nodeMaterial = new THREE.MeshPhongMaterial({ color: milestone.color });
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(...milestone.position);
            node.userData = milestone;
            
            // Create connection to spine
            const connectionStart = new THREE.Vector3(0, milestone.position[1], 0);
            const connectionEnd = new THREE.Vector3(...milestone.position);
            const connectionGeometry = new THREE.BufferGeometry().setFromPoints([connectionStart, connectionEnd]);
            const connectionMaterial = new THREE.LineBasicMaterial({ color: milestone.color });
            const connection = new THREE.Line(connectionGeometry, connectionMaterial);
            
            timelineGroup.add(node);
            timelineGroup.add(connection);
        });
        
        scene.add(timelineGroup);
        scene.userData.timelineGroup = timelineGroup;
    }

    createHeroParticleSystem(scene) {
        // Create floating particles for hero background
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 50;
            positions[i + 1] = (Math.random() - 0.5) * 30;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            velocities[i] = (Math.random() - 0.5) * 0.02;
            velocities[i + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i + 2] = (Math.random() - 0.5) * 0.02;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0x21808d,
            size: 0.1,
            transparent: true,
            opacity: 0.6
        });
        
        const particles = new THREE.Points(geometry, material);
        particles.userData.velocities = velocities;
        
        scene.add(particles);
        scene.userData.particles = particles;
    }

    createMetricsCharts() {
        // Create 3D bar charts for metrics
        const metricsContainers = document.querySelectorAll('.metric-chart');
        
        metricsContainers.forEach((container, index) => {
            if (container.tagName === 'CANVAS') return; // Skip if already has canvas
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);
            
            // Create 3D chart data
            this.create3DChart(scene, index);
            
            camera.position.set(2, 2, 3);
            
            // Animation loop for metrics
            const animate = () => {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };
            animate();
        });
    }

    create3DChart(scene, chartIndex) {
        const data = [
            [0.8, 0.6, 0.9, 0.7, 0.85],
            [0.7, 0.8, 0.6, 0.9, 0.75],
            [0.9, 0.7, 0.8, 0.6, 0.82]
        ];
        
        const chartData = data[chartIndex] || data[0];
        const colors = [0x21808d, 0x32b8c6, 0x667eea, 0xf5576c, 0x4facfe];
        
        chartData.forEach((value, index) => {
            const geometry = new THREE.BoxGeometry(0.3, value * 2, 0.3);
            const material = new THREE.MeshPhongMaterial({ color: colors[index] });
            const bar = new THREE.Mesh(geometry, material);
            
            bar.position.set(index * 0.5 - 1, value, 0);
            scene.add(bar);
        });
        
        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        scene.add(light);
        
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);
    }

    animateResearchLab() {
        const scene = this.scenes.get('researchLab');
        const camera = this.cameras.get('researchLab');
        const renderer = this.renderers.get('researchLab');
        
        if (!scene || !camera || !renderer) return;
        
        const animate = () => {
            const frameId = requestAnimationFrame(animate);
            this.animationFrames.set('researchLab', frameId);
            
            // Animate research nodes
            if (scene.userData.researchNodes) {
                this.animateResearchNodes(scene.userData.researchNodes);
            }
            
            renderer.render(scene, camera);
        };
        
        animate();
    }

    animateResearchNodes(nodeGroup) {
        const time = Date.now() * 0.001;
        
        nodeGroup.children.forEach(child => {
            if (child.userData.type === 'research-node') {
                // Pulsing effect
                const scale = 1 + Math.sin(time * 2) * 0.1;
                child.scale.setScalar(scale);
                
                // Gentle rotation
                child.rotation.y += 0.01;
            }
            
            // Animate data points
            if (child.userData.centerNode) {
                const userData = child.userData;
                userData.angle += userData.speed;
                
                child.position.set(
                    userData.centerNode.position.x + Math.cos(userData.angle) * userData.radius,
                    child.position.y,
                    userData.centerNode.position.z + Math.sin(userData.angle) * userData.radius
                );
            }
        });
    }

    animateTimeline() {
        const scene = this.scenes.get('timeline');
        const camera = this.cameras.get('timeline');
        const renderer = this.renderers.get('timeline');
        
        if (!scene || !camera || !renderer) return;
        
        const animate = () => {
            const frameId = requestAnimationFrame(animate);
            this.animationFrames.set('timeline', frameId);
            
            // Rotate timeline for better view
            if (scene.userData.timelineGroup) {
                scene.userData.timelineGroup.rotation.y += 0.005;
            }
            
            renderer.render(scene, camera);
        };
        
        animate();
    }

    animateHero() {
        const scene = this.scenes.get('hero');
        const camera = this.cameras.get('hero');
        const renderer = this.renderers.get('hero');
        
        if (!scene || !camera || !renderer) return;
        
        const animate = () => {
            const frameId = requestAnimationFrame(animate);
            this.animationFrames.set('hero', frameId);
            
            // Animate particles
            if (scene.userData.particles) {
                this.animateParticles(scene.userData.particles);
            }
            
            renderer.render(scene, camera);
        };
        
        animate();
    }

    animateParticles(particles) {
        const positions = particles.geometry.attributes.position.array;
        const velocities = particles.userData.velocities;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
            
            // Wrap around boundaries
            if (Math.abs(positions[i]) > 25) velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 15) velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
    }

    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Handle mouse interactions
        this.setupMouseInteractions();
        
        // Handle research area switching
        document.querySelectorAll('.area-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const area = e.target.getAttribute('data-area');
                this.highlightResearchArea(area);
            });
        });
    }

    setupMouseInteractions() {
        const researchContainer = document.getElementById('research-3d-scene');
        if (!researchContainer) return;
        
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        researchContainer.addEventListener('mousemove', (event) => {
            const rect = researchContainer.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            const scene = this.scenes.get('researchLab');
            const camera = this.cameras.get('researchLab');
            
            if (scene && camera) {
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(scene.children, true);
                
                // Reset all objects
                this.resetHighlight(scene);
                
                if (intersects.length > 0) {
                    const object = intersects[0].object;
                    if (object.userData.type === 'research-node') {
                        this.highlightObject(object);
                        this.showTooltip(object.userData.name, event);
                    }
                }
            }
        });
        
        researchContainer.addEventListener('click', (event) => {
            const rect = researchContainer.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            const scene = this.scenes.get('researchLab');
            const camera = this.cameras.get('researchLab');
            
            if (scene && camera) {
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(scene.children, true);
                
                if (intersects.length > 0) {
                    const object = intersects[0].object;
                    if (object.userData.type === 'research-node') {
                        this.onResearchNodeClick(object.userData.name);
                    }
                }
            }
        });
    }

    highlightObject(object) {
        if (object.material) {
            object.material.emissive.setHex(0x444444);
            object.scale.setScalar(1.2);
        }
    }

    resetHighlight(scene) {
        scene.traverse((child) => {
            if (child.userData.type === 'research-node') {
                if (child.material) {
                    child.material.emissive.setHex(0x000000);
                    child.scale.copy(child.userData.originalScale);
                }
            }
        });
        
        this.hideTooltip();
    }

    showTooltip(text, event) {
        let tooltip = document.getElementById('3d-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = '3d-tooltip';
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                pointer-events: none;
                z-index: 1000;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = text;
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY - 30 + 'px';
        tooltip.style.opacity = '1';
    }

    hideTooltip() {
        const tooltip = document.getElementById('3d-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }

    onResearchNodeClick(nodeName) {
        // Handle research node click - could show detailed info or navigate
        console.log(`Clicked on research node: ${nodeName}`);
        
        // Show detailed information panel
        this.showResearchAreaDetails(nodeName);
    }

    showResearchAreaDetails(areaName) {
        // This would integrate with the existing research area switching
        if (window.ResearchLab && window.ResearchLab.switchResearchArea) {
            const areaMap = {
                'Economic Forecasting': 'forecasting',
                'NLP Economics': 'nlp',
                'Blockchain Economics': 'blockchain',
                'Policy Analysis': 'policy'
            };
            
            const areaKey = areaMap[areaName];
            if (areaKey) {
                window.ResearchLab.switchResearchArea(areaKey);
            }
        }
    }

    highlightResearchArea(area) {
        const scene = this.scenes.get('researchLab');
        if (!scene) return;
        
        const areaNames = {
            'forecasting': 'Economic Forecasting',
            'nlp': 'NLP Economics',
            'blockchain': 'Blockchain Economics',
            'policy': 'Policy Analysis'
        };
        
        const targetName = areaNames[area];
        
        scene.traverse((child) => {
            if (child.userData.type === 'research-node') {
                if (child.userData.name === targetName) {
                    this.highlightObject(child);
                } else {
                    child.material.emissive.setHex(0x000000);
                    child.scale.copy(child.userData.originalScale);
                }
            }
        });
    }

    handleResize() {
        this.renderers.forEach((renderer, key) => {
            const scene = this.scenes.get(key);
            const camera = this.cameras.get(key);
            
            if (!scene || !camera) return;
            
            let container;
            switch (key) {
                case 'researchLab':
                    container = document.getElementById('research-3d-scene');
                    break;
                case 'timeline':
                    container = document.getElementById('timeline-3d-scene');
                    break;
                case 'hero':
                    container = document.getElementById('hero-3d-scene');
                    break;
            }
            
            if (container) {
                const width = container.clientWidth;
                const height = container.clientHeight;
                
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }
        });
    }

    // Enhanced features for specific visualizations
    createNetworkVisualization(data) {
        // Create a network graph for collaboration or citation networks
        const scene = new THREE.Scene();
        const networkGroup = new THREE.Group();
        
        data.nodes.forEach(node => {
            const geometry = new THREE.SphereGeometry(node.size || 0.5, 16, 16);
            const material = new THREE.MeshPhongMaterial({ color: node.color || 0x21808d });
            const sphere = new THREE.Mesh(geometry, material);
            
            sphere.position.set(node.x, node.y, node.z);
            sphere.userData = node;
            
            networkGroup.add(sphere);
        });
        
        // Add connections
        data.edges.forEach(edge => {
            const start = new THREE.Vector3(edge.source.x, edge.source.y, edge.source.z);
            const end = new THREE.Vector3(edge.target.x, edge.target.y, edge.target.z);
            
            const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
            const material = new THREE.LineBasicMaterial({ 
                color: edge.color || 0x888888,
                transparent: true,
                opacity: edge.opacity || 0.6
            });
            const line = new THREE.Line(geometry, material);
            
            networkGroup.add(line);
        });
        
        scene.add(networkGroup);
        return scene;
    }

    createDataFlowVisualization() {
        // Create animated data flow between research components
        const scene = this.scenes.get('researchLab');
        if (!scene) return;
        
        const flowParticles = [];
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const geometry = new THREE.SphereGeometry(0.05, 8, 8);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x00ff88,
                transparent: true,
                opacity: 0.8
            });
            const particle = new THREE.Mesh(geometry, material);
            
            // Random position along data flow paths
            particle.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 10
            );
            
            particle.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.1
                ),
                life: Math.random() * 100
            };
            
            flowParticles.push(particle);
            scene.add(particle);
        }
        
        return flowParticles;
    }

    updateDataFlow(particles) {
        particles.forEach(particle => {
            particle.position.add(particle.userData.velocity);
            particle.userData.life += 1;
            
            // Fade out over time
            particle.material.opacity = Math.max(0, 1 - particle.userData.life / 100);
            
            // Reset particle when it fades out
            if (particle.userData.life > 100) {
                particle.position.set(
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 5,
                    (Math.random() - 0.5) * 10
                );
                particle.userData.life = 0;
                particle.material.opacity = 0.8;
            }
        });
    }

    // Utility methods
    pauseAnimations() {
        this.animationFrames.forEach((frameId, key) => {
            cancelAnimationFrame(frameId);
        });
        this.animationFrames.clear();
    }

    resumeAnimations() {
        this.animateResearchLab();
        this.animateTimeline();
        this.animateHero();
    }

    dispose() {
        // Clean up resources
        this.pauseAnimations();
        
        this.renderers.forEach(renderer => {
            renderer.dispose();
        });
        
        this.scenes.forEach(scene => {
            scene.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        });
        
        this.scenes.clear();
        this.cameras.clear();
        this.renderers.clear();
    }

    getStats() {
        return {
            isInitialized: this.isInitialized,
            activeScenes: this.scenes.size,
            activeAnimations: this.animationFrames.size,
            renderers: this.renderers.size
        };
    }
}

// Export for global access
window.ThreeDVisualizations = ThreeDVisualizations;

// Initialize 3D visualizations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.threeDViz = new ThreeDVisualizations();
        console.log('3D Visualizations system ready');
    }, 1000);
});

// Add performance monitoring
const performanceMonitor = {
    frameCount: 0,
    lastTime: performance.now(),
    fps: 0,
    
    update() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Log performance if FPS is low
            if (this.fps < 30) {
                console.warn(`Low FPS detected: ${this.fps}`);
            }
        }
    },
    
    getFPS() {
        return this.fps;
    }
};

// Export performance monitor
window.performanceMonitor = performanceMonitor;