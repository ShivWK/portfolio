import { Repeat, Heart } from "lucide-react";

const TutorialCard = ({ cardData }) => {
   const isSmall = window.innerWidth <= 768;

    return (
        <a href={cardData.link} target="__blank" className="relative rounded-xl overflow-hidden lg:w-[40%] w-full h-[27rem] lg:h-[31rem]">
            <img src={`/tutorials/${cardData.pic}`} alt="Axios VS Fetch tutorial" className="h-full w-full cursor-pointer" />
            <div className="absolute bottom-0 left-0 w-full bg-black/80 z-40 rounded-tl-xl p-3">
                <div className="absolute -top-7 md:-top-8 right-0 px-2 py-1 font-medium tracking-wide bg-black/80 rounded-t-xl flex items-center gap-2 max-md:text-sm">
                    <i className="fa-brands fa-linkedin text-xl  text-[rgb(41,140,240)] hover:text-black"
                    ></i>
                    <Heart fill="red" size={isSmall ? 18 : 20} className="text-red-600" />
                    <span>{cardData.likes}</span>
                    <Repeat size={isSmall ? 18 : 20} className="text-[#53eafd]" />
                    <span>{cardData.reposts}</span>
                </div>
                <img src={`/testimonials/${cardData.review}`} alt="testimonal" className="rounded-md" />
            </div>
        </a>
    )
}

export default TutorialCard