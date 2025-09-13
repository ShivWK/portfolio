import { useState, useEffect, useRef, Suspense, lazy, useLayoutEffect } from "react";
import NavigationMenu from "./NavigationMenu";
import About from "./about/About";
// const Skills = lazy(() => import("./about/Skills"))
import Skills from "./about/Skills";
// const GithubStats = lazy(() => import("./about/GithubStats"));
import GithubStats from "./about/GithubStats";
import Projects from "./projects/Projects";
import Contact from "./contact/Contact";

const BodySection = ({ scrollOffset, isSmall }) => {
    const [ready, setReady] = useState(false);
    const [currentSection, setCurrentSection] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 300)

        const sections = document.querySelectorAll(".section");
        let visibleSection = null;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!visibleSection || entry.intersectionRatio > visibleSection.intersectionRatio) {
                        visibleSection = entry
                    }
                }
            })

            if (visibleSection) {
                setCurrentSection(visibleSection.target);
            } else {
                setCurrentSection(null);
            }
        }, { threshold: 0.5});

        sections.forEach(ele => {
            observer.observe(ele);
        })

        return () => sections.forEach(element => observer.unobserve(element));
    }, [])

    return <section id="body" className={`relative flex flex-col gap-14 lg:gap-24 -top-16 lg:-top-20 text-gray-300 transform ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-500 ease-linear`}>
        <NavigationMenu currentSection={currentSection} />
        <section id="about" className="section scroll-mt-30">
            <div className="mx-auto lg:max-w-[1024px] max-lg:px-3">
                <About />
            </div>
            {/* <Suspense fallback={<p>Loading...</p>}> */}
            <Skills isSmall={isSmall} />
            {/* </Suspense> */}
            {/* <Suspense fallback={<p>Loading...</p>}> */}
            <GithubStats isSmall={isSmall} />
            {/* </Suspense> */}
        </section>
        <section id="projects" className="section scroll-mt-30">
            <Projects isSmall={isSmall} />
        </section>
        {/* <section id="content" className="section scroll-mt-30">

        </section> */}
        <section id="contact" className="section scroll-mt-30 mx-auto lg:w-[1024px] max-lg:px-3">
         <Contact />
        </section>
    </section>
}

export default BodySection;