export default class SelfImage {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private rCanvas: HTMLCanvasElement;
    private rContext: CanvasRenderingContext2D;

    private imageSize: number = 200;
    private resultSize: number = 800;
    private cellSize: any = 10;
    private cellSizeInput: any;

    private typeOfCell: number = 0;
    //other
    private pxData: any;
    constructor() {
        this.canvas = (<HTMLCanvasElement>document.getElementById('selfCanvas'));
        this.canvas.width = this.imageSize;
        this.canvas.height = this.imageSize;
        this.context = this.canvas.getContext('2d');

        this.rCanvas = (<HTMLCanvasElement>document.getElementById('selfCanvasResult'));
        this.rCanvas.width = this.resultSize;
        this.rCanvas.height = this.resultSize;
        this.rContext = this.rCanvas.getContext('2d');

        this.cellSizeInput = document.getElementById('selfValue');
        this.cellSizeInput.onchange = this.updateImage.bind(this);
        this.cellSizeInput.oninput = this.updateImage.bind(this);
        this.updateImage();

        // this.interval = setInterval(this.render.bind(this), 1);
        this.render();
    }
    public updateImage(): void {
        this.cellSize = parseInt(this.cellSizeInput.value, 10);
        this.render();
    }

    public render(): void {
        //draw image on original canvas to use as reference
        let img: any = new Image();
        img.src = './assets/page_elements/pf.jpg';
        this.context.drawImage(img, 0, 0, this.imageSize, this.imageSize);

        //clear background
        this.rContext.clearRect(0, 0, this.rCanvas.width, this.rCanvas.height);

        //calculates aspect increase
        let aspectIncrease: number = this.resultSize / this.imageSize;
        let resultCellSize: number = this.cellSize * aspectIncrease;

        //draw the pixels based on image
        for (let x: number = 0; x < this.imageSize; x += this.cellSize) {
            for (let y: number = 0; y < this.imageSize; y += this.cellSize) {
                if (Math.sqrt(Math.pow(this.imageSize / 2 - x, 2) + Math.pow(this.imageSize / 2 - y, 2)) >= this.imageSize / 2) {
                    //continue;
                }

                let resultPos: any = {
                    x: x * aspectIncrease,
                    y: y * aspectIncrease
                };
                this.rContext.fillStyle = this.getColor(x + this.cellSize / 2, y + this.cellSize / 2);
                switch (this.typeOfCell) {
                    case 0:
                        //image
                        // img.src = 'assets/selfImage/' + files[Math.floor(Math.random() * files.length)] + '.jpg';
                        this.rContext.drawImage(img, resultPos.x, resultPos.y, resultCellSize, resultCellSize);
                        this.rContext.globalAlpha = 0.5;
                        this.rContext.fillRect(resultPos.x, resultPos.y, resultCellSize, resultCellSize);
                        this.rContext.globalAlpha = 1;
                        break;
                    case 1:
                        //circle
                        this.rContext.beginPath();
                        this.rContext.arc(resultPos.x + resultCellSize / 2, resultPos.y + resultCellSize / 2, resultCellSize / 2, 0, Math.PI * 2);
                        this.rContext.fill();
                        break;
                    case 2:
                        //square
                        this.rContext.fillRect(resultPos.x, resultPos.y, resultCellSize, resultCellSize);
                        break;
                    case 3:
                        //text
                        this.rContext.font = resultCellSize * 2 + 'px comic sans';
                        this.rContext.save();
                        this.rContext.translate(resultPos.x, resultPos.y);
                        this.rContext.rotate(Math.random() * 1);
                        this.rContext.fillText('NATHAN', 0, 0);
                        this.rContext.restore();
                        break;
                    default:
                        break;
                }
            }
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
