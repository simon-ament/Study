import { Sort, Line, Point, Rect } from './sort';

export class QuickSort extends Sort {
    q_stack: {
        lo: number,
        hi: number,
        j: number | null,
        return_line: number
    }[] = [];

    p_stack: {
        lo: number,
        hi: number,
        i: number | null,
        j: number | null,
        return_line: number
    }[] = [];

    constructor (size: number, code: HTMLParagraphElement, canvas: HTMLCanvasElement, canvas2: HTMLCanvasElement | undefined, lines: HTMLSpanElement[], padding: number) {
        super(size, code, canvas, canvas2, lines, padding);

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
                if (this.q_stack.at(-1)!.lo >= this.q_stack.at(-1)!.hi) {
                    this.lineNum = this.q_stack.at(-1)!.return_line;
                    this.q_stack.pop();
                }
                return true;
            },
            () => {
                this.lineNum = 8;
                this.p_stack.push({
                    lo: this.q_stack.at(-1)!.lo,
                    hi: this.q_stack.at(-1)!.hi,
                    i: null,
                    j: null,
                    return_line: 3
                })
                return true;
            },
            () => {
                this.lineNum = 0;
                this.q_stack.push({
                    lo: this.q_stack.at(-1)!.lo,
                    hi: this.q_stack.at(-1)!.j! - 1,
                    j: null,
                    return_line: 4
                })
                return true;
            },
            () => {
                this.lineNum = 0;
                this.q_stack.push({
                    lo: this.q_stack.at(-1)!.j! + 1,
                    hi: this.q_stack.at(-1)!.hi,
                    j: null,
                    return_line: 5
                })
                return true;
            },
            () => {
                this.lineNum = this.q_stack.at(-1)!.return_line;
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
                this.p_stack.at(-1)!.i = this.p_stack.at(-1)!.lo;
                this.p_stack.at(-1)!.j = this.p_stack.at(-1)!.hi + 1;
                return true;
            },
            () => {
                return true;
            },
            () => {
                while (this.array[++this.p_stack.at(-1)!.i!] < this.array[this.p_stack.at(-1)!.lo]) {
                    if (this.p_stack.at(-1)!.i == this.p_stack.at(-1)!.hi) {
                        break;
                    }
                }
                return true;
            },
            () => {
                while (this.array[this.p_stack.at(-1)!.lo] < this.array[--this.p_stack.at(-1)!.j!]) {
                    if (this.p_stack.at(-1)!.j == this.p_stack.at(-1)!.lo) {
                        break;
                    }
                }
                return true;
            },
            () => {
                if (this.p_stack.at(-1)!.i! >= this.p_stack.at(-1)!.j!) {
                    this.lineNum = 16;
                }
                return true;
            },
            () => {
                this.switch(this.p_stack.at(-1)!.i!, this.p_stack.at(-1)!.j!);
                return true;
            },
            () => {
                this.lineNum = 10;
                return false;
            },
            () => {
                this.switch(this.p_stack.at(-1)!.lo, this.p_stack.at(-1)!.j!);
                return true;
            },
            () => {
                this.q_stack.at(-1)!.j = this.p_stack.at(-1)!.j;
                this.lineNum = this.p_stack.at(-1)!.return_line;
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
            new Point(this.padding, this.canvas.height - this.padding),
            new Point(this.canvas.width - this.padding, this.canvas.height - this.padding)
        )
        line.color = "#003C43";
        objects.push(line);

        for (let [idx, elem] of this.array.entries()) {
            const rectWidth = (this.canvas.width - 2 * this.padding) / (this.size * 2 + 1);
            const rectHeight = elem / this.size * (this.canvas.height - 2 * this.padding)
            const xOffset = (2 * idx + 1) * rectWidth + this.padding;
            const rect = new Rect(
                new Point(xOffset, this.canvas.height - this.padding - rectHeight),
                rectWidth,
                rectHeight
            )

            if (idx == this.p_stack.at(-1)?.i || idx == this.p_stack.at(-1)?.j) {
                rect.color = '#77B0AA';
            } else if (this.q_stack.at(-1) !== undefined && idx >= this.q_stack.at(-1)!.lo && idx <= this.q_stack.at(-1)!.hi) {
                rect.color = '#FFD662';
            } else {
                rect.color = '#003C43';
            }

            objects.push(rect);
        }

        return objects;
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
