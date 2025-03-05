export class DrawableObject {
    color = "#000";
    width = 1;

    constructor () { }

    draw (ctx: CanvasRenderingContext2D) { }
}

export class Point extends DrawableObject {
    x;
    y;

    constructor (x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }

    draw (ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.fillRect(this.x, this.y, 1, 1);
    }
}

export class Line extends DrawableObject {
    p1;
    p2;

    constructor (p1: Point, p2: Point) {
        super();
        this.p1 = p1;
        this.p2 = p2;
    }

    draw (ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }
}

export class Rect extends DrawableObject {
    p;
    w;
    h;

    constructor (p: Point, w: number, h: number) {
        super();
        this.p = p;
        this.h = h;
        this.w = w;
    }

    draw (ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.fillRect(this.p.x, this.p.y, this.w, this.h)
    }
}

export class Sort {
    size: number;
    array: number[] = [];
    code: HTMLParagraphElement;
    canvas: HTMLCanvasElement;
    canvas2: HTMLCanvasElement | undefined;
    ctx: CanvasRenderingContext2D;
    lines: HTMLSpanElement[];
    lineNum = 0;
    lineFuncs: (() => boolean)[] = [];
    ips = 1;
    skipped_frames = 0;
    padding = 0;

    constructor (size: number, code: HTMLParagraphElement, canvas: HTMLCanvasElement, canvas2: HTMLCanvasElement | undefined, lines: HTMLSpanElement[], padding: number) {
        this.code = code;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.lines = lines;
        this.padding = padding;

        this.size = size;
        for (let i = 1; i <= size; i++) {
            this.array.push(i);
        }

        this.shuffle();
    }

    shuffle () {
        for (let i = this.size - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = temp;
        }
    }

    switch (idx1: number, idx2: number) {
        const temp = this.array[idx1];
        this.array[idx1] = this.array[idx2];
        this.array[idx2] = temp;
    }

    generateObjects (): DrawableObject[] {
        return [];
    }

    sortStep () {
        if (this.skipped_frames < 50 / this.ips) {
            this.skipped_frames++;
            return;
        } else {
            this.skipped_frames = 0;
        }

        let lineBeforeStop = this.lineNum;
        let stop = false;
        while (!stop) {
            lineBeforeStop = this.lineNum;
            stop = this.lineFuncs[this.lineNum]();
            this.draw();
            this.printValues();

            this.lineNum++;
        }

        for (let line of this.lines) {
            line.removeAttribute('data-highlighted-line');
        }
        this.lines[lineBeforeStop].setAttribute('data-highlighted-line', '');
    }

    draw () { 
        const objects = this.generateObjects();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let object of objects) {
            object.draw(this.ctx);
        }
    }

    printValues () { }
}
