import { useState, useRef, useEffect } from "react";

const NavigationMenu = () => {
    const [navSliderStyle, setNavSliderStyle] = useState({ left: 0, width: 0 });
    const firstNavLink = useRef(null);

    useEffect(() => {
        if (firstNavLink.current) {
            const width = firstNavLink.current.offsetWidth;
            setNavSliderStyle({ left: 0, width });
        }
    }, [])

    const hoverHandler = (e) => {
        const link = e.target;

        const left = link.offsetLeft;
        const width = link.offsetWidth;

        setNavSliderStyle({ left, width });
    }

    return <nav className="sticky top-5 flex items-center mx-auto text-lg lg:text-2xl font-semibold backdrop-blur-md bg-white/5 w-fit rounded-4xl overflow-hidden shadow-[0_0_20px_5px_rgba(0,15,50,0.6)]">
        <a href="#hero" ref={firstNavLink} onMouseEnter={hoverHandler} className="hover:text-blue-300 px-3 lg:px-5 pl-4 lg:pl-6 py-1.5 lg;py-2">About</a>
        <a href="#about" onMouseEnter={hoverHandler} className="hover:text-blue-300 px-3 lg:px-5 py-1.5 lg;py-2">Projects</a>
        <a href="#projects" onMouseEnter={hoverHandler} className="hover:text-blue-300 px-3 lg:px-5 py-1.5 lg;py-2">Content</a>
        <a href="#contact" onMouseEnter={hoverHandler} className="hover:text-blue-300 px-3 lg:px-5 pr-4 lg:pr-6 py-1.5 lg;py-2">Contact</a>
        <span className={`absolute h-full bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(9,9,121,1)_35%,rgba(0,212,255,0.5)_100%)] rounded-3xl -z-10 transition-all duration-200 ease-linear`} style={{
            left: navSliderStyle.left,
            width: navSliderStyle.width
        }}></span>
    </nav>
}

export default NavigationMenu;