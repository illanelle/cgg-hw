import * as THREE from "three";
import { TOUCH } from "three";
import Experience from "../Experience.js";

import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;      
        GSAP.registerPlugin(ScrollTrigger);

        this.setPath();
    }

    setPath(){//控制模型随页面移动而移动
        console.log(this.room.position);
        // this.room.position.x = 0;
        this.timelinefrist = new GSAP.timeline();
        this.timelinefrist.to(this.room.position,{
            x:()=>{
                return this.sizes.width * 0.0012;
            },
            scrollTrigger:{
                trigger:".first-move",
                marker:true,
                star:"top top",
                end:"bottom bottom",
                scrub:0.4,
                invalidataOnRefresh:true,
            }
        });

        console.log(this.room.position);
        this.room.position.x = this.sizes.width * 0.0012;

        this.timelinesecond = new GSAP.timeline();
        this.timelinesecond.to(this.room.position,{
            x:()=>{
                return -this.sizes.width * 0.0012;
            },
            scrollTrigger:{
                trigger:".second-move",
                marker:true,
                star:"top center",
                end:"bottom bottom",
                scrub:0.4,
                invalidataOnRefresh:true,
            }
        });
        console.log(this.room.position);
    }


    // onMouseMove() {
    //     window.addEventListener("mousemove", (e) => {
    //         this.rotation =
    //             ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
    //         this.lerp.target = this.rotation * 0.05;
    //     });
    // }

    

    resize() {}

    update() {
      
    }
}
