import { useState, useEffect, useRef, Suspense, lazy, useLayoutEffect } from "react";
import NavigationMenu from "./NavigationMenu";
import About from "./about/About";
// const Skills = lazy(() => import("./about/Skills"))
import Skills from "./about/Skills";
// const GithubStats = lazy(() => import("./about/GithubStats"));
import GithubStats from "./about/GithubStats";
import Projects from "./projects/Projects";

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

const BodySection = ({ scrollOffset }) => {
    const [extraSize, setExtraSize] = useState(0);
    const [ready, setReady] = useState(false);
    const [size, setSize] = useState("");
    const canvasRef = useRef(null);

    function particleHandler(particleArray, canvas) {
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update(scrollOffset, canvas);
            particleArray[i].draw();
        }
    }

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth <= 768) {
                setSize("small");
                setExtraSize(64);

            } else {
                setSize("large");
                setExtraSize(80);
            }
        }
        resizeHandler();

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    useEffect(() => {
        const startCanvas = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                canvas.width = window.innerWidth;
                canvas.height = document.getElementById("body").scrollHeight;

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
                    canvas.height = document.getElementById("body").scrollHeight;
                    canvas.width = window.width;
                }

                document.getElementById("body").addEventListener("resize", resizeHandler);
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

    }, [scrollOffset]); //border border-white

    return <section id="body" className="relative flex flex-col gap-14 lg:gap-24 -top-16 lg:-top-20 text-gray-300 " >
        <NavigationMenu />
        <div className="">
            <div className="mx-auto lg:max-w-[1024px] max-lg:px-3">
                <About />
            </div>
            <Suspense fallback={<p>Loading...</p>}>
                <Skills size={size} />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <GithubStats size={size} />
            </Suspense>
        </div>
        <Projects />

        <canvas ref={canvasRef} className={`absolute top-0 left-0 bg-transparent ${ready && "animate-canvasFadeIn"} -z-20`}></canvas>
    </section>
}

export default BodySection;