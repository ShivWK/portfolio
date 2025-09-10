import { useEffect, useRef, useState } from "react";
import HeroSection from "./HeroSection";
import BodySection from "./BodySection";

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

const Home = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const [ready, setReady] = useState(false);
    const [size, setSize] = useState("");
    const canvasRef = useRef(null);
    const lastClientHeight = useRef(0);

    function particleHandler(particleArray, canvas) {
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update(scrollOffset, canvas);
            particleArray[i].draw();
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentClientHeight = window.scrollY;

            if (lastClientHeight.current < currentClientHeight) {
                setScrollOffset(-100);
            } else {
                setScrollOffset(100);
            }
            lastClientHeight.current = currentClientHeight;
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth <= 768) {
                setSize("small");
            } else {
                setSize("large");
            }
        }
        resizeHandler();

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    function setupCanvas(canvas) {
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        const main = document.getElementById("main");
        const rect = main.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;


        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        circleParticlesArray.length = 0;
        squareParticlesArray.length = 0;
        triangleParticlesArray.length = 0;
        pentagonParticlesArray.length = 0;
        hexagonParticlesArray.length = 0;
        diamondParticlesArray.length = 0;

        circleInit(ctx, canvas);
        squareInit(ctx, canvas);
        triangleInit(ctx, canvas);
        pentagonInit(ctx, canvas);
        hexagonInit(ctx, canvas);
        diamondInit(ctx, canvas);

        return ctx;
    }

    useEffect(() => {
        const startCanvas = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = setupCanvas(canvas);

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

                const resizeHandler = () => {
                    const ctx = setupCanvas(canvasRef.current);
                }

                window.addEventListener("resize", resizeHandler);
                return () => window.removeEventListener("resize", resizeHandler);
            }
        }

        const schedule = window.requestIdleCallback || ((cb) => setTimeout(cd, 200));
        schedule(() => {
            startCanvas();
            setReady(true);
        }, { timeout: 1000 })

    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;

        particleHandler(pentagonParticlesArray, canvas);
        particleHandler(hexagonParticlesArray, canvas);
        particleHandler(squareParticlesArray, canvas);
        particleHandler(circleParticlesArray, canvas);
        particleHandler(triangleParticlesArray, canvas);
        particleHandler(diamondParticlesArray, canvas);

    }, [scrollOffset]);

    return <main id="main" className="relative bg-[linear-gradient(135deg,#000000_0%,#01111a_40%,#011d3a_70%,#021120_100%)] -z-20">
        <HeroSection scrollOffset={scrollOffset} size={size} />
        <BodySection scrollOffset={scrollOffset} size={size} />

        <canvas ref={canvasRef} className={`absolute top-0 left-0 bg-transparent ${ready && "animate-canvasFadeIn"} -z-20`}></canvas>
    </main>
}

export default Home;