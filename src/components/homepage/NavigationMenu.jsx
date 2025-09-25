import { useState, useRef, useEffect } from "react";

const NavigationMenu = ({ currentSection }) => {
    const [navSliderStyle, setNavSliderStyle] = useState({ left: 0, width: 0 });
    const HomeNavLink = useRef(null);
    const ProjectsNavLink = useRef(null);
    const ContentNavLink = useRef(null);
    const ContactNavLink = useRef(null);

    useEffect(() => {
        if (HomeNavLink.current) {
            const width = HomeNavLink.current.offsetWidth;
            setNavSliderStyle({ left: 0, width });
        }
    }, []);

    useEffect(() => {
        switch (currentSection?.id) {
            case "about":
            case "hero":
                {
                    const link = HomeNavLink.current;
                    const left = link.offsetLeft;
                    const width = link.offsetWidth;
                    setNavSliderStyle({ left: 0, width });
                    break;
                }

            case "projects": {
                const link = ProjectsNavLink.current;
                const left = link.offsetLeft;
                const width = link.offsetWidth;
                setNavSliderStyle({ left, width });
                break;
            }

            case "content": {
                const link = ContentNavLink.current;
                const left = link.offsetLeft;
                const width = link.offsetWidth;
                setNavSliderStyle({ left, width });
                break;
            }

            case "contact": {
                const link = ContactNavLink.current;
                const left = link.offsetLeft;
                const width = link.offsetWidth;
                setNavSliderStyle({ left, width });
                break;
            }

            default:
                break;
        }
    }, [currentSection])

    const hoverHandler = (e) => {
        const link = e.target;

        const left = link.offsetLeft;
        const width = link.offsetWidth;

        setNavSliderStyle({ left, width });
    }

    return <header>
        <nav className="sticky top-10 flex items-center mx-auto text-lg lg:text-xl font-bold backdrop-blur-md bg-white/5 w-fit rounded-4xl overflow-hidden shadow-[0_0_15px_2px_rgba(3,165,252,0.6)] select-none font-heading z-50 mt-18 lg:mt-36 text-white">
            <a href="#about" ref={HomeNavLink} onMouseEnter={hoverHandler} className="hover:text-blue-300 px-2.5 lg:px-5 pl-3.5 lg:pl-6 py-1.5 lg:py-2">About</a>
            <a href="#projects" ref={ProjectsNavLink} onMouseEnter={hoverHandler} className="hover:text-blue-300 px-2 lg:px-5 py-1.5 lg:py-2">Projects</a>
            <a href="#content" ref={ContentNavLink} onMouseEnter={hoverHandler} className="hover:text-blue-300 px-2 lg:px-5 py-1.5 lg:py-2">Tutorials</a>
            <a href="#contact" ref={ContactNavLink} onMouseEnter={hoverHandler} className="hover:text-blue-300 px-2 lg:px-5 pr-3.5 lg:pr-6 py-1.5 lg:py-2">Contact</a>
            <span className={`absolute h-full bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(9,9,121,1)_35%,rgba(0,212,255,0.5)_100%)] rounded-[1.3rem] lg:rounded-3xl -z-10 transition-all duration-300 ease-linear`} style={{
                left: navSliderStyle.left,
                width: navSliderStyle.width
            }}></span>
        </nav>
    </header>
}

export default NavigationMenu;