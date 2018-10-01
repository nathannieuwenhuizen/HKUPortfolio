import Slider from './slider';
import Page from './page';

export default class App {
    private slider: Slider;
    private projectInfo: any;
    private page: Page;

    constructor() {
        this.page = new Page();
        this.slider = new Slider(0);
        this.projectInfo = document.getElementById('projectinfo');

        this.updatePage();

        window.addEventListener('hashchange', () => {
            this.updatePage();
        }, false);
    }
    private updatePage(): void {
        let buttons: any = document.getElementById('navigation').children;
        for (let i: number = 0; i < buttons.length; i++) {
            buttons[i].className = '';
        }

        if (window.location.href.indexOf('#projectinfo') > -1) {
            this.projectInfo.style = 'display: block';
            this.page.loadProjectInfo();
        } else {
            this.projectInfo.style = 'display: none';
        }

        if (window.location.href.indexOf('#projecten') > -1) {
            buttons[1].className = 'selected';
            this.page.loadProjectOverview();
            this.slider.updateSlider();
        } else if (window.location.href.indexOf('#about') > -1) {
            buttons[2].className = 'selected';
        } else if (window.location.href.indexOf('#contact') > -1) {
            buttons[3].className = 'selected';
        } else {
            buttons[0].className = 'selected';
        }
        console.log('clicked');
    }
}
window.addEventListener('load', () => {
    new App();
}, false);
