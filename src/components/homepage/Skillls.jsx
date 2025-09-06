import { useState, useEffect, useRef } from "react";
import { skillRowData } from "../../utils/data"
import { Icon } from "@iconify/react";

const SkillBadge1 = ({ icon, text, size }) => {
    return <div className="rounded-xl flex items-center justify-center py-2 pb-1 px-2 lg:px-3 w-fit h-fit bg-[#03336698] border border-blue-400 shrink-0">
        <div className="flex flex-col gap-0.5 lg:gap-2 items-center">
            <Icon icon={icon} width={size === "small" ? 30 : 45} height={size === "small" ? 30 : 55} />
            <span className="text-gray-100 font-bold font-heading tracking-wide text-xs lg:text-sm">{text}</span>
        </div>
    </div>
}

const SkillBadge2 = ({ text, icon, bgColor }) => {
    return <div className="flex items-center gap-2" style={{ backgroundColor: bgColor }}>
        <Icon icon={icon} width="30" height="30" />
        <p className="text-sm text-gray-300">{text}</p>
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

        if (rowRef.current) {
            rowRef.current.scrollTo({
                left: 500,
                behavior: "smooth"
            })
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
            if (scrollRow) rowRef.current.scrollLeft = window.scrollY * 0.6;
        }

        if (rowRef.current) {
            observer.observe(rowRef.current);
        }

        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [scrollRow])

    return <div className="-my-15 lg:-my-20">
        <div className="mx-auto lg:w-[1024px] max-lg:px-3">
            <h3 className="text-2xl lg:text-3xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Skills</h3>
        </div>


        <div ref={rowRef} id="skillsRow" className="w-full my-6 lg:my-7 flex items-center gap-4 lg:gap-6 overflow-auto hide-scrollbar">
            {skillRowData.map((icon, index) => <SkillBadge1 key={index} icon={icon.icon} text={icon.text} size={size} />)}
        </div>
        <div className="lg:w-[1024px]">
        </div>
    </div>
}

export default Skills;