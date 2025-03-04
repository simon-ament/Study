class QuickSort extends Sort {
    q_stack = [];
    /*
        lo = null;
        hi = null;
        j = null;
        return_line = null;
    */

    p_stack = [];
    /*
        hi = null;
        lo = null;
        i = null;
        j = null;
        return_line = null;
    */

    constructor (size, codeId, canvasId) {
        super(size, codeId, canvasId);

        this.lineFuncs = [
            () => {
                this.q_stack.push({
                    lo: 0,
                    hi: this.size - 1,
                    j: null,
                    return_line: -1
                })
                this.shuffle();
                return false;
            },
            () => {
                return true;
            },
            () => {
                if (this.q_stack.at(-1).lo >= this.q_stack.at(-1).hi) {
                    this.lineNum = this.q_stack.at(-1).return_line;
                    this.q_stack.pop();
                }
                return true;
            },
            () => {
                this.lineNum = 8;
                this.p_stack.push({
                    lo: this.q_stack.at(-1).lo,
                    hi: this.q_stack.at(-1).hi,
                    i: null,
                    j: null,
                    return_line: 3
                })
                return true;
            },
            () => {
                this.lineNum = 0;
                this.q_stack.push({
                    lo: this.q_stack.at(-1).lo,
                    hi: this.q_stack.at(-1).j - 1,
                    j: null,
                    return_line: 4
                })
                return true;
            },
            () => {
                this.lineNum = 0;
                this.q_stack.push({
                    lo: this.q_stack.at(-1).j + 1,
                    hi: this.q_stack.at(-1).hi,
                    j: null,
                    return_line: 5
                })
                return true;
            },
            () => {
                this.lineNum = this.q_stack.at(-1).return_line;
                this.q_stack.pop();
                return true;
            },
            () => {
                return false;
            },
            () => {
                return false;
            },
            () => {
                return true;
            },
            () => {
                this.p_stack.at(-1).i = this.p_stack.at(-1).lo;
                this.p_stack.at(-1).j = this.p_stack.at(-1).hi + 1;
                return true;
            },
            () => {
                return true;
            },
            () => {
                while (this.array[++this.p_stack.at(-1).i] < this.array[this.p_stack.at(-1).lo]) {
                    if (this.p_stack.at(-1).i == this.p_stack.at(-1).hi) {
                        break;
                    }
                }
                return true;
            },
            () => {
                while (this.array[this.p_stack.at(-1).lo] < this.array[--this.p_stack.at(-1).j]) {
                    if (this.p_stack.at(-1).j == this.p_stack.at(-1).lo) {
                        break;
                    }
                }
                return true;
            },
            () => {
                if (this.p_stack.at(-1).i >= this.p_stack.at(-1).j) {
                    this.lineNum = 16;
                }
                return true;
            },
            () => {
                this.switch(this.p_stack.at(-1).i, this.p_stack.at(-1).j);
                return true;
            },
            () => {
                this.lineNum = 10;
                return false;
            },
            () => {
                this.switch(this.p_stack.at(-1).lo, this.p_stack.at(-1).j);
                return true;
            },
            () => {
                this.q_stack.at(-1).j = this.p_stack.at(-1).j;
                this.lineNum = this.p_stack.at(-1).return_line;
                this.p_stack.pop();
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

            if (idx == this.p_stack.at(-1)?.i || idx == this.p_stack.at(-1)?.j) {
                rect.color = '#77B0AA';
            } else if (idx >= this.q_stack.at(-1)?.lo && idx <= this.q_stack.at(-1)?.hi) {
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
        this.code.innerHTML = `
        <span class="comment">// quick_sort</span> <br>
        lo: <span>${this.q_stack.at(-1)?.lo ?? 'out of scope'}</span> <span class="comment">// yellow start</span> <br> 
        hi: <span>${this.q_stack.at(-1)?.hi ?? 'out of scope'}</span> <span class="comment">// yellow end</span> <br> 
        j: <span>${this.q_stack.at(-1)?.j ?? 'out of scope'}</span> <br>
        <span class="comment">// partition</span> <br>
        lo: <span>${this.p_stack.at(-1)?.lo ?? 'out of scope'}</span> <br>
        hi: <span>${this.p_stack.at(-1)?.hi ?? 'out of scope'}</span> <br>
        i: <span>${this.p_stack.at(-1)?.i ?? 'out of scope'}</span> <span class="comment">// turquoise</span> <br>
        j: <span>${this.p_stack.at(-1)?.j ?? 'out of scope'}</span> <span class="comment">// turquoise</span>
        `;
    }
}
