import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ThreeJsComponent() {
  const canvasRef = useRef(null);

  var camera,
    scene,
    renderer,
    stars = [];

  function init() {
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 5;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function addSphere() {
    for (var z = -1000; z < 1000; z += 20) {
      var geometry = new THREE.SphereGeometry(0.5, 32, 32);
      var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      var sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;
      sphere.position.z = z;
      sphere.scale.x = sphere.scale.y = 2;
      scene.add(sphere);
      stars.push(sphere);
    }
  }

  function animateStars() {
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      star.position.z += i / 10;
      if (star.position.z > 1000) star.position.z -= 2000;
    }
  }

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    animateStars();
  }

  useEffect(() => {
    init();
    addSphere();
    render();
  }, []);

  return <canvas ref={canvasRef} />;
}

export default ThreeJsComponent;
