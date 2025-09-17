import { Repeat, Heart } from "lucide-react";

const TutorialCard = ({ cardData, index, show }) => {
    const isSmall = window.innerWidth <= 768;

    const postClickHandler = (link) => {
        window.open(link, "_blank");
    }

    return (
        <div id={index} onClick={() => postClickHandler(cardData.link)} className={`absolute rounded-xl overflow-hidden lg:w-[100%] w-full h-full shrink-0 ${show ? "opacity-100 z-20" : "opacity-0 z-0"} transition-all duration-[0.9s] ease-linear]`}>
            <img src={`/tutorials/${cardData.pic}`} alt="Axios VS Fetch tutorial" className="h-full w-full cursor-pointer" />
            <div className="absolute bottom-0 left-0 w-full bg-black/80 rounded-tl-xl p-3">
                <div className="absolute -top-7 md:-top-8 right-0 px-2 py-1 font-medium tracking-wide bg-black/80 rounded-t-xl flex items-center gap-2 max-md:text-sm">
                    <i className="fa-brands fa-linkedin text-xl  text-[rgb(41,140,240)] transform hover:scale-110 transition-all ease-linear cursor-pointer"
                    ></i>
                    <Heart fill="red" size={isSmall ? 18 : 20} className="text-red-600" />
                    <span>{cardData.likes}</span>
                    <Repeat size={isSmall ? 18 : 20} className="text-[#53eafd]" />
                    <span>{cardData.reposts}</span>
                </div>
                <img src={`/testimonials/${cardData.review}`} alt="testimonal" className="rounded-md" />
            </div>
        </div>
    )
}

export default TutorialCard