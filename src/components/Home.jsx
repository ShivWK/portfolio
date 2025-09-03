import { useState, useEffect, useRef } from "react";
import HeroSection from "./backgrounds/HeroSection";

const Home = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const lastClientHeight = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentClientHeight = window.scrollY;

            if (lastClientHeight.current < currentClientHeight) {
                //scrolled down
                setScrollOffset(-10);
            } else {
                // SCROLLED UP
                setScrollOffset(10);
            }
            lastClientHeight.current = currentClientHeight;
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <main>
        <HeroSection scrollOffset={scrollOffset} />
        <section id="body">

        </section>
    </main>
}

export default Home;