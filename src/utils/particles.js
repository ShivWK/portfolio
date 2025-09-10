export class CircleParticles {
    constructor(ctx, x, y, size, color, lineWidth) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.lineWidth = lineWidth;
        this.directionY = -1;
        this.directionX = 1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
    }

    update(scrollOffset = 0, canvas) {
        const drift = scrollOffset * 0.02;

        if (this.y > canvas.height + 60) {
            this.directionY = -1;
        } else if (this.y < 0 - 60) {
            this.directionY = 1;
        }

        this.y += this.directionY * 0.3;

        if (this.x > canvas.width + 10) {
            this.directionX = -1;
        } else if (this.x < 0 - 10) {
            this.directionX = 1;
        }

        this.x += this.directionX * Math.random() * canvas.width * 0.0001;
        this.y += drift
    }
}

export class SquareParticles {
    constructor(ctx, x, y, l, b, color, lineWidth, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.l = l;
        this.b = b;
        this.color = color;
        this.lineWidth = lineWidth;
        this.joinStyle = joinStyle;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.l, this.y);
        this.ctx.lineTo(this.x + this.l, this.y + this.b);
        this.ctx.lineTo(this.x, this.y + this.b);

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineJoin = this.joinStyle;
        this.ctx.closePath();
        this.ctx.stroke();
    }

    update(scrollOffset = 0, canvas) {
        const drift = scrollOffset * 0.002;
        this.lineWidth = 0.5 + Math.sin(Date.now() * 0.0004 + this.x) * 0.5
        this.y += drift
    }
}

export class TriangleParticles {
    constructor(ctx, x, y, x1, y1, x2, y2, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x1, this.y1);
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.closePath();

        this.ctx.lineJoin = this.joinStyle;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
    }

    update(scrollOffset = 0, canvas) {
        const drift = scrollOffset * 0.02;
        this.y += Math.sin(Date.now() * 0.0001 + this.x) * 0.8;
        this.y1 += Math.sin(Date.now() * 0.0001 + this.x) * 0.8;
        this.y2 += Math.sin(Date.now() * 0.0001 + this.x) * 0.8;

        this.y += drift;
        this.y1 += drift;
        this.y2 += drift;
    }
}

export class PentagonParticles {
    constructor(ctx, x, y, sides, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.s = sides;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
    }

    draw() {
        this.ctx.beginPath();

        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo((this.x + this.s / 2), this.y + (1.732 * (this.s / 2)));
        this.ctx.lineTo((this.x + this.s / 2), this.y + this.s + (1.732 * (this.s / 2)));
        this.ctx.lineTo((this.x - this.s / 2), this.y + this.s + (1.732 * (this.s / 2)));
        this.ctx.lineTo((this.x - this.s / 2), this.y + (1.732 * (this.s / 2)));

        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineJoin = this.joinStyle
        this.ctx.stroke();
    }

    update(scrollOffset = 0, canvas) {
        const drift = scrollOffset * 0.02;
        this.y += Math.sin(Date.now() * 0.001 + this.x) * 0.2;
        this.y += drift;
    }
}

export class HexagonParticles {
    constructor(ctx, x, y, sides, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.s = sides;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
    }

    draw() {
        if (this.s < 3) return;
        this.ctx.beginPath();

        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo((this.x + this.s), this.y);
        this.ctx.lineTo((this.x + this.s + this.s / 2), (this.y + 1.732 * this.s / 2));
        this.ctx.lineTo((this.x + this.s), (this.y + 2 * (1.732 * this.s / 2)));
        this.ctx.lineTo(this.x, (this.y + 2 * (1.732 * this.s / 2)));
        this.ctx.lineTo((this.x - this.s / 2), (this.y + 1.732 * this.s / 2));

        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineJoin = this.joinStyle
        this.ctx.stroke();
    }

    update(scrollOffset = 0, canvas) {
        const drift = scrollOffset * 0.02;
        this.y += Math.sin(Date.now() * 0.001 + this.x) * 0.2;
        this.y += drift;
    }
}

export class DiamondParticles {
    constructor(ctx, x, y, w, h, lineWidth, color, joinStyle = "miter") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lineWidth = lineWidth;
        this.color = color;
        this.joinStyle = joinStyle;
        this.direction = -1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y - this.h / 2);
        this.ctx.lineTo(this.x + this.w / 2, this.y);
        this.ctx.lineTo(this.x, this.y + this.h / 2);
        this.ctx.lineTo(this.x - this.w / 2, this.y);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineJoin = this.joinStyle

        this.ctx.stroke();
    }

    update(scrollOffset = 0, canvas) {
        const drift = scrollOffset * 0.002;

        if (this.y > canvas.height + 100) {
            this.direction = -1;
        } else if (this.y < 0 - 100) {
            this.direction = 1;
        }

        this.y += this.direction * 0.38;
        this.y += drift;
    }
}