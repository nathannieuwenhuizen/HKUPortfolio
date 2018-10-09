import Slider from './slider';
import Page from './page';
import { Iproject, Ihomework } from './data';
import SelfImage from './selfImage';

export default class App {
    private slider: Slider;
    private projectInfo: any;
    private page: Page;

    public data: Iproject[];
    public selfImage: SelfImage;
    public homeworkData: Ihomework[];

    constructor() {

        this.data = this.loadFile('./assets/projects.json');
        this.homeworkData = this.loadFile('./assets/homework.json');
        console.log(this.homeworkData);

        this.selfImage = new SelfImage();
        this.page = new Page();
        this.slider = new Slider(0);
        this.projectInfo = document.getElementById('projectinfo');

        this.updatePage();

        window.addEventListener('hashchange', () => {
            this.updatePage();
        }, false);
    }
    private updatePage(): void {
        // document.documentElement.scrollTop = 0;
        let buttons: any = document.getElementById('navigation').children;
        for (let i: number = 0; i < buttons.length; i++) {
            buttons[i].className = '';
        }

        if (window.location.href.indexOf('#projectinfo') > -1) {
            this.projectInfo.style = 'display: block';
            this.page.loadProjectInfo(this.data[this.readVariableFromUrl()]);
        } else {
            this.projectInfo.style = 'display: none';
        }

        if (window.location.href.indexOf('#about') <= -1) {
            this.page.hideAboutMe();
        }

        if (window.location.href.indexOf('#projecten') > -1) {
            buttons[1].className = 'selected';
            console.log('data begin', this.data);
            this.page.loadProjectOverview(this.data);
            this.slider.updateSlider();
        } else if (window.location.href.indexOf('#about') > -1) {
            buttons[2].className = 'selected';
            this.page.aboutMe();
        } else if (window.location.href.indexOf('#contact') > -1) {
            buttons[3].className = 'selected';
        } else if (window.location.href.indexOf('#HKU') > -1) {
            buttons[4].className = 'selected';
            this.page.loadHKUwork(this.homeworkData);
        } else {
            buttons[0].className = 'selected';
        }
        console.log('clicked');
    }
    private readVariableFromUrl(): any {
        let url_string: string = window.location.href; //window.location.href
        let url: URL = new URL(url_string);
        return url.hash.slice(-1);
    }
    private loadFile(url: string): any {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open('GET', url, false);
        let data: any;
        request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            data = JSON.parse(request.responseText);
            console.log('data', data);
        } else {
            console.log('We reached our target server, but it returned an error');

        }
        };

        request.onerror = () => {
            console.log('There was a connection error of some sort');

        // There was a connection error of some sort
        };

        request.send();
        return data;
    }
}
window.addEventListener('load', () => {
    new App();
}, false);
