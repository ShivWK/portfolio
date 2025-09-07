import { useState, useEffect } from "react";
import NavigationMenu from "./NavigationMenu";
import About from "./about/About";
import Skills from "./about/Skills";
import GithubStats from "./about/GithubStats";
import Projects from "./projects/Projects";

const BodySection = () => {
    const [size, setSize] = useState("");

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

    return <section id="body" className="relative flex flex-col gap-14 lg:gap-24 -top-[29rem] lg:-top-[24rem]  text-gray-300 animate-bodyFadeInSm pb-0 lg:animate-bodyFadeInLg" >
        <NavigationMenu />
        <div className="">
            <div className="mx-auto lg:max-w-[1024px] max-lg:px-3">
                <About />
            </div>
            <Skills size={size} />
            <GithubStats size={size} />
        </div>
        <Projects />
    </section>
}

export default BodySection;