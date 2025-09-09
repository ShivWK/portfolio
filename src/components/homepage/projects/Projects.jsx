import { useRef, useState } from "react"
import useIntersection from "../../../utils/IntersectionObserver"
import { majorProjects, minProjects } from "../../../utils/projectsData";
import ProjectCard from "./ProjectCard";

const Projects = ({ size }) => {
    const [ready, setReady] = useState(false);
    const containerRef = useRef();

    useIntersection(containerRef, setReady, 0.1);

    return <section ref={containerRef} className={`mx-auto lg:w-[1024px] max-lg:px-3 transform ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-400 ease-linear`}>
        <h2 className="text-3xl lg:text-4xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6 lg:mb-9 self-start">Projects</h2>

        <p className="text-justify lg:text-lg tracking-wider font-medium font-content">
           A showcase of my work, divided into Fullstack Applications with real-world integrations and Frontend Mini Projects focusing on UI, usability, and performance.
        </p>

        <h3 className="text-2xl text-center lg:text-3xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-7 lg:mt-8 mb-8 lg:mb-8">Major Projects</h3>

        <div className="flex flex-col lg:flex-row lg:gap-8 gap-4 w-full" >
            {majorProjects.map((data, index) => {
                return <ProjectCard key={index} data={data} size={size} />
            })}
        </div>

        <h3 className="text-2xl text-center lg:text-3xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-10 mb-8 lg:mb-8">Frontend Only Mini Projects</h3>

        <div className="flex flex-col lg:flex-row lg:gap-8 gap-4 w-full" >
            {minProjects.map((data, index) => {
                return <ProjectCard key={index} data={data} size={size} />
            })}
        </div>

    </section>
}

export default Projects