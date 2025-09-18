import { useState } from "react";

const SocialLinks = () => {
    const [hovered, setHovered] = useState(false);
    const [color, setColor] = useState("rgba(0,0,0,1)");

    const hoverHandler = (color) => {
        if (window.innerWidth <= 768) return;

        setColor(color);
        setHovered(true);
    }

    const clickHandler = (color) => {
        if (window.innerWidth <= 768) {
            setColor(color);
            setHovered(true);
        }

        setTimeout(() => {
            setHovered(false);
        }, 300)
    }

    return (
        <div className="flex relative items-center gap-3 mt-1 lg:mt-1 overflow-hidden rounded-4xl bg-blue-950 px-4 py-1.5">
            <a
                href="https://www.linkedin.com/in/shivendra-dwivedi"
                className="hover:scale-[1.2] active:scale-95 hover:shadow-lg transition-all duration-100 ease-linear mt-1 z-20"
                target="__block"
            >
                <i
                    onMouseEnter={() => hoverHandler("rgba(41,140,240)")}
                    onMouseOut={() => setHovered(false)}
                    onClick={() => clickHandler("rgba(41,140,240)")}
                    className="fa-brands fa-linkedin text-2xl lg:text-3xl text-[rgb(41,140,240)] hover:text-black"
                ></i>
            </a>
            <a
                href="https://github.com/ShivWK"
                className="hover:scale-[1.2] active:scale-95 hover:shadow-lg transition-all duration-100 ease-linear mt-1 z-20"
                target="__block"
            >
                <i
                    onMouseEnter={() => hoverHandler("#d1d5dc")}
                    onMouseOut={() => setHovered(false)}
                    onClick={() => clickHandler("#d1d5dc")}
                    className="fa-brands fa-square-github text-2xl lg:text-3xl text-gray-300 hover:text-black"
                ></i>
            </a>
            <a
                href="https://x.com/Shivendrawk"
                className="hover:scale-[1.2] active:scale-95 hover:shadow-lg transition-all duration-100 ease-linear mt-1 z-20"
                target="__block"
            >
                <i
                    onMouseEnter={() => hoverHandler("#000000")}
                    onMouseOut={() => setHovered(false)}
                    onClick={() => clickHandler("#000000")}
                    className="fa-brands fa-square-x-twitter text-2xl lg:text-3xl text-black hover:text-gray-300"
                ></i>
            </a>
            <a
                href="https://instagram.com/shivendrawk"
                className="hover:scale-[1.2] active:scale-95 hover:shadow-lg transition-all duration-100 ease-linear mt-1 z-20"
                target="__block"
            >
                <i
                    onMouseEnter={() => hoverHandler("linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)")}
                    onMouseOut={() => setHovered(false)}
                    onClick={() => clickHandler("linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)")}
                    className="fa-brands fa-instagram text-2xl lg:text-3xl text-[#e13030] hover:text-black"
                ></i>
            </a>
            <a
                href="mailto:shivendra@shivendra.site"
                className="hover:scale-[1.2] active:scale-95 hover:shadow-lg transition-all duration-100 ease-linear mt-1 z-20"
            >
                <i
                    onMouseEnter={() => hoverHandler("#d93025")}
                    onMouseOut={() => setHovered(false)}
                    onClick={() => clickHandler("#d93025")}
                    className="fa-solid fa-envelope text-2xl lg:text-3xl text-[#d93025] hover:text-black"
                ></i>
            </a>

            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full z-10 ${hovered ? "[clip-path:circle(100%)]" : "[clip-path:circle(0%)]"} transition-all duration-300 ease-linear`}
                style={{ background: color }}
            ></span>
        </div>
    )
}

export default SocialLinks