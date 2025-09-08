import { useState, useEffect, useRef, Suspense, lazy, useLayoutEffect } from "react";
import NavigationMenu from "./NavigationMenu";
import About from "./about/About";
// const Skills = lazy(() => import("./about/Skills"))
import Skills from "./about/Skills";
// const GithubStats = lazy(() => import("./about/GithubStats"));
import GithubStats from "./about/GithubStats";
import Projects from "./projects/Projects";

const BodySection = ({ scrollOffset, size }) => {
    const [ ready, setReady ] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 300)
    }, [])

    return <section id="body" className={`relative flex flex-col gap-14 lg:gap-24 -top-16 lg:-top-20 text-gray-300 transform ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-500 ease-linear`}>
        <NavigationMenu />
        <div>
            <div className="mx-auto lg:max-w-[1024px] max-lg:px-3">
                <About />
            </div>
            {/* <Suspense fallback={<p>Loading...</p>}> */}
                <Skills size={size} />
            {/* </Suspense> */}
            {/* <Suspense fallback={<p>Loading...</p>}> */}
                <GithubStats size={size} />
            {/* </Suspense> */}
        </div>
        <Projects size={size} />
    </section>
}

export default BodySection;