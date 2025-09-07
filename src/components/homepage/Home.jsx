import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    const [size, setSize] = useState(0);
    const [ready, setReady] = useState(false);
    const lastClientHeight = useRef(0);
    const canvasRef = useRef(null);

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
        const startCanvas = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                canvas.width = window.innerWidth;
                canvas.height = document.documentElement.scrollHeight ;

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

                const resizeHandler = () => {
                    canvas.height = document.documentElement.scrollHeight;
                    canvas.width = window.width;
                }

                // window.addEventListener("resize", resizeHandler);

                // return () => window.removeEventListener("resize", resizeHandler);
            }
        }

        const schedule = window.requestIdleCallback || ((cb) => setTimeout(cd, 200));
        schedule(() => {
            startCanvas();
            setReady(true);
        }, { timeout: 1000 })

    }, [size])

    useEffect(() => {
        const canvas = canvasRef.current;

        particleHandler(pentagonParticlesArray, canvas);
        particleHandler(hexagonParticlesArray, canvas);
        particleHandler(squareParticlesArray, canvas);
        particleHandler(circleParticlesArray, canvas);
        particleHandler(triangleParticlesArray, canvas);
        particleHandler(diamondParticlesArray, canvas);

    }, [scrollOffset]);

    useEffect(() => {
        const handleScroll = () => {
            const currentClientHeight = window.scrollY;

            if (lastClientHeight.current < currentClientHeight) {
                //scrolled down
                setScrollOffset(-100);
            } else {
                // SCROLLED UP
                setScrollOffset(100);
            }
            lastClientHeight.current = currentClientHeight;
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <main className="relative bg-[linear-gradient(135deg,#000000_0%,#01111a_40%,#011d3a_70%,#021120_100%)] -z-10">
        <HeroSection scrollOffset={scrollOffset} />
        <BodySection scrollOffset={scrollOffset} />
        <canvas className={`absolute top-0 left-0 bg-transparent ${ready && "animate-canvasFadeIn"} -z-20`} ref={canvasRef}></canvas>
    </main>
}

export default Home;