class ShellSort extends Sort {
    n = null;
    h = null;
    i = null;
    j = null;

    constructor (size, codeId, canvasId) {
        super(size, codeId, canvasId);

        this.lineFuncs = [
            () => {
                this.shuffle();
                return false;
            },
            () => {
                this.n = this.size;
                return false;
            },
            () => {
                this.h = 1;
                return true;
            },
            () => {
                if (!(this.h < this.n / 3)) {
                    this.lineNum = 5;
                }
                return true;
            },
            () => {
                this.h = 3 * this.h + 1;
                return true;
            },
            () => {
                this.lineNum = 2;
                return false;
            },
            () => {
                return false;
            },
            () => {
                if (!(this.h >= 1)) {
                    this.lineNum = 14;
                }
                return true;
            },
            () => {
                if (this.i === null) {
                    this.i = this.h;
                }
                if (!(this.i < this.n)) {
                    this.i = null;
                    this.lineNum = 12;
                }
                return true;
            },
            () => {
                if (this.j === null) {
                    this.j = this.i;
                }
                if (!(this.j >= this.h && this.array[this.j] < this.array[this.j - this.h])) {
                    this.j = null;
                    this.lineNum = 11;
                }
                return true;
            },
            () => {
                this.switch(this.j, this.j - this.h);
                return true;
            },
            () => {
                this.j -= this.h;
                this.lineNum = 8;
                return false;
            },
            () => {
                this.i++;
                this.lineNum = 7;
                return false;
            },
            () => {
                this.h = Math.floor(this.h / 3);
                return true;
            },
            () => {
                this.lineNum = 6;
                return false;
            },
            () => {
                this.n = null;
                this.h = null;
                this.lineNum = -1;
                return true;
            },
            () => {
                return false;
            }
        ]
    }

    generateObjects () {
        const objects = [];

        const line = new Line(
            new Point(canvasPadding, this.canvas.height - canvasPadding),
            new Point(this.canvas.width - canvasPadding, this.canvas.height - canvasPadding)
        )
        line.color = "#003C43";
        objects.push(line);

        for (let [idx, elem] of this.array.entries()) {
            const rectWidth = (this.canvas.width - 2 * canvasPadding) / (this.size * 2 + 1);
            const rectHeight = elem / this.size * (this.canvas.height - 2 * canvasPadding)
            const xOffset = (2 * idx + 1) * rectWidth + canvasPadding;
            const rect = new Rect(
                new Point(xOffset, this.canvas.height - canvasPadding - rectHeight),
                rectWidth,
                rectHeight
            )

            if (idx == this.j) {
                rect.color = '#77B0AA';
            } else if ((idx - this.i) % this.h === 0) {
                rect.color = '#FFD662';
            } else {
                rect.color = '#003C43';
            }

            objects.push(rect);
        }

        return objects;
    }

    sortStep () {
        if (this.skipped_frames < 50 / this.ips) {
            this.skipped_frames++;
            return;
        } else {
            this.skipped_frames = 0;
        }

        let lineBeforeStop = this.lineNum;
        stop = false;
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

    printValues () {
        this.code.innerHTML = `n: <span>${this.n ?? 'out of scope'}</span> <br> h: <span>${this.h ?? 'out of scope'}</span> <span class="comment">// yellow (meaning: focused instead of sorted)</span> <br>  i: <span>${this.i ?? 'out of scope'}</span> <br> j: <span>${this.j ?? 'out of scope'}</span> <span class="comment">// turquoise<span>`;
    }
}
