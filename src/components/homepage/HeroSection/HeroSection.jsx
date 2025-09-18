import { useState, useRef, useEffect, memo } from "react";
import { Download } from "lucide-react";
import SocialLinks from "./SocialLinks";

const HeroSection = memo(() => {
    const [particles, setParticles] = useState(170);
    const [ready, setReady] = useState(false);
    const isSmall = window.innerWidth <= 768;

    const canvasRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        if (isSmall) {
            setParticles(170);
        } else {
            setParticles(320);
        }
    }, [isSmall])

    useEffect(() => {
        const startCanvas = () => {
            if (heroRef.current && canvasRef.current) {
                const canvas = canvasRef.current;
                const rect = heroRef.current;

                const ctx = canvas.getContext("2d");

                canvas.width = rect.offsetWidth;
                canvas.height = rect.offsetHeight;

                let particleArray = [];

                window.addEventListener("mousemove", (event) => {
                    mouse.x = event.x;
                    mouse.y = event.y;
                });

                window.addEventListener("mouseout", () => {
                    mouse.x = undefined;
                    mouse.y = undefined;
                });

                let mouse = {
                    x: null,
                    y: null,
                    radius: (canvas.height / 80) * (canvas.width / 80),
                }

                class Particle {
                    constructor(x, y, directionX, directionY, size, color) {
                        this.x = x;
                        this.y = y;
                        this.directionX = directionX;
                        this.directionY = directionY;
                        this.size = size;
                        this.color = color;
                    }

                    draw() {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                        ctx.fillStyle = this.color;
                        ctx.fill();
                    }

                    update() {
                        // boundary check
                        if (this.x > canvas.width || this.x < 0) {
                            this.directionX = -this.directionX;
                        }

                        if (this.y > canvas.height || this.y < 0) {
                            this.directionY = -this.directionY;
                        }

                        // mouse collision check
                        let dx = mouse.x - this.x;
                        let dy = mouse.y - this.y;

                        let distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < mouse.radius + this.size && !isSmall) {
                            // mouse and particle collides

                            if (mouse.x < this.x && this.x < canvas.width - this.size + 10) {
                                //check if particle is in right of the mouse so move it in right
                                this.x += 3;
                            }

                            if (mouse.x > this.x && this.x > this.size * 10) {
                                this.x -= 3;
                            }

                            if (mouse.y < this.y && this.y < canvas.height - this.size + 10) {
                                this.y += 3;
                            }

                            if (mouse.y > this.y && this.y > this.size * 10) {
                                this.y -= 3;
                            }
                        }

                        // if it is not colliding then move it by its direction value;
                        this.x += this.directionX;
                        this.y += this.directionY;
                    }
                }

                function init() {
                    let numberOfParticles = particles;

                    for (let i = 0; i < numberOfParticles; i++) {
                        let size = (Math.random() * (isSmall ? 2.5 : 4)) + 1;
                        let x = (Math.random() * ((canvas.width - (size * 2)) - (size * 2)) + (size * 2));
                        let y = (Math.random() * ((canvas.height - (size * 2)) - (size * 2)) + (size * 2));
                        let directionX = (Math.random() * 1) - (isSmall ? 0.6 : 0.5);
                        let directionY = (Math.random() * 1) - (isSmall ? 0.6 : 0.5);
                        let color = "#0099ffff";

                        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
                    }
                }
                init()

                function connect() {
                    for (let a = 0; a < particleArray.length; a++) {
                        for (let b = 0; b < particleArray.length; b++) {
                            let dx = particleArray[a].x - particleArray[b].x;
                            let dy = particleArray[a].y - particleArray[b].y;
                            let distance = dx * dx + dy * dy;

                            if (distance < (canvas.width / 10) * (canvas.height) / 10) {
                                ctx.strokeStyle = "rgba(24, 117, 179, 0.49)",
                                ctx.lineWidth = isSmall ? 0.6 : 1;
                                ctx.beginPath();
                                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                                ctx.stroke()
                            }
                        }
                    }
                }

                function particleHandler(particleArray) {
                    for (let i = 0; i < particleArray.length; i++) {
                        particleArray[i].update();
                        particleArray[i].draw();
                    }
                }

                function animate() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particleHandler(particleArray);
                    connect()
                    requestAnimationFrame(animate);
                }

                const resizeHandler = () => {
                    if (!canvasRef.current) return;



                    if (window.innerWidth <= 768) {
                        setParticles(170);
                    } else {
                        setParticles(320);
                    }
                }

                requestAnimationFrame(animate);
                window.addEventListener("resize", resizeHandler);

                return () => window.removeEventListener("resize", resizeHandler);
            }
        }

        const schedule = window.requestIdleCallback || ((cb) => setTimeout(cd, 200));
        schedule(() => {
            startCanvas();
            setReady(true);
        }, { timeout: 1000 })
    }, [particles])

    return <section ref={heroRef} id="hero" className="relative w-full h-[29rem] lg:h-[27rem] animate-waveSm lg:animate-waveLg bg-[linear-gradient(135deg,#0d0d0f,#040427,#0a294e)] z-30 pt-1">
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-lg:gap-3 lg:flex-row items-center justify-center lg:justify-between -mt-12 lg:-mt-8 w-[85%] lg:w-[63%] z-50 ">
            <div className="lg:order-1 order-2 text-white flex flex-col gap-1 lg:gap-2 justify-center items-center basis-[60%] lg:basis-[75%] font-heading">
                <p className="text-2xl flex items-center lg:text-3xl font-semibold tracking-wider leading-5 lg:leading-6 text-center">Shivendra Dwivedi
                    <span className="hidden lg:inline">︱</span>
                    <span className="hidden lg:inline">Web Developer</span>
                </p>
                <p className="lg:hidden text-lg font-semibold">Hi, I’m Web Developer</p>
                <p className="text-xl hidden lg:block">I build modern, fast, and user-focused web applications.</p>

                <p className="font-medium lg:text-xl lg:hidden leading-5 tracking-wide text-center">I create sleek, fast, user-centric web applications.</p>

                <button className="group relative flex items-center gap-1.5 lg:gap-2.5 text-white bg-blue-500 rounded-xl py-1.5 px-3.5 lg:px-5 lg:py-1.5 font-semibold w-fit cursor-pointer overflow-hidden active:scale-95 transition-all duration-200 ease-linear max-lg:mb-2 max-lg:mt-3">
                    <span className={`absolute top-0 left-0 h-full w-0 group-hover:w-full max-lg:group-active:w-full bg-blue-700/70 transition-all duration-150 ease-linear`}></span>
                    <span className="tracking-wide z-10 lg:text-lg">Resume</span>
                    <Download size={18} strokeWidth={3} className="z-10 group-hover:animate-pulse" />
                </button>
                <SocialLinks />
            </div>
            <div className="rounded-full lg:order-2 order-1 bg-[url(/images/me4.jpeg)] bg-[position:center] h-32 lg:h-[12rem] w-32 lg:w-[12rem] bg-cover overflow-hidden p-4 border-2 border-blue-500 shadow-[0_0_15px_2px_rgba(3,165,252,0.7)]"></div>
        </div>
        <canvas ref={canvasRef} className={`-z-30 ${ready && "animate-canvasFadeIn"}`} ></canvas>
    </section>
})

export default HeroSection;