class DrawableObject {
    color = "#000";
    width = 1;

    constructor () { }

    draw () { }
}

class Point extends DrawableObject {
    x;
    y;

    constructor (x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    draw (ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.fillRect(this.x, this.y, 1, 1);
    }
}

class Line extends DrawableObject {
    p1;
    p2;

    constructor (p1, p2) {
        super();
        this.p1 = p1;
        this.p2 = p2;
    }

    draw (ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }
}

class Rect extends DrawableObject {
    p;
    w;
    h;

    constructor (p, w, h) {
        super();
        this.p = p;
        this.h = h;
        this.w = w;
    }

    draw (ctx) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.fillRect(this.p.x, this.p.y, this.w, this.h)
    }
}

class Sort {
    size;
    array = [];
    code = null;
    canvas = null;
    ctx = null;
    lines = null;
    lineNum = 0;
    lineFuncs = [];
    buttons = [];
    ips = 1;

    constructor (size, codeId, canvasId) {
        this.size = size;
        for (let i = 1; i <= size; i++) {
            this.array.push(i);
        }

        this.code = document.getElementById(codeId);
        this.lines = this.code.parentElement.nextElementSibling.children[0].children[0].children;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        const speedButtons = document.createElement('div');
        speedButtons.classList.add('speed-buttons');

        const button0 = document.createElement('button');
        button0.textContent = 'Pause';
        button0.addEventListener('click', () => {
            this.ips = 0;
            this.uncolorButtons();
            button0.style.backgroundColor = 'var(--lightgray)';
        });

        const button1 = document.createElement('button');
        button1.textContent = 'x 1';
        button1.addEventListener('click', (event) => {
            this.ips = 1;
            this.uncolorButtons();
            event.target.style.backgroundColor = 'var(--lightgray)';
        });
        button1.style.backgroundColor = 'var(--lightgray)';

        const button2 = document.createElement('button');
        button2.textContent = 'x 2';
        button2.addEventListener('click', (event) => {
            this.ips = 2;
            this.uncolorButtons();
            event.target.style.backgroundColor = 'var(--lightgray)';
        });

        const button3 = document.createElement('button');
        button3.textContent = 'x 5';
        button3.addEventListener('click', (event) => {
            this.ips = 5;
            this.uncolorButtons();
            event.target.style.backgroundColor = 'var(--lightgray)';
        });

        const button4 = document.createElement('button');
        button4.textContent = 'x 10';
        button4.addEventListener('click', (event) => {
            this.ips = 10;
            this.uncolorButtons();
            event.target.style.backgroundColor = 'var(--lightgray)';
        });

        const button5 = document.createElement('button');
        button5.textContent = 'x 20';
        button5.addEventListener('click', (event) => {
            this.ips = 20;
            this.uncolorButtons();
            event.target.style.backgroundColor = 'var(--lightgray)';
        });

        const button6 = document.createElement('button');
        button6.textContent = 'x 50';
        button6.addEventListener('click', (event) => {
            this.ips = 50;
            this.uncolorButtons();
            event.target.style.backgroundColor = 'var(--lightgray)';
        });

        speedButtons.appendChild(button0);
        speedButtons.appendChild(button1);
        speedButtons.appendChild(button2);
        speedButtons.appendChild(button3);
        speedButtons.appendChild(button4);
        speedButtons.appendChild(button5);
        speedButtons.appendChild(button6);

        this.buttons = this.canvas.parentElement.insertBefore(speedButtons, this.canvas).children;

        this.shuffle();
    }

    uncolorButtons () {
        for (let button of this.buttons) {
            button.style.backgroundColor = '';
        }
    }

    shuffle () {
        for (let i = this.size - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = temp;
        }
    }

    switch (idx1, idx2) {
        const temp = this.array[idx1];
        this.array[idx1] = this.array[idx2];
        this.array[idx2] = temp;
    }

    generateObjects () {
        return [];
    }

    sortStep () { }

    draw () { 
        const objects = this.generateObjects();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let object of objects) {
            object.draw(this.ctx);
        }
    }

    printValues () { }
}
