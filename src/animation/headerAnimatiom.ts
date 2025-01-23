import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


export const headerAnimation = (elem: HTMLHeadElement) => {
    gsap.registerPlugin(ScrollTrigger); // регистрация плагина ScrollTrigger

    const showAnim = gsap.from(elem, {
        yPercent: -100,
        paused: true,
        duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            self.direction === -1 ? showAnim.play() : showAnim.reverse()
        }
    });

}