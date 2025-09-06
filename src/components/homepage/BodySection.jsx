import NavigationMenu from "./NavigationMenu";
import About from "./About";

const BodySection = () => {

    return <section id="body" className="relative flex flex-col gap-14 lg:gap-28 -top-[29rem] lg:-top-[24rem]  text-gray-300 animate-bodyFadeInSm pb-0 lg:animate-bodyFadeInLg" >
        <NavigationMenu />

        <div className="mx-auto lg:w-[1024px] max-lg:px-3">
            <About />
        </div>
    </section>
}

export default BodySection;