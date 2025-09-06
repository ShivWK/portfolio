import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const skillRowData = [
    {
        icon: "devicon:html5",
        text: "HTML5"
    },

    {
        icon: "devicon:css3",
        text: "CSS3"
    },

    {
        icon: "skill-icons:javascript",
        text: "JavaScript"
    },

    {
        icon: "skill-icons:typescript",
        text: "TypeScript"
    },

    {
        icon: "vscode-icons:file-type-reactjs",
        text: "ReactJS"
    },

    {
        icon: "skill-icons:redux",
        text: "Redux"
    },

    {
        icon: "devicon:tailwindcss",
        text: "TailwindCSS"
    },

    {
        icon: "devicon:bootstrap",
        text: "BoothStrap"
    },

    {
        icon: "devicon:reactrouter",
        text: "React Router"
    },

    {
        icon: "tabler:brand-framer-motion",
        text: "Framer Motion"
    },

    {
        icon: "devicon:materialui",
        text: "Material UI"
    },

    {
        icon: "logos:jwt-icon",
        text: "JWT"
    },

    {
        icon: "devicon:oauth",
        text: "OAuth"
    },

    {
        icon: "logos:firebase-icon",
        text: "Firebase"
    },

    {
        icon: "logos:recaptcha",
        text: "reCaptcha"
    },

    {
        icon: "simple-icons:reacthookform",
        text: "React Hook Form"
    },

    {
        icon: "logos:nodejs-icon",
        text: "NodeJS"
    },

    {
        icon: "skill-icons:expressjs-light",
        text: "ExpressJS"
    },


    {
        icon: "skill-icons:mongodb",
        text: "MongoDB"
    },


    {
        icon: "skill-icons:git",
        text: "git"
    },


    {
        icon: "skill-icons:github-light",
        text: "github"
    },

    {
        icon: "devicon:canva",
        text: "Canva"
    },

       {
        icon: "devicon:oauth",
        text: "OAuth"
    },

     {
        icon: "skill-icons:netlify-light",
        text: "Netlify"
    },

     {
        icon: "simple-icons:render",
        text: "Render"
    },

     {
        icon: "skill-icons:postman",
        text: "Postman"
    },

     {
        icon: "skill-icons:java-light",
        text: "Java"
    },

     {
        icon: "skill-icons:git",
        text: "git"
    },

    {
        icon: "vscode-icons:file-type-cpp3",
        text: "C++"
    },
]


const SkillBadge1 = ({ icon, text, size }) => {
    return <div className="rounded-xl flex items-center justify-center py-2 pb-1 px-3 lg:px-4 w-fit h-fit bg-[#03336698] border border-blue-400">
        <div className="flex flex-col gap-2 items-center">
            <Icon icon={icon} width={size === "small" ? 40 : 50} height={size === "small" ? 40 : 50} />
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

const About = () => {
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
    }, [])

    return <section id="about" className="scroll-mt-30 scroll-smooth pb-5">
        <div>
            <h2 className="text-3xl lg:text-4xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">About</h2>

            <p className="text-justify my-4 lg:my-3 lg:text-lg tracking-wider font-medium font-content hidden lg:block">
                I’m Shivendra Dwivedi, a passionate Web Developer skilled in building modern, fast, and user-focused applications.
                With experience in React, Redux, JavaScript and TypeScript, I love turning ideas into clean, scalable solutions.
            </p>

            <p className="text-justify my-4 lg:my-3 lg:text-lg tracking-wider font-medium font-content hidden lg:block">
                Currently, I’m focused on frontend development roles where I can contribute to product-based companies, solve real-world problems, and keep growing my technical expertise.
            </p>

            <p className="text-justify my-3  sm:text-base tracking-wide font-medium font-content lg:hidden">
                I’m Shivendra Dwivedi, a Web Developer skilled in React, Redux, JavaScript, and TypeScript. I build modern, fast, and user-focused applications.
            </p>

            <p className="text-justify my-3  sm:text-base tracking-wide font-medium font-content lg:hidden">
                Currently focused on frontend roles where I can contribute to product-based companies and grow my expertise.
            </p>
        </div>

        <div className="my-10 lg:my-14">
            <h3 className="text-2xl lg:text-3xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Skills</h3>

            <div id="skillIconHeader" className="my-4 lg:my-6 flex items-center gap-4 lg:gap-6 flex-wrap">
                {
                    skillRowData.map((icon) => <SkillBadge1 icon={icon.icon} text={icon.text} size={size} />)
                }
            </div>
        </div>
    </section>
}

export default About;