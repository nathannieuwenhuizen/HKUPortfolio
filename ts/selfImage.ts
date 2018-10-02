export default class SelfImage {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private rCanvas: HTMLCanvasElement;
    private rContext: CanvasRenderingContext2D;

    private imageSize: number = 300;
    private cellSize: any = 10;
    private selfValue: any;

    //other
    private pxData: any;
    constructor() {
        this.canvas = (<HTMLCanvasElement>document.getElementById('selfCanvas'));
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext('2d');

        this.rCanvas = (<HTMLCanvasElement>document.getElementById('selfCanvasResult'));
        this.rCanvas.width = 300;
        this.rCanvas.height = 300;
        this.rContext = this.rCanvas.getContext('2d');

        this.selfValue = document.getElementById('selfValue');
        this.selfValue.onchange = this.updateImage.bind(this);
        this.updateImage();

        // this.interval = setInterval(this.render.bind(this), 1);
        this.render();
    }
    public updateImage(): void {
        this.cellSize = parseInt(this.selfValue.value, 10);
        this.render();
        // console.log(this.selfValue.value);
    }

    public render(): void {
        //draw image on original canvas
        let img: any = new Image();
        img.src = './assets/page_elements/profile.jpg';
        this.context.drawImage(img, 0, 0, this.imageSize, this.imageSize);

        //clear background
        this.rContext.clearRect(0, 0, this.rCanvas.width, this.rCanvas.height);
        // this.rContext.fillStyle = '#fff';
        // this.rContext.fillRect(0, 0, this.rCanvas.width, this.rCanvas.height);

        //draw the pixels based on image
        for (let x: number = 0; x < this.imageSize; x += this.cellSize) {
            for (let y: number = 0; y < this.imageSize; y += this.cellSize) {
                if (Math.sqrt( Math.pow(this.imageSize / 2 - x, 2) + Math.pow(this.imageSize / 2 - y, 2)) >= this.imageSize / 2){
                    continue;
                }

                this.rContext.fillStyle = this.getColor(x + this.cellSize / 2, y + this.cellSize / 2);
                this.rContext.beginPath();
                this.rContext.arc(x + this.cellSize / 2, y + this.cellSize / 2, this.cellSize / 2, 0, Math.PI * 2);
                this.rContext.fill();
                // this.rContext.fillRect(x, y, this.cellSize, this.cellSize);
            }
            // console.log(x);
        }
    }

    private getColor(_x: number, _y: number): string {
        this.pxData = this.context.getImageData(_x, _y, 1, 1).data;
        return this.rgbToHex(this.pxData[0], this.pxData[1], this.pxData[2]);
    }
    public rgbToHex(r: number, g: number, b: number): string {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
    public componentToHex(c: number): string {
        let hex: string = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

}
