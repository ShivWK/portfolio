import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
    circleInit,
    squareInit,
    triangleInit,
    hexagonInit,
    pentagonInit,
    diamondInit
} from "../../utils/initializer";

import {
    circleParticlesArray,
    squareParticlesArray,
    triangleParticlesArray,
    pentagonParticlesArray,
    hexagonParticlesArray,
    diamondParticlesArray
} from "../../utils/initializer";

import NavigationMenu from "./NavigationMenu";
import About from "./About";

const BodySection = ({ scrollOffset }) => {
    const canvasRef = useRef(null);
    const [size, setSize] = useState(0);

    function particleHandler(particleArray, canvas) {
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update(scrollOffset, canvas);
            particleArray[i].draw();
        }
    }

    useLayoutEffect(() => {
        if (window.innerHeight <= 768) {
            setSize(464);
        } else {
            setSize(384);
        }
    }, [])

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight + size;


            circleInit(ctx, canvas);
            squareInit(ctx, canvas);
            triangleInit(ctx, canvas);
            pentagonInit(ctx, canvas);
            hexagonInit(ctx, canvas);
            diamondInit(ctx, canvas);

            function animateSquares() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particleHandler(pentagonParticlesArray, canvas);
                particleHandler(hexagonParticlesArray, canvas)
                particleHandler(squareParticlesArray, canvas);
                particleHandler(circleParticlesArray, canvas);
                particleHandler(triangleParticlesArray, canvas);
                particleHandler(diamondParticlesArray, canvas);

                requestAnimationFrame(animateSquares);
            }
            requestAnimationFrame(animateSquares);
        }
    }, [size])

    useEffect(() => {
        const canvas = canvasRef.current;

        particleHandler(pentagonParticlesArray, canvas);
        particleHandler(hexagonParticlesArray, canvas);
        particleHandler(squareParticlesArray, canvas);
        particleHandler(circleParticlesArray, canvas);
        particleHandler(triangleParticlesArray, canvas);
        particleHandler(diamondParticlesArray, canvas);

    }, [scrollOffset])

    return <section id="body" className="relative flex flex-col gap-14 lg:gap-32 -top-[29rem] lg:-top-[24rem] animate-bodyFadeInSm lg:animate-bodyFadeInLg text-gray-300 pt-18 lg:pt-96 h-full " >
        <NavigationMenu />

        <div className="mx-auto lg:w-[1024px] max-lg:px-3">
            <About />
        </div>

        <canvas className="absolute top-0 left-0 bg-[linear-gradient(135deg,#000000_0%,#01111a_40%,#011d3a_70%,#021120_100%)] -z-20" ref={canvasRef}></canvas>
    </section>
}

export default BodySection;