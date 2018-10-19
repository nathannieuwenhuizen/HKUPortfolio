export default class Slider {
    public slider: any;
    public buttons: any;
    public amountOfimages: any;

    private curentimage: any;
    public loop: any;
    private pauzeDuration: number;
    private container: any;
    constructor(index: number) {
        this.container = document.getElementsByClassName('slider')[index];
        this.slider = this.container.getElementsByClassName('slidecontainer')[0];
        this.buttons = this.container.getElementsByClassName('button');
        // console.log('buttons', this.buttons);
        this.amountOfimages = document.getElementsByClassName('dia').length;
        this.curentimage = 1;
        this.pauzeDuration = 1;

        //ResumeLoop();
        this.gotToSlide(0);

        this.buttons[0].addEventListener('click', () => {
            this.nextSlide();
        });
        this.buttons[1].addEventListener('click', () => {
            this.previousSlide();
        });

    }
    public updateSlider(): void {
        this.amountOfimages = this.container.getElementsByClassName('dia').length;
        this.curentimage = 1;
        this.gotToSlide(0);
    }
    public ResumeLoop(): void {
        this.loop = setInterval(() => {
            // console.log('loop');
            this.nextSlide();
        }, this.pauzeDuration * 1000);
    }
    private nextSlide(): void {
        this.curentimage++;
        // console.log('loop');

        if (this.curentimage > this.amountOfimages)
        {
            this.curentimage = 1;
        }

        this.gotToSlide(this.curentimage - 1);
    }
    public clearDias(): void {
        this.slider.innerHTML = '';
        let dias: any = this.container.getElementsByClassName('dia');
        for (let i: number = 0; i < dias.length; i++) {
            dias[i].parentNode.removeChild(dias[i]);
        }
    }
    private previousSlide(): void {
        this.curentimage--;
        // console.log('loop');

        if (this.curentimage < 1) {
            this.curentimage = this.amountOfimages;
        }

        this.gotToSlide(this.curentimage - 1);
    }

    private gotToSlide(index: number): void {
        // console.log(index, this.slider);
        this.slider.style.transition = 'all 1s';
        this.slider.style.left = '-' + (index) + '00%';

    }
}
