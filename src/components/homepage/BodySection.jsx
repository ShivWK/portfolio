import { useEffect, useRef, useState } from "react";

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

const BodySection = ({ scrollOffset }) => {
    const canvasRef = useRef(null);

    function particleHandler(particleArray, canvas) {
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update(scrollOffset, canvas);
            particleArray[i].draw();
        }
    }

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;

            // window.addEventListener("resize", () => {
            //     canvas.width = window.innerWidth;
            //     canvas.height = document.documentElement.scrollHeight;
            // })

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
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;

        particleHandler(pentagonParticlesArray, canvas);
        particleHandler(hexagonParticlesArray, canvas);
        particleHandler(squareParticlesArray, canvas);
        particleHandler(circleParticlesArray, canvas);
        particleHandler(triangleParticlesArray, canvas);
        particleHandler(diamondParticlesArray, canvas);

    }, [scrollOffset])

    return <section id="body" className="relative -top-16 lg:-top-24 text-gray-300 pt-14 lg:pt-16 h-full" >
        <NavigationMenu />

        <canvas className="absolute top-0 left-0 bg-[linear-gradient(135deg,#000000_0%,#01111a_40%,#011d3a_70%,#021120_100%)] -z-20" ref={canvasRef}></canvas>
    </section>
} 

export default BodySection;