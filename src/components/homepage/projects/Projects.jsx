import { useRef, useState } from "react"
import useIntersection from "../../../utils/IntersectionObserver"
import { CircleArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";

const Projects = ({ size }) => {
    const [ready, setReady] = useState(false);
    const containerRef = useRef();

    useIntersection(containerRef, setReady);

    return <section id="projects" ref={containerRef} className={`mx-auto lg:w-[1024px] max-lg:px-3 transform ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-400 ease-linear scroll-mt-30`}>
        <h2 className="text-3xl lg:text-4xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 lg:mb-8 self-start">Projects</h2>

        <div className="flex flex-col lg:flex-row lg:gap-8 gap-4 w-full lg:h-[30rem]" >
            <div className="flex flex-col items-center gap-2 lg:basis-[48%] basis-full backdrop-blur-md rounded-xl shadow-[0_0_15px_2px_rgba(3,165,252,0.6)]">
                <div id="projectPic" className="relative group h-52 lg:h-72 overflow-hidden border-4 border-[#011932] rounded-xl">
                    <img src="/images/zestyeats.png" alt="Project home screen" className="object-cover w-full h-full  hover:scale-110 transition-all duration-300 ease-in-out" />
                    <a href="https://zestyeats.shivendra.site/" target="__blank" className="group projectTag -top-1 -left-1 tracking-wider rounded-br-xl flex items-center gap-2 lg:text-lg font-medium lg:font-semibold px-2 lg:px-3 py-0.5">
                        <p>Live</p>
                        <CircleArrowRight size={size === "small" ? 18 : 20} strokeWidth={2.5} className="transform rotate-[-45deg] group-hover:animate-pulse" />
                    </a>
                    <a href="https://github.com/ShivWK/ZestyEats.git" target="__blank" className="group projectTag z-10 tracking-wider -bottom-1 -right-1 rounded-tl-xl flex items-center gap-2 lg:text-lg font-medium lg:font-semibold px-2 lg:px-3 py-0.5">
                        <p>github </p>
                        <Icon icon="skill-icons:github-light" width={size === "small" ? 18 : 20} height={size === "small" ? 18 : 20} className="group-hover:animate-pulse" />
                    </a>
                </div>
                <div id="projectInfo" className="w-full px-1 flex flex-col gap-0.5 lg:gap-2">
                    <p id="title" className="text-xl lg:text-2xl font-bold font-heading tracking-wide bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent leading-6">ZestyEats – Online Food Delivery App</p>
                    <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
                        <Icon icon="vscode-icons:file-type-reactjs" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="skill-icons:javascript" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="devicon:tailwindcss" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="devicon:reactrouter" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="skill-icons:redux" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="logos:nodejs-icon" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="skill-icons:expressjs-light" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="skill-icons:mongodb" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="devicon-plain:oauth" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                        <Icon icon="logos:recaptcha" width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} className="group-hover:animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Projects