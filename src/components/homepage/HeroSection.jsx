import { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";

const HeroSection = ({ scrollOffset }) => {
    const [particles, setParticles] = useState(150);
    const isSmall = window.innerWidth <= 768;
    const canvasRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        const small = window.innerWidth <= 768;

        if (small) {
            setParticles(150);
        } else {
            setParticles(350);
        }
    }, [])

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = heroRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = canvasRef.current.offsetWidth;
            canvas.height = canvasRef.current.offsetHeight;

            let particleArray = [];

            // const resizeHandler = () => {
            //     const { width, height } = { width: hero.current.offsetWidth, height: hero.current.offsetHeight };
            //     setSize({ width, height });
            //     mouse.radius = (canvas.height / 80) * (canvas.width / 80);
            // }

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

            const resizeHandler2 = () => {
                if (window.innerWidth <= 768) {
                    setParticles(100);
                } else {
                    setParticles(300);
                }
            }

            requestAnimationFrame(animate);
            window.addEventListener("resize", resizeHandler2);

            return () => window.removeEventListener("resize", resizeHandler2);
        }
    }, [particles]) //Frontend Developer | Web Developer border-2 border-white

    return <section ref={canvasRef} id="hero" className="relative flex items-center justify-center w-full h-72 lg:h-96 animate-wave bg-[linear-gradient(135deg,#0d0d0f,#040427,#0a294e)]">
        <div className="flex items-center justify-between -mt-11 lg:-mt-8 w-[80%] lg:w-[52%] ">
            <div className="text-white flex flex-col justify-center basis-[60%] lg:basis-[75%]">
                <p className="text-sm lg:text-3xl font-semibold tracking-wider">Hi, I’m Shivendra
                    <span className="hidden lg:inline"> Web Developer</span>
                </p>
                <p className="text-xl hidden lg:block">I build modern, fast, and user-focused web applications</p>

                <p className="text-xs lg:text-xl lg:hidden leading-3.5">I create sleek, fast, user-centric web applications.</p>

                <button className="group relative flex items-center gap-1 lg:gap-2 text-white bg-blue-500 rounded-md py-0.5 px-2 lg:px-4 lg:py-1 font-semibold w-fit mt-1.5 lg:mt-2 cursor-pointer overflow-hidden active:scale-95 transition-all duration-200 ease-linear">
                    <span className={`absolute top-0 left-0 h-full w-0 group-hover:w-full bg-blue-700/70 transition-all duration-150 ease-linear`}></span>
                    <span className="tracking-wide max-lg:text-sm z-10">Resume</span>
                    <Download size={15} strokeWidth={3} className="z-10 group-hover:animate-pulse"/>
                </button>

                <div className="flex flex-col gap-3 w-full mt-1.5 lg:mt-3">
                    <div className="flex gap-3">
                        <a
                            href="https://www.linkedin.com/in/shivendra-dwivedi"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                            target="__block"
                        >
                            <i
                                className="fa-brands fa-linkedin text-xl lg:text-2xl text-[#0077b5] dark:text-[rgb(41,140,240)]"
                            ></i>
                        </a>
                        <a
                            href="https://github.com/ShivWK"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                            target="__block"
                        >
                            <i className="fa-brands fa-square-github text-xl lg:text-2xl dark:text-gray-300"></i>
                        </a>
                        <a
                            href="https://x.com/Shivendrawk"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                            target="__block"
                        >
                            <i className="fa-brands fa-square-x-twitter text-xl lg:text-2xl dark:text-gray-300"></i>
                        </a>
                        <a
                            href="https://instagram.com/shivendrawk"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                            target="__block"
                        >
                            <i
                                className="fa-brands fa-instagram text-xl lg:text-2xl"
                                style={{ color: "#e1306c" }}
                            ></i>
                        </a>
                        <a
                            href="mailto:shivendra@shivendra.site"
                            className="hover:scale-[1.3] hover:shadow-lg transition-all duration-100 ease-in"
                        >
                            <i className="fa-solid fa-envelope text-xl lg:text-2xl text-[#d93025]"></i>
                        </a>

                    </div>
                </div>
            </div>
            <div className="rounded-full bg-[url(/me4.jpeg)] bg-[position:center] h-28 lg:h-44 w-28 lg:w-44 bg-cover overflow-hidden p-4 border-2 border-blue-500 shadow-[0_0_15px_2px_rgba(3,165,252,0.7)]"></div>
        </div>
        <canvas className="absolute top-0 left-0 -z-10" ref={heroRef}></canvas>
    </section>
}

export default HeroSection;