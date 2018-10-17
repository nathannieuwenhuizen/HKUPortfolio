import Slider from './slider';
import Page from './page';
import { Iproject, Ihomework, HomeWork } from './data';
import SelfImage from './selfImage';

export default class App {
    private slider: Slider;
    private projectInfo: any;
    private page: Page;

    public data: Iproject[];
    public selfImage: SelfImage;
    public homework: HomeWork;
    public homeworkData: Ihomework[];

    public static styleKey: string = 'nathans_style';
    public static style: string;

    constructor() {

        this.data = this.loadFile('./assets/projects.json');
        this.homeworkData = this.loadFile('./assets/homework.json');

        this.homework = new HomeWork();
        this.homeworkData = this.homework.data;
        console.log(this.homeworkData);

        console.log(files);
        this.selfImage = new SelfImage();
        this.page = new Page();
        this.slider = new Slider(0);
        this.projectInfo = document.getElementById('projectinfo');

        App.style = localStorage.getItem(App.styleKey);
        document.getElementById('styleButton').onclick = this.toggleStyle.bind(this);

        this.updatePage();
        window.addEventListener('hashchange', () => {
            this.updatePage();
        }, false);
    }

    public toggleStyle(): void {
        if (App.style === '1') {
            App.style = '0';
        } else {
            App.style = '1';
        }
        localStorage.setItem(App.styleKey, App.style);
        this.updateStyle();
    }
    private updateStyle(): void {
        console.log('click!!!!!');
        document.getElementById('stylesheet').setAttribute('href', 'assets/' + (App.style === '1' ? 'style2' : 'style') + '.css');
        // document.getElementById('styleButton').setAttribute('href', App.style === '1' ? './?style=0' : './?style=1');
    }
    private updatePage(): void {
        this.updateStyle();

        // document.documentElement.scrollTop = 0;
        let buttons: any = document.getElementById('navigation').children;
        for (let i: number = 0; i < buttons.length; i++) {
            buttons[i].className = '';
        }

        if (window.location.href.indexOf('#projectinfo') > -1) {
            this.projectInfo.style = 'display: block';

            let projectVar: any = App.cap(App.getQueryVariable('project'), 0, this.data.length - 1);

            console.log(projectVar);
            if ( isNaN( projectVar)) {
                projectVar = 0;
            }
            this.page.loadProjectInfo(this.data[projectVar]);
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
    public static cap(value: number, min: number, max: number): number {
        return Math.min(Math.max( value, min), max);

    }
    public static getQueryVariable(variable: string): any {
        let query: any = window.location.href.substring(1);
        let startVar: any = query.split('?');
        if (startVar.length > 1) {
            let vars: any = startVar[1].split('&');
            console.log('q', query, startVar, vars);

            for (let i: number = 0; i < vars.length; i++) {
                let pair: any = vars[i].split('=');
                console.log('pair', pair);
                if (pair[0] === variable) {
                    return pair[1];
                }
            }
            }
        return -1;
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
