import { CircleArrowRight, Cog, Hourglass, CircleDot } from "lucide-react";
import { Icon } from "@iconify/react";

const ProjectCard = ({ data, isSmall }) => {
    return <div className="flex flex-col items-center gap-0.5 lg:gap-1 lg:basis-[48%] basis-full backdrop-blur-md rounded-xl shadow-[0_0_15px_2px_rgba(3,165,252,0.6)] text-white shrink-0">
        <div id="projectPic" className="relative group w-full h-52 md:h-64 lg:h-72 overflow-hidden border-4 border-[#011932] rounded-xl">
            <img src={data.homeScreenPic} alt="Project home screen" className="object-cover w-full h-full  hover:scale-110 transition-all duration-300 ease-in-out" />

            {data.linkAvailable
                ? <a href={data.liveLink} target="__blank" className="group projectTag -top-1 -left-1 tracking-wider rounded-br-xl flex items-center gap-1.5 lg:gap-2 lg:text-lg font-medium lg:font-semibold px-2 lg:px-3 py-0.5">
                    <p>{data.underDevelopment ? "Live Demo" : "Live"}</p>
                    <CircleArrowRight size={isSmall ? 18 : 20} strokeWidth={2.5} className="transform rotate-[-45deg] group-hover:animate-pulse" />
                </a>
                : <div target="__blank" className="group projectTag -top-1 -left-1 tracking-wider rounded-br-xl flex items-center gap-1.5 lg:gap-2 lg:text-lg font-medium lg:font-semibold px-2 lg:px-3 py-0.5">
                    <p>{data.alternateLinkText}</p>
                    {data.alternateLinkText === "Coming Soon"
                        ? <Hourglass size={isSmall ? 18 : 20} strokeWidth={2.5} className="group-hover:animate-pulse" />
                        : <CircleDot fill="red" size={isSmall ? 18 : 20} strokeWidth={2.5} className="group-hover:animate-pulse" />}
                </div>
            }
            <a href={data.githubLink} target="__blank" className="group projectTag z-10 tracking-wider -bottom-1 -right-1 rounded-tl-xl flex items-center gap-1.5 lg:gap-2 lg:text-lg font-medium lg:font-semibold px-2 lg:px-3 py-0.5">
                <p>github </p>
                <Icon icon="skill-icons:github-light" width={isSmall ? 18 : 20} height={isSmall ? 18 : 20} className="group-hover:animate-pulse" />
            </a>
            {
                data.underDevelopment && <div className="absolute left-1 bottom-1.5 flex items-center gap-1.5 lg:gap-2 px-1.5 lg:px-2 py-0.5 rounded-md bg-[linear-gradient(to_right,#2575FC,#6A11CB,#667EEA)]">
                    <Cog size={isSmall ? 18 : 20} strokeWidth={2.5} className="animate-spin text-white" />
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
                    data.techStack.map((data, index) => <Icon key={index} icon={data.icon} width={isSmall ? 25 : 30} height={isSmall ? 25 : 30} className="group-hover:animate-pulse" />)
                }
            </div>
            <div className="flex flex-wrap items-center gap-1 lg:gap-2 self-start">
                {data.badges.map((data, index) => <div key={index} className="px-1.5 py-0.5 lg:px-3 lg:py-1 rounded-md bg-[#9f0712]">
                    <p className="tracking-wider font-semibold text-white">{data}</p>
                </div>)}
            </div>

            <p className="text-justify lg:font-medium leading-5 lg:text-lg">
                {data.description}
            </p>

            <ul className="list-disc pl-4 lg:pl-5 mt-1 marker:text-blue-400">
                {data.featuredHeighLights.map((data, index) => {
                    return <li key={index} className="text-white" dangerouslySetInnerHTML={{ __html: data }}></li>
                })}
            </ul>
        </div>
    </div>
}

export default ProjectCard;