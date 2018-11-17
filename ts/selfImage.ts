export default class SelfImage {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private rCanvas: HTMLCanvasElement;
    private rContext: CanvasRenderingContext2D;

    private cellImage: any = '/page_elements/profile.jpg';
    private bigImage: any = '/page_elements/profile.jpg';
    private fileInput: any;

    private imageSize: number = 200;
    private resultSize: number = 2000;
    private cellSize: any = 1;
    private cellSizeInput: any;
    private sizeToscreen: boolean;

    private uploadButton: any;

    private typeOfCell: number = 0;

    private rImg: HTMLImageElement;
    private img: HTMLImageElement;

    public root: string;
    public uploadedImages: HTMLImageElement[];
    public aspectRatio: number = 1;

    //other
    private pxData: any;
    constructor(root: string = 'assets/', sizeToscreen: boolean = false, imageString: string = '/page_elements/profile.jpg') {
        this.root = root;
        this.canvas = (<HTMLCanvasElement>document.getElementById('selfCanvas'));
        this.rCanvas = (<HTMLCanvasElement>document.getElementById('selfCanvasResult'));

        this.sizeToscreen = sizeToscreen;
        this.cellImage = root + imageString;
        this.bigImage = root + imageString;

        if (sizeToscreen) {
            this.aspectRatio = 520 / 720;
        }
        this.canvas.width = this.imageSize;
        this.canvas.height = this.imageSize / this.aspectRatio;

        if (this.sizeToscreen) {
            // this.resultSize = Math.min(window.innerHeight, window.innerWidth);
            
        }
        this.rCanvas.width = this.resultSize;
        this.rCanvas.height = this.resultSize / this.aspectRatio;

        this.context = this.canvas.getContext('2d');

        this.rContext = this.rCanvas.getContext('2d');

        this.rImg = new Image();
        this.img = new Image();
        this.img.onload = this.render.bind(this);
        this.rImg.onload = this.render.bind(this);

        this.cellSizeInput = document.getElementById('selfValue');
        this.cellSizeInput.oninput = this.updateImage.bind(this);
        this.cellSizeInput.oninput = this.updateImage.bind(this);

        this.fileInput = document.getElementById('selfFile');
        this.fileInput.onchange = this.updateFile.bind(this);
        this.fileInput.oninput = this.updateFile.bind(this);

        this.uploadButton = document.getElementById('uploadImage');
        this.uploadButton.onclick = this.showUploadedImages.bind(this);

        this.rImg.src = this.cellImage;
        this.img.src = this.cellImage;
    }
    public showUploadedImages(): void {
        if (this.typeOfCell === 4) {
            return;
        }
        this.typeOfCell = 4;
        this.uploadedImages = [];
        if (files) {
            let length: number =  Math.min(100, files.length);
            for (let i: number = 0; i < length; i++) {
                let tmp: HTMLImageElement = new Image();
                tmp.src =  this.root + 'selfImage/subs/' + files[i];
                tmp.onload = () => {
                    console.log(this.uploadedImages);
                    this.uploadedImages.push(tmp);
                    if (this.uploadedImages.length === length) {
                        console.log('load complete!');
                    }
                };
            }
        }
        this.render();
    }

    public updateImage(): void {
        this.cellSize = parseInt(this.cellSizeInput.value, 10);
        this.render();
    }

    public updateFile(): void {
        console.log('file:', window.URL.createObjectURL(this.fileInput.files[0]));
        this.cellImage = window.URL.createObjectURL(this.fileInput.files[0]);
        this.bigImage = this.cellImage;
        this.rImg.src = this.cellImage;
        this.img.src = this.cellImage;

        // requestAnimationFrame(() => {
        //     this.render();
        // });
        // let reader: FileReader = new FileReader();

        // reader.onload = (event: any) => {
        //     console.log(event);
        //     this.render();
        // };

        // reader.readAsDataURL(this.fileInput.files[0]);
    }

    public render(): void {
        console.log('render');
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draw image on original canvas to use as reference
        // this.rImg.src = this.cellImage;
        this.context.drawImage(this.rImg, 0, 0, this.imageSize, this.imageSize / this.aspectRatio);

        // this.img.src = this.cellImage;

        //clear background
        this.rContext.clearRect(0, 0, this.rCanvas.width, this.rCanvas.height);

        //calculates aspect increase
        let aspectIncrease: number = this.resultSize / this.imageSize;
        let resultCellSize: number = this.cellSize * aspectIncrease;

        if (this.cellSize === 1) {
            this.rContext.drawImage(this.img, 0, 0, this.rCanvas.width, this.rCanvas.height);
            return;
        }
        //draw the pixels based on image
        for (let x: number = 0; x < this.imageSize; x += this.cellSize) {
            for (let y: number = 0; y < this.imageSize / this.aspectRatio; y += this.cellSize) {
                //circle image (sort of)
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
                        this.rContext.drawImage(this.img, resultPos.x, resultPos.y, resultCellSize, resultCellSize);
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
                    case 4:
                        //random images
                        if (this.uploadedImages.length > 0) {
                            let index: number = Math.floor(Math.random() * this.uploadedImages.length);
                            // index = (x * this.imageSize / this.cellSize + y / this.cellSize) % this.uploadedImages.length;
                            //1280 by 720
                            this.rContext.drawImage(this.uploadedImages[index], (1280 - 720) / 2, 0, 720, 720, resultPos.x, resultPos.y, resultCellSize, resultCellSize);
                            // this.rContext.drawImage(this.uploadedImages[index], resultPos.x, resultPos.y, resultCellSize, resultCellSize);
                        }
                        this.rContext.globalAlpha = 0.5;
                        this.rContext.fillRect(resultPos.x, resultPos.y, resultCellSize, resultCellSize);
                        this.rContext.globalAlpha = 1;
                        break;
                    default:
                        break;
                }
            }
        }

        //omlijsting zelfportret opdracht

        // for (let x: number = 0; x < this.imageSize; x += this.cellSize * 2) {
        //     let resultPos: any = {
        //         x: x * aspectIncrease,
        //         y: 0 * aspectIncrease
        //     };

        //     let index: number = Math.floor(Math.random() * this.uploadedImages.length);
        //     this.rContext.drawImage(this.uploadedImages[index], (1280 - 720) / 2, 0, 720, 720, resultPos.x, resultPos.y, resultCellSize * 2, resultCellSize * 2);
        //     console.log('rendering!');
        //     resultPos = {
        //         x: x * aspectIncrease,
        //         y:  this.imageSize / this.aspectRatio * aspectIncrease - resultCellSize * 2
        //     };
        //     this.rContext.drawImage(this.uploadedImages[index], (1280 - 720) / 2, 0, 720, 720, resultPos.x, resultPos.y, resultCellSize * 2, resultCellSize * 2);
        // }

        // for (let y: number = 0; y < this.imageSize / this.aspectRatio; y += this.cellSize * 2) {
        //     let resultPos: any = {
        //         x: 0 * aspectIncrease,
        //         y: y * aspectIncrease
        //     };

        //     let index: number = Math.floor(Math.random() * this.uploadedImages.length);
        //     this.rContext.drawImage(this.uploadedImages[index], (1280 - 720) / 2, 0, 720, 720, resultPos.x, resultPos.y, resultCellSize * 2, resultCellSize * 2);
        //     console.log('rendering!');
        //     resultPos = {
        //         x: this.imageSize * aspectIncrease - resultCellSize * 2,
        //         y: y * aspectIncrease
        //     };
        //     this.rContext.drawImage(this.uploadedImages[index], (1280 - 720) / 2, 0, 720, 720, resultPos.x, resultPos.y, resultCellSize * 2, resultCellSize * 2);
        // }

    }

    // private loadFile(url: string): any {
    //     let request: XMLHttpRequest = new XMLHttpRequest();
    //     request.open('GET', url, false);
    //     let data: any;
    //     request.onload = () => {
    //     if (request.status >= 200 && request.status < 400) {
    //         // Success!
    //         data = JSON.parse(request.responseText);
    //         console.log('data', data);
    //     } else {
    //         console.log('We reached our target server, but it returned an error');

    //     }
    //     };

    //     request.onerror = () => {
    //         console.log('There was a connection error of some sort');

    //     // There was a connection error of some sort
    //     };

    //     request.send();
    //     return data;
    // }

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
