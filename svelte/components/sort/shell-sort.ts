import { Sort, Line, Point, Rect } from './sort';

export class ShellSort extends Sort {
    n: number | null = null;
    h: number | null = null;
    i: number | null = null;
    j: number | null = null;

    constructor (size: number, code: HTMLParagraphElement, canvas: HTMLCanvasElement, canvas2: HTMLCanvasElement | undefined, lines: HTMLSpanElement[], padding: number) {
        super(size, code, canvas, canvas2, lines, padding);

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
                if (!(this.h! < this.n! / 3)) {
                    this.lineNum = 5;
                }
                return true;
            },
            () => {
                this.h = 3 * this.h! + 1;
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
                if (!(this.h! >= 1)) {
                    this.lineNum = 14;
                }
                return true;
            },
            () => {
                if (this.i === null) {
                    this.i = this.h;
                }
                if (!(this.i! < this.n!)) {
                    this.i = null;
                    this.lineNum = 12;
                }
                return true;
            },
            () => {
                if (this.j === null) {
                    this.j = this.i;
                }
                if (!(this.j! >= this.h! && this.array[this.j!] < this.array[this.j! - this.h!])) {
                    this.j = null;
                    this.lineNum = 11;
                }
                return true;
            },
            () => {
                this.switch(this.j!, this.j! - this.h!);
                return true;
            },
            () => {
                this.j! -= this.h!;
                this.lineNum = 8;
                return false;
            },
            () => {
                this.i!++;
                this.lineNum = 7;
                return false;
            },
            () => {
                this.h = Math.floor(this.h! / 3);
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

            if (idx == this.j) {
                rect.color = '#77B0AA';
            } else if ((idx - this.i!) % this.h! === 0) {
                rect.color = '#FFD662';
            } else {
                rect.color = '#003C43';
            }

            objects.push(rect);
        }

        return objects;
    }

    printValues () {
        this.code.innerHTML = `n: <span>${this.n ?? 'out of scope'}</span> <br> h: <span>${this.h ?? 'out of scope'}</span> <span class="comment">// yellow (meaning: focused instead of sorted)</span> <br>  i: <span>${this.i ?? 'out of scope'}</span> <br> j: <span>${this.j ?? 'out of scope'}</span> <span class="comment">// turquoise<span>`;
    }
}
