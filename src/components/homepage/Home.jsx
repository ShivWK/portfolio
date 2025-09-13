import { useEffect, useRef, useState, useLayoutEffect } from "react";
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
import BackToTopButton from "../BackToTopButton";
import Footer from "./Footer";
import BodyBg from "./BodyBg";

const Home = () => {
    const [footerVisible, setFooterVisible] = useState(false);
    const [scrollWidth, setScrollWidth] = useState(0);
    const [ready, setReady] = useState(false);
    const [isSmall, setIsSmall] = useState("");
    const canvasRef = useRef(null);
    const footRef = useRef(null);

    function particleHandler(particleArray, canvas, timestamp) {
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update(canvas);
            particleArray[i].draw();
        }
    }

    useLayoutEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth <= 768) {
                setIsSmall(true);
            } else {
                setIsSmall(false);
            }
        }
        resizeHandler();

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    function setupCanvas(canvas) {
        const ctx = canvas.getContext("2d");

        const main = document.getElementById("main");
        canvas.height = main.scrollHeight;
        canvas.width = window.innerWidth;

        circleParticlesArray.length = 0;
        squareParticlesArray.length = 0;
        triangleParticlesArray.length = 0;
        pentagonParticlesArray.length = 0;
        hexagonParticlesArray.length = 0;
        diamondParticlesArray.length = 0;

        circleInit(ctx, canvas, isSmall);
        squareInit(ctx, canvas, isSmall);
        triangleInit(ctx, canvas, isSmall);
        (!isSmall && pentagonInit(ctx, canvas, isSmall));
        hexagonInit(ctx, canvas, isSmall);
        (!isSmall && diamondInit(ctx, canvas, isSmall));

        return ctx;
    }

    useEffect(() => {
        const startCanvas = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = setupCanvas(canvas);

                function animateSquares(timeStamp) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    (!isSmall && particleHandler(pentagonParticlesArray, canvas, timeStamp))
                    particleHandler(hexagonParticlesArray, canvas, timeStamp)
                    particleHandler(squareParticlesArray, canvas, timeStamp);
                    particleHandler(circleParticlesArray, canvas, timeStamp);
                    particleHandler(triangleParticlesArray, canvas, timeStamp);
                    (!isSmall && particleHandler(diamondParticlesArray, canvas, timeStamp));

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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setFooterVisible(true);
                } else {
                    setFooterVisible(false);
                }
            })
        }, { threshold: 0.05 });

        observer.observe(footRef.current);
    }, []);

    useEffect(() => {
        const scrollHandler = () => {
            const scrollTop = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;

            const scrolledPercentage = ((scrollTop / height) * 100);
            setScrollWidth(scrolledPercentage);
        }

        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [])

    return <main id="main" className="relative bg-[linear-gradient(135deg,#000000_0%,#01111a_40%,#011d3a_70%,#021120_100%)] -z-20">
        <div className={`fixed h-1 bg-[#0099ffff] z-40 transition-all duration-[0.25s] ease-linear`} style={{
            width: `${scrollWidth}%`
        }}></div>

        <HeroSection isSmall={isSmall} />
        <BodySection isSmall={isSmall} />
        <BackToTopButton visible={footerVisible} />
        <Footer reference={footRef} />
{/* 
        <canvas ref={canvasRef} className={`absolute top-0 left-0 bg-transparent ${ready && "animate-canvasFadeIn"} -z-20`}></canvas> */}
        <BodyBg canvasRef={canvasRef} ready={ready} />
    </main>
}

export default Home;