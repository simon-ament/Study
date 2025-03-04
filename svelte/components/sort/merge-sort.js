class MergeSort extends Sort {
    ms_stack = [];
    /*
        lo = null;
        hi = null;
        mid = null;
        return_line = null;
    */

    m_stack = [];
    /*
        hi = null;
        mid = null;
        lo = null;
        k = null;
        i = null;
        j = null;
        return_line = null;
    */

    aux = [];
    canvas2 = null;
    ctx2 = null;

    constructor (size, codeId, canvasId, canvasId2) {
        super(size, codeId, canvasId);
        this.canvas2 = document.getElementById(canvasId2);
        this.ctx2 = this.canvas2.getContext('2d');

        this.lineFuncs = [
            () => {
                this.ms_stack.push({
                    lo: 0,
                    hi: this.size - 1,
                    mid: null,
                    return_line: -1
                })
                this.aux = Array(this.size).fill(0);
                this.shuffle();
                return false;
            },
            () => {
                return true;
            },
            () => {
                if (this.ms_stack.at(-1).lo >= this.ms_stack.at(-1).hi) {
                    this.lineNum = this.ms_stack.at(-1).return_line;
                    this.ms_stack.pop();
                }
                return true;
            },
            () => {
                return false;
            },
            () => {
                this.ms_stack.at(-1).mid = this.ms_stack.at(-1).lo + Math.floor((this.ms_stack.at(-1).hi - this.ms_stack.at(-1).lo) / 2);
                return true;
            },
            () => {
                return false;
            },
            () => {
                this.lineNum = 0;
                this.ms_stack.push({
                    lo: this.ms_stack.at(-1).lo,
                    hi: this.ms_stack.at(-1).mid,
                    mid: null,
                    return_line: 6
                })
                return true;
            },
            () => {
                this.lineNum = 0;
                this.ms_stack.push({
                    lo: this.ms_stack.at(-1).mid + 1,
                    hi: this.ms_stack.at(-1).hi,
                    mid: null,
                    return_line: 7
                })
                return true;
            },
            () => {
                this.lineNum = 11;
                this.m_stack.push({
                    lo: this.ms_stack.at(-1).lo,
                    mid: this.ms_stack.at(-1).mid,
                    hi: this.ms_stack.at(-1).hi,
                    k: null,
                    i: null,
                    j: null,
                    return_line: 8
                })
                return true;
            },
            () => {
                this.lineNum = this.ms_stack.at(-1).return_line;
                this.ms_stack.pop();
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
                return false;
            },
            () => {
                if (this.m_stack.at(-1).k === null) {
                    this.m_stack.at(-1).k = this.m_stack.at(-1).lo;
                }
                if (!(this.m_stack.at(-1).k <= this.m_stack.at(-1).hi)) {
                    this.lineNum = 16;
                    this.m_stack.at(-1).k = null;
                }
                return true;
            },
            () => {
                this.aux[this.m_stack.at(-1).k] = this.array[this.m_stack.at(-1).k];
                return true;
            },
            () => {
                this.lineNum = 13;
                this.m_stack.at(-1).k++;
                return false;
            },
            () => {
                return false;
            },
            () => {
                this.m_stack.at(-1).i = this.m_stack.at(-1).lo;
                this.m_stack.at(-1).j = this.m_stack.at(-1).mid + 1;
                return true;
            },
            () => {
                if (this.m_stack.at(-1).k === null) {
                    this.m_stack.at(-1).k = this.m_stack.at(-1).lo;
                }
                if (!(this.m_stack.at(-1).k <= this.m_stack.at(-1).hi)) {
                    this.lineNum = 24;
                    this.m_stack.at(-1).k = null;
                }
                return true;
            },
            () => {
                if (this.m_stack.at(-1).i > this.m_stack.at(-1).mid) {
                    this.array[this.m_stack.at(-1).k] = this.aux[this.m_stack.at(-1).j];
                    this.m_stack.at(-1).j++;
                    this.lineNum = 23;
                    return true;
                }
                return false;
            },
            () => {
                if (this.m_stack.at(-1).j > this.m_stack.at(-1).hi) {
                    this.array[this.m_stack.at(-1).k] = this.aux[this.m_stack.at(-1).i];
                    this.m_stack.at(-1).i++;
                    this.lineNum = 23;
                    return true;
                }
                return false;
            },
            () => {
                if (this.aux[this.m_stack.at(-1).j] < this.aux[this.m_stack.at(-1).i]) {
                    this.array[this.m_stack.at(-1).k] = this.aux[this.m_stack.at(-1).j];
                    this.m_stack.at(-1).j++;
                    this.lineNum = 23;
                    return true;
                }
                return false;
            },
            () => {
                this.array[this.m_stack.at(-1).k] = this.aux[this.m_stack.at(-1).i];
                this.m_stack.at(-1).i++;
                this.lineNum = 23;
                return true;
            },
            () => {
                this.lineNum = 18;
                this.m_stack.at(-1).k++;
                return false;
            },
            () => {
                this.lineNum = this.m_stack.at(-1).return_line;
                this.m_stack.pop();
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

            if (idx >= this.ms_stack.at(-1)?.lo && idx <= this.ms_stack.at(-1)?.hi) {
                rect.color = '#FFD662';
            } else {
                rect.color = '#003C43';
            }

            objects.push(rect);
        }

        return objects;
    }

    generateObjects2 () {
        const objects = [];

        const line = new Line(
            new Point(canvasPadding, this.canvas2.height - canvasPadding),
            new Point(this.canvas2.width - canvasPadding, this.canvas2.height - canvasPadding)
        )
        line.color = "#003C43";
        objects.push(line);

        for (let [idx, elem] of this.aux.entries()) {
            const rectWidth = (this.canvas2.width - 2 * canvasPadding) / (this.size * 2 + 1);
            const rectHeight = elem / this.size * (this.canvas2.height - 2 * canvasPadding)
            const xOffset = (2 * idx + 1) * rectWidth + canvasPadding;
            const rect = new Rect(
                new Point(xOffset, this.canvas2.height - canvasPadding - rectHeight),
                rectWidth,
                rectHeight
            )

            if (idx == this.m_stack.at(-1)?.i || idx == this.m_stack.at(-1)?.j) {
                rect.color = '#77B0AA';
            } else {
                rect.color = '#003C43';
            }

            objects.push(rect);
        }

        return objects;
    }

    draw () {
        super.draw();
        this.draw2();
    }

    draw2 () {
        const objects = this.generateObjects2();
        this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);

        for (let object of objects) {
            object.draw(this.ctx2);
        }
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
        <span class="comment">// merge_sort</span> <br>
        lo: <span>${this.ms_stack.at(-1)?.lo ?? 'out of scope'}</span> <span class="comment">// yellow start</span> <br> 
        hi: <span>${this.ms_stack.at(-1)?.hi ?? 'out of scope'}</span> <span class="comment">// yellow end</span> <br> 
        mid: <span>${this.ms_stack.at(-1)?.mid ?? 'out of scope'}</span> <br>
        <span class="comment">// merge</span> <br>
        lo: <span>${this.m_stack.at(-1)?.lo ?? 'out of scope'}</span> <br>
        mid: <span>${this.m_stack.at(-1)?.mid ?? 'out of scope'}</span> <br>
        hi: <span>${this.m_stack.at(-1)?.hi ?? 'out of scope'}</span> <span class="comment">// turquoise</span> <br>
        k: <span>${this.m_stack.at(-1)?.k ?? 'out of scope'}</span> <span class="comment">// turquoise</span> <br>
        i: <span>${this.m_stack.at(-1)?.i ?? 'out of scope'}</span> <span class="comment">// turquoise</span> <br>
        j: <span>${this.m_stack.at(-1)?.j ?? 'out of scope'}</span> <span class="comment">// turquoise</span> <br>
        `;
    }
}
