import { useRef, useState } from "react"
import useIntersection from "../../../utils/IntersectionObserver"
import { CircleArrowRight, Cog } from "lucide-react";
import { Icon } from "@iconify/react";
import { majorProjects, minProjects } from "../../../utils/projectsData";

const ProjectCard = ({ data, size }) => {
    return <div className="flex flex-col items-center gap-0.5 lg:gap-1 lg:basis-[48%] basis-full backdrop-blur-md rounded-xl shadow-[0_0_15px_2px_rgba(3,165,252,0.6)]">
        <div id="projectPic" className="relative group w-full h-52 md:h-64 lg:h-72 overflow-hidden border-4 border-[#011932] rounded-xl">
            <img src={data.homeScreenPic} alt="Project home screen" className="object-cover w-full h-full  hover:scale-110 transition-all duration-300 ease-in-out" />
            <a href={data.liveLink} target="__blank" className="group projectTag -top-1 -left-1 tracking-wider rounded-br-xl flex items-center gap-1.5 lg:gap-2 lg:text-lg font-medium lg:font-semibold px-2 lg:px-3 py-0.5">
                <p>{data.underDevelopment ? "Live Demo" : "Live"}</p>
                <CircleArrowRight size={size === "small" ? 18 : 20} strokeWidth={2.5} className="transform rotate-[-45deg] group-hover:animate-pulse" />
            </a>
            <a href={data.githubLink} target="__blank" className="group projectTag z-10 tracking-wider -bottom-1 -right-1 rounded-tl-xl flex items-center gap-1.5 lg:gap-2 lg:text-lg font-medium lg:font-semibold px-2 lg:px-3 py-0.5">
                <p>github </p>
                <Icon icon="skill-icons:github-light" width={size === "small" ? 18 : 20} height={size === "small" ? 18 : 20} className="group-hover:animate-pulse" />
            </a>
            {
                data.underDevelopment && <div className="absolute left-1 bottom-1 flex items-center gap-1.5 lg:gap-2 px-1.5 lg:px-2 py-0.5 rounded-md bg-[linear-gradient(to_right,#2575FC,#6A11CB,#667EEA)]">
                    <Cog size={size === "small" ? 18 : 20} strokeWidth={2.5} className="animate-spin text-white" />
                    <p className="text-white max-lg:text-sm tracking-wide font-heading font-medium lg:font-semibold z-20">Under Development</p>
                </div>
            }
        </div>
        <div id="projectInfo" className="w-full p-2 flex flex-col gap-2 lg:gap-4">
            <p id="title" className="text-xl lg:text-2xl font-bold font-heading tracking-wide bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent leading-6">
                {data.title}
            </p>
            <div className="flex items-center gap-1.5 lg:gap-3 flex-wrap">
                {
                    data.techStack.map((data, index) => <Icon key={index} icon={data.icon} width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />)
                }
            </div>
            <div className="flex flex-wrap items-center gap-1 lg:gap-2 self-start">
                {data.badges.map((data, index) => <div key={index} className="px-1.5 py-0.5 lg:px-3 lg:py-1 rounded-md bg-[#9f0712]">
                    <p className="tracking-wider font-semibold text-white">{data}</p>
                </div>)}
            </div>

            <p className="text-justify font-medium leading-5 text-lg">
                {data.description}
            </p>

            <ul className="list-disc pl-4 lg:pl-5 mt-1 marker:text-blue-400">
                {data.featuredHeighLights.map((data, index) => {
                    return <li key={index} className="" dangerouslySetInnerHTML={{ __html: data }}></li>
                })}
            </ul>
        </div>
    </div>
}

const Projects = ({ size }) => {
    const [ready, setReady] = useState(false);
    const containerRef = useRef();

    useIntersection(containerRef, setReady, 0.2);

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