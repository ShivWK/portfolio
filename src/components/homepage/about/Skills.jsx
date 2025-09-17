import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { mainSkills, skillRowData } from "../../../utils/skillsData";
import useIntersection from "../../../utils/IntersectionObserver";

const SkillBadge1 = ({ icon, text, isSmall}) => {
    return <div className="rounded-xl flex items-center justify-center py-2 pb-1 px-2 lg:px-3 w-fit h-fit bg-[#03336698] border border-blue-400 shrink-0">
        <div className="flex flex-col gap-0.5 lg:gap-2 items-center">
            <Icon icon={icon} width={isSmall ? 35 : 45} height={isSmall ? 35 : 55} />
            <span className="text-gray-100 font-bold font-heading tracking-wide text-xs lg:text-sm">{text}</span>
        </div>
    </div>
}

const SkillBadge2 = ({ text, icon, bgColor = "#ff5200", isSmall }) => {
    return <div className="flex items-center gap-1 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-md" style={{ background: bgColor }}>
        <Icon icon={icon} width={isSmall ? 25 : 30} height={isSmall ? 25 : 30} />
        <p className="text-sm text-gray-100 font-semibold font-content">{text}</p>
    </div>
}

const Skills = ({ isSmall }) => {
    const [scrollRow, setScrollRow] = useState(true);
    const [ready, setReady] = useState(false);
    const rowRef = useRef(null);
    const mainSkillRef = useRef(null);

    useIntersection(mainSkillRef, setReady, 0.2);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            setScrollRow(entries[0].isIntersecting)
        }, { root: null, threshold: 0.1 });

        const scrollHandler = () => {
            if (scrollRow) rowRef.current.scrollLeft = window.scrollY * (isSmall ? 0.3 : 0.6);
        }

        if (rowRef.current) {
            observer.observe(rowRef.current);
        }

        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [scrollRow])

    return <div>
        <div className="mx-auto lg:max-w-[1024px] max-lg:px-3">
            <h3 className="text-2xl lg:text-3xl w-fit font-bold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Skills</h3>
        </div>

        <div ref={rowRef} id="skillsRow" className="w-full my-6 lg:my-7 px-1 flex items-center gap-4 lg:gap-6 overflow-auto hide-scrollbar">
            {skillRowData.map((icon, index) => <SkillBadge1 key={index} icon={icon.icon} text={icon.text} isSmall={isSmall} />)}
        </div>

        <div ref={mainSkillRef} className={`lg:max-w-[1024px] max-lg:px-3 mx-auto my-10 transform ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-400 ease-linear`}>
            {Object.entries(mainSkills).map((data, index) => {
                return <div key={index} className={`${data[0] === "coreSkills" ? "lg:mb-6 lg:-mt-1 mb-4 -mt-4" : "lg:my-8 my-6"}`}>
                    <h4 className="w-fit lg:text-2xl text-xl font-bold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{data[1][0]}</h4>
                    <div className="flex items-center lg:gap-3 gap-2 flex-wrap my-2">
                        {
                            data[1].slice(1).map((data, index) => <SkillBadge2 key={index} icon={data.icon} text={data.text} bgColor={data.bgColor} isSmall={isSmall} />)
                        }
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Skills;