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

const BodySection = ({ scrollOffset }) => {
    const canvasRef = useRef(null);
    const firstNavLink = useRef(null);
    const [navSliderStyle, setNavSliderStyle] = useState({ left: 0, width: 0 });

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

        if(firstNavLink.current) {
            const width = firstNavLink.current.offsetWidth;
            setNavSliderStyle({left: 0, width})
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

    const hoverHandler = (e) => {
        const link = e.target;

        const left = link.offsetLeft;
        const width = link.offsetWidth;

        setNavSliderStyle({left, width});
    }

    return <section id="body" className="relative -top-14 lg:-top-20 text-gray-300 pt-14 lg:pt-16" >
        <nav className="flex items-center mx-auto text-xl lg:text-2xl font-semibold backdrop-blur-md bg-white/5 w-fit rounded-4xl border border-white/10 overflow-hidden shadow-[0_0_20px_5px_rgba(0,0,0,0.4)]">
            <a href="#hero" ref={firstNavLink} onMouseEnter={hoverHandler} className="hover:text-blue-300 px-3 lg:px-5 pl-4 lg:pl-6 py-2">Home</a>
            <a href="#about" onMouseEnter={hoverHandler} className="hover:text-blue-300 px-3 lg:px-5 py-2">About</a>
            <a href="#projects" onMouseEnter={hoverHandler} className="hover:text-blue-300 px-3 lg:px-5 py-2">Projects</a>
            <a href="#contact" onMouseEnter={hoverHandler} className="hover:text-blue-300 px-3 lg:px-5 pr-4 lg:pr-6 py-2">Contact</a>
            <span className={`absolute h-full bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(9,9,121,1)_35%,rgba(0,212,255,0.5)_100%)] rounded-xl -z-10 transition-all duration-200 ease-linear`} style={{
                left: navSliderStyle.left,
                width: navSliderStyle.width
            }}></span>
        </nav>

        <canvas className="absolute top-0 left-0 bg-[linear-gradient(135deg,#000000_0%,#01111a_40%,#011d3a_70%,#021120_100%)] -z-20" ref={canvasRef}></canvas>
    </section>
} 

export default BodySection;