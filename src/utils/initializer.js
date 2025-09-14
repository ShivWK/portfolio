import {
    CircleParticles,
    SquareParticles,
    TriangleParticles,
    PentagonParticles,
    HexagonParticles,
    DiamondParticles
} from "./particles";

export let circleParticlesArray = [];
export let triangleParticlesArray = [];
export let squareParticlesArray = [];
export let pentagonParticlesArray = [];
export let diamondParticlesArray = [];
export let hexagonParticlesArray = [];

let colors = ["#E34F2699", "#b0a10999", "#d44ab199", "#08b5c499", "#764ABC99", "#CA424599", "#06B6D499", "#007FFF99", "#E44EFD99", "#6E6E6E99", "#671DDF99", "#4285F499", "00000099", "#33993399", "#47A24899", "#FF6C3799", "rgba(8, 230, 0, 0.46)", "rgba(252, 69, 3, 0.46)", "rgba(248, 252, 3, 0.46)", "rgba(3, 177, 252, 0.46)", "rgba(230, 3, 3, 0.46)", "rgba(103, 122, 112, 0.46)", "rgba(122, 233, 174, 0.46)", "rgba(255, 255, 255, 0.46)"];

export function circleInit(ctx, canvas) {
    const isSmall = window.innerWidth <= 768;
    // console.log(isSmall); (isSmall ? : )

    const count = isSmall ? 8 : 20
    for (let i = 0; i < count; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * (isSmall ? 40 : 30 ) +  20;
        let lineWidth = Math.random() * (isSmall ? 30 : 20) + 10;

        let color = colors[Math.floor(Math.random() * colors.length)];

        circleParticlesArray.push(new CircleParticles(
            ctx,
            x,
            y,
            size,
            color,
            lineWidth
        ))
    }
}

export const squareInit = (ctx, canvas) => {
    const isSmall = window.innerWidth <= 768;
    // console.log(isSmall)

    const count  = isSmall ? 20 : 30;
    for (let i = 0; i < count; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let l = Math.random() * 60 + 20;
        let b = Math.random() * 60 + 20;

        let lineWidth = Math.random() * 50 + 20;

        let color = colors[Math.floor(Math.random() * colors.length)];

        squareParticlesArray.push(new SquareParticles(
            ctx,
            x,
            y,
            l,
            b,
            color,
            lineWidth,
            "round"
        ))
    }
}

export const triangleInit = (ctx, canvas) => {
    const isSmall = window.innerWidth <= 768;
    // console.log(isSmall)

    const count = isSmall ? 8 : 20;
    for (let i = 0; i < count; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let h = Math.random() * (isSmall ? 70 : 60) + 40;
        let b = Math.random() * (isSmall ? 70 : 60) + 20;

        let x1 = x + b / 2;
        let x2 = x - b / 2;
        let y1 = y + h;
        let y2 = y + h;

        let lineWidth = Math.random() * (isSmall ? 4 : 3) + 2;

        let color = colors[Math.floor(Math.random() * colors.length)];

        triangleParticlesArray.push(new TriangleParticles(
            ctx, x, y, x1, y1, x2, y2, lineWidth, color
        ))
    }
}

export const pentagonInit = (ctx, canvas) => {
    const isSmall = window.innerWidth <= 768;
    // console.log(isSmall)

    const count = isSmall ? 5 : 10;
    for (let i = 0; i < count; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = Math.random() * 40 + 20;
        let sides = Math.random() * (isSmall ? 8 : 5);
        let lineWidth = Math.random() * 40 + 20;
        let color = colors[Math.floor(Math.random() * colors.length)];

        pentagonParticlesArray.push(new PentagonParticles(
            ctx,
            x,
            y,
            radius,
            sides,
            color,
            lineWidth,
            "round"
        ))
    }
}

export const hexagonInit = (ctx, canvas) => {
    const isSmall = window.innerWidth <= 768;
    // console.log(isSmall)

    const count = isSmall ? 6 : 10;
    for (let i = 0; i < count; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let sides = Math.random() * 50 + 30;

        let lineWidth = Math.random() * 20 + 10;

        let color = colors[Math.floor(Math.random() * colors.length)];

        hexagonParticlesArray.push(new HexagonParticles(
            ctx,
            x,
            y,
            sides,
            color,
            lineWidth,
            "round"
        ))
    }
}

export const diamondInit = (ctx, canvas) => {
    const isSmall = window.innerWidth <= 768;
    // console.log(isSmall)

    const count = isSmall ? 5 : 20;
    for (let i = 0; i < count; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let h = Math.random() * (isSmall ? 50 : 40) + 30;
        let w = Math.random() * (isSmall ? 50 : 30) + 20;

        let lineWidth = Math.random() * (isSmall ? 5 : 3) + 1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        diamondParticlesArray.push(new DiamondParticles(
            ctx, x, y, w, h, lineWidth, color,
        ))
    }
}
