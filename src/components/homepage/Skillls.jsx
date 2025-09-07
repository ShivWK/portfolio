import { useState, useEffect, useRef } from "react";
import { skillRowData, mainSkills } from "../../utils/data"
import { Icon } from "@iconify/react";

const SkillBadge1 = ({ icon, text, size }) => {
    return <div className="rounded-xl flex items-center justify-center py-2 pb-1 px-2 lg:px-3 w-fit h-fit bg-[#03336698] border border-blue-400 shrink-0">
        <div className="flex flex-col gap-0.5 lg:gap-2 items-center">
            <Icon icon={icon} width={size === "small" ? 35 : 45} height={size === "small" ? 35 : 55} />
            <span className="text-gray-100 font-bold font-heading tracking-wide text-xs lg:text-sm">{text}</span>
        </div>
    </div>
}

const SkillBadge2 = ({ text, icon, bgColor = "#ff5200", size }) => {
    return <div className="flex items-center gap-1 px-1 lg:px-2 py-0.5 lg:py-1 rounded-md" style={{ background: bgColor }}>
        <Icon icon={icon} width={size === "small" ? 25 : 30} height={size === "small" ? 25 : 30} />
        <p className="text-sm text-gray-100 font-semibold font-content">{text}</p>
    </div>
}

const Skills = () => {
    const [size, setSize] = useState("");
    const [scrollRow, setScrollRow] = useState(true);
    const rowRef = useRef(null);

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

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            setScrollRow(entries[0].isIntersecting)
        }, { root: null, threshold: 0.1 });

        const scrollHandler = () => {
            if (scrollRow) rowRef.current.scrollLeft = window.scrollY * (size === "small" ? 0.3 : 0.6);
        }

        if (rowRef.current) {
            observer.observe(rowRef.current);
        }

        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [scrollRow])

    return <div className="-my-15 lg:-my-20">
        <div className="mx-auto lg:max-w-[1024px] max-lg:px-3">
            <h3 className="text-2xl lg:text-3xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Skills</h3>
        </div>


        <div ref={rowRef} id="skillsRow" className="w-full my-6 lg:my-7 px-1 flex items-center gap-4 lg:gap-6 overflow-auto hide-scrollbar">
            {skillRowData.map((icon, index) => <SkillBadge1 key={index} icon={icon.icon} text={icon.text} size={size} />)}
        </div>

        <div className="lg:max-w-[1024px] max-lg:px-3 mx-auto my-10">
            {
                Object.entries(mainSkills).map((data, index) => {
                   return <div key={index} className={`${data[0] === "coreSkills" ? "lg:mb-6 lg:-mt-3 mb-3 -mt-4" : "lg:my-6 my-4"}`}>
                        <h4 className="w-fit lg:text-2xl text-xl font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{data[1][0]}</h4>
                        <div className="flex items-center lg:gap-3 gap-2 flex-wrap my-2">
                            {
                                data[1].slice(1).map((data, index) => <SkillBadge2 key={index} icon={data.icon} text={data.text} bgColor={data.bgColor} size={size} />)
                            }
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}

export default Skills;