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

let colors = ["rgba(3,252,157,0.46)", "rgba(8, 230, 0, 0.46)", "rgba(252, 69, 3, 0.46)", "rgba(248, 252, 3, 0.46)", "rgba(3, 177, 252, 0.46)", "rgba(252, 3, 3, 0.46)", "rgba(103, 122, 112, 0.46)", "rgba(122, 233, 174, 0.46)", "rgba(255, 255, 255, 0.46)"];

export function circleInit(ctx, canvas) {
    for (let i = 0; i < 10; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 30 + 8;
        let lineWidth = Math.random() * 10 + 3;

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
    for (let i = 0; i < 30; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let l = Math.random() * 50 + 10;
        let b = Math.random() * 50 + 10;

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
    for (let i = 0; i < 8; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let h = Math.random() * 40 + 20;
        let b = Math.random() * 40 + 20;

        let x1 = x + b / 2;
        let x2 = x - b / 2;
        let y1 = y + h;
        let y2 = y + h;

        let lineWidth = Math.random() * 3 + 1;

        let color = colors[Math.floor(Math.random() * colors.length)];

        triangleParticlesArray.push(new TriangleParticles(
            ctx, x, y, x1, y1, x2, y2, lineWidth, color
        ))
    }
}

export const pentagonInit = (ctx, canvas) => {
    for (let i = 0; i < 6; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = Math.random() * 40 + 10;
        let sides = Math.random() * 5;
        let lineWidth = Math.random() * 40 + 15;
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
    for (let i = 0; i < 6; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let sides = Math.random() * 80 + 20;

        let lineWidth = Math.random() * 30 + 8;

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
    for (let i = 0; i < 8; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let h = Math.random() * 40 + 20;
        let w = Math.random() * 15 + 20;

        let lineWidth = Math.random() * 2 + 1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        diamondParticlesArray.push(new DiamondParticles(
            ctx, x, y, w, h, lineWidth, color,
        ))
    }
}
