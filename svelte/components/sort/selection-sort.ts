import { Sort, Line, Point, Rect } from './sort';

export class SelectionSort extends Sort {    
    n: number | null = null;
    i: number | null = null;
    min: number | null = null;
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
                if (this.i === null) {
                    this.i = 0;
                }
                if (!(this.i < this.n!)) {
                    this.i = null;
                    this.lineNum = 10;
                }
                return true;
            },
            () => {
                this.min = this.i;
                return true;
            },
            () => {
                if (this.j === null) {
                    this.j = this.i! + 1;
                }
                if (!(this.j < this.n!)) {
                    this.j = null;
                    this.lineNum = 8;
                }
                return true;
            },
            () => {
                if (!(this.array[this.j!] < this.array[this.min!])) {
                    this.lineNum = 7;
                }
                return true;
            },
            () => {
                this.min = this.j;
                return true;
            },
            () => {
                return false;
            },
            () => {
                this.j!++;
                this.lineNum = 3;
                return false;
            },
            () => {
                this.switch(this.i!, this.min!);
                return true;
            },
            () => {
                this.i!++;
                this.lineNum = 1;
                return false;
            },
            () => {
                this.n = null;
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
            } else if (idx < this.i!) {
                rect.color = '#FFD662';
            } else if (idx == this.min) {
                rect.color = '#B392F0';
            } else {
                rect.color = '#003C43';
            }

            objects.push(rect);
        }

        return objects;
    }

    printValues () {
        this.code.innerHTML = `n: <span>${this.n ?? 'out of scope'}</span> <br> i: <span>${this.i ?? 'out of scope'}</span> <span class="comment">// yellow</span> <br> min: <span>${this.min ?? 'out of scope'}</span> <span class="comment">// purple</span> <br> j: <span>${this.j ?? 'out of scope'}</span> <span class="comment">// turquoise</span>`;
    }
}

