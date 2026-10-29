import { gsap } from 'gsap';

export const textAnimation = (elem: NodeListOf<Element>) => {
    const stagger = 1.5;
    const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut", duration: 1 },

    });
    tl.fromTo(
        elem,
        { y: "100%" },
        { y: "0%", stagger: stagger }
    )
        .to(
            elem,
            { y: "-100%", stagger: stagger },
            stagger
        );
}