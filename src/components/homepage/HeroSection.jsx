import { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";

const HeroSection = () => {
    const [particles, setParticles] = useState(200);
    const [hovered, setHovered] = useState(false);
    const [color, setColor] = useState("rgba(0,0,0,1)");
    const [ready, setReady] = useState(false);

    const isSmall = window.innerWidth <= 768;
    const canvasRef = useRef(null);
    const heroRef = useRef(null);

    // const setupCanvas = (canvas) => {
    //     const canvas = canvasRef.current;
    //     const rect = canvas.getBoundingClientRect();
    //     const dpr = window.devicePixelRatio || 1;

    //     canvas.width = rect.width * dpr;
    //     canvas.height = rect.height * dpr;

    //     canvas.style.width = `${rect.width}px`;
    //     canvas.style.height = `${rect.height}px`;

    //     // canvas.width = canvasRef.current.offsetWidth * dpr;
    //     // canvas.height = canvasRef.current.offsetHeight * dpr;

    //     const ctx = canvas.getContext("2d");
    //     ctx.scale(dpr, dpr);

    // }

    useEffect(() => {
        const small = window.innerWidth <= 768;

        if (small) {
            setParticles(200);
        } else {
            setParticles(320);
        }
    }, [])

    useEffect(() => {
        const startCanvas = () => {
            if (heroRef.current && canvasRef.current) {
                const canvas = canvasRef.current;
                const rect = canvas.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;

                const ctx = canvas.getContext("2d");
                ctx.scale(dpr, dpr);

                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;

                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;

                // canvas.width = canvasRef.current.offsetWidth * dpr;
                // canvas.height = canvasRef.current.offsetHeight * dpr;

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
                        let size = (Math.random() * 3) + 1;
                        let x = (Math.random() * ((canvas.width - (size * 2)) - (size * 2)) + (size * 2));
                        let y = (Math.random() * ((canvas.height - (size * 2)) - (size * 2)) + (size * 2));
                        let directionX = (Math.random() * 1) - 0.5;
                        let directionY = (Math.random() * 1) - 0.5;
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

                            if (distance < (canvas.width / 11) * (canvas.height) / 11) {
                                ctx.strokeStyle = "rgba(24, 117, 179, 0.49)",
                                    ctx.lineWidth = 1;
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
                        setParticles(200);
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

    return <section ref={heroRef} id="hero" className="relative w-full h-[29rem] lg:h-96 animate-waveSm lg:animate-waveLg bg-[linear-gradient(135deg,#0d0d0f,#040427,#0a294e)] z-30">
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col max-lg:gap-3 lg:flex-row items-center justify-center lg:justify-between -mt-12 lg:-mt-8 w-[85%] lg:w-[63%] z-50 ">
            <div className="lg:order-1 order-2 text-white flex flex-col gap-1 lg:gap-2 justify-center items-center basis-[60%] lg:basis-[75%] font-heading">
                <p className="text-2xl flex items-center lg:text-3xl font-semibold tracking-wider leading-5 lg:leading-6 text-center">Shivendra Dwivedi
                    <span className="hidden lg:inline">︱</span>
                    <span className="hidden lg:inline">Frontend Developer</span>
                </p>
                <p className="lg:hidden text-lg font-semibold">Hi, I’m Frontend Web Developer </p>
                <p className="text-xl hidden lg:block">I build modern, fast, and user-focused web applications</p>

                <p className=" lg:text-xl lg:hidden leading-4 tracking-wide text-center">I create sleek, fast, user-centric web applications.</p>

                <button className="group relative flex items-center gap-1.5 lg:gap-2.5 text-white bg-blue-500 rounded-xl py-1.5 px-3.5 lg:px-5 lg:py-1.5 font-semibold w-fit cursor-pointer overflow-hidden active:scale-95 transition-all duration-200 ease-linear max-lg:mb-2 max-lg:mt-3">
                    <span className={`absolute top-0 left-0 h-full w-0 group-hover:w-full max-lg:group-active:w-full bg-blue-700/70 transition-all duration-150 ease-linear`}></span>
                    <span className="tracking-wide z-10 lg:text-lg">Resume</span>
                    <Download size={18} strokeWidth={3} className="z-10 group-hover:animate-pulse" />
                </button>

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
                            className="fa-brands fa-linkedin text-2xl text-[rgb(41,140,240)] hover:text-black"
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
                            className="fa-brands fa-square-github text-2xl text-gray-300 hover:text-black"
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
                            className="fa-brands fa-square-x-twitter text-2xl text-black hover:text-gray-300"
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
                            className="fa-brands fa-instagram text-2xl text-[#e13030] hover:text-black"
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
                            className="fa-solid fa-envelope text-2xl text-[#d93025] hover:text-black"
                        ></i>
                    </a>

                    <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full z-10 ${hovered ? "[clip-path:circle(100%)]" : "[clip-path:circle(0%)]"} transition-all duration-200 ease-linear`}
                        style={{ background: color }}
                    ></span>
                </div>
            </div>
            <div className="rounded-full lg:order-2 order-1 bg-[url(/images/me4.jpeg)] bg-[position:center] h-32 lg:h-44 w-32 lg:w-44 bg-cover overflow-hidden p-4 border-2 border-blue-500 shadow-[0_0_15px_2px_rgba(3,165,252,0.7)]"></div>
        </div>
        <canvas ref={canvasRef} className={`-z-30 w-full h-full ${ready && "animate-canvasFadeIn"}`} ></canvas>
    </section>
}

export default HeroSection;