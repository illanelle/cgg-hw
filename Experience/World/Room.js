import * as THREE from "three";
import { TOUCH } from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        // this.roomChildren = {};
        this.lerp = {
            current:0.1,
            target:0,
            ease:0.1,

        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

    }

    setModel() {
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            // 设置水玻璃
            if (child.name === "water") {
                // console.log(child);
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x549dd2);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }

            // 设置屏幕纹理
            if (child.name === "screen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

           
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
        //this.actualRoom.rotation.y = Math.PI;
    }
//设置鱼游动的动画
setAnimation() {
    // 定位到fish物体
    this.actualRoom.children.forEach(child=>{
        if (child.name === "fish") {
            this.mixer = new THREE.AnimationMixer(child);
        }
    });
    // 定位到fish的动画fishAction
    // console.log(this.room);
    this.swim = this.mixer.clipAction(this.room.animations[21]);
    this.swim.play();
}

onMouseMove() {
    window.addEventListener("mousemove",(e)=>{
        this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
        this.lerp.target = this.rotation *0.1 ;
    
    });      

}

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current ,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        //console.log(this.room);
        this.mixer.update(this.time.delta * 0.0009); 
        
    }
}
