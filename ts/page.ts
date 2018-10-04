import { Iproject } from './data';
import Slider from './slider';

export default class Page {

    private aboutField: any;
    private projectOverviewAlreadyLoaded: boolean = false;
    private infoSlider: Slider;

    constructor() {
        this.infoSlider = new Slider(1);
        this.aboutField = document.getElementsByClassName('aboutField')[0];

        window.addEventListener('resize', () => {
            this.resize();
        });
        this.resize();
    }

    public resize(): void{
        this.aboutField.style.transform = 'scale(' + (window.innerWidth - 200) / 1000 + ')';
    }

    public loadHKUwork(): void {
        let subjectButtons: HTMLCollectionOf<any> = document.getElementsByClassName('subject');
        for (let i: number = 0; i < subjectButtons.length; i++) {
            subjectButtons[i].onclick = () => {
                let headerHeight: number  = subjectButtons[i].getElementsByClassName('subjectHeader')[0].clientHeight * 1.1;
                let bodyHeight: number  = subjectButtons[i].getElementsByClassName('subjectBody')[0].clientHeight * 1.1;

                console.log(headerHeight, bodyHeight);
                subjectButtons[i].classList.toggle('show');
                if (subjectButtons[i].classList.contains('show')) {
                    headerHeight += bodyHeight;
                    subjectButtons[i].style = 'max-height: ' + headerHeight + 'px;';
                } else {
                    subjectButtons[i].style = 'max-height: ' + headerHeight + 'px;';

                }
                console.log(i, 'click');
            };
        }
    }

    public loadProjectOverview(data: Iproject[]): void {
        if (this.projectOverviewAlreadyLoaded) {
            return;
        }
        this.projectOverviewAlreadyLoaded = true;
        let slideContainer: any = document.getElementsByClassName('slidecontainer')[0];
        let projecten: any = document.getElementById('projecten');
        slideContainer.style = 'width: ' + data.length + '00%;';

        for (let i: number = 0; i < data.length; i++) {
            if (data[i].images.length !== 0) {
                let el: any = document.createElement('div');
                let a: any = document.createElement('a');
                el.className = 'dia';
                el.style = 'width:' + (100 / data.length) + '%; background-image:url("' + data[i].images[0] + '");';
                a.appendChild(el);
                a.setAttribute('href', '#projectinfo?project=' + i);
                slideContainer.appendChild(a);
            }
        }

        for (let i: number = 0; i < data.length; i++) {
            let sec: any = document.createElement('section');
            sec.className = 'projectTile';

            let title: any = document.createElement('h3');
            let title_link: any = document.createElement('a');
            title_link.innerHTML = data[i].title;
            title_link.setAttribute('href', '#projectinfo?project=' + i);
            title.appendChild(title_link);
            sec.appendChild(title);

            let img: any = document.createElement('img');
            let img_link: any = document.createElement('a');
            img_link.setAttribute('href', '#projectinfo?project=' + i);
            img.setAttribute('src', data[i].images[0]);
            img_link.appendChild(img);
            sec.appendChild(img_link);

            let buttonsec: any = document.createElement('section');
            buttonsec.className = 'buttonContainer';

            buttonsec.appendChild(this.createButton('info', '#projectinfo?project=' + i));

            if (data[i].buttons[1] !== '') {
                buttonsec.appendChild(this.createButton('play', data[i].buttons[1]));
            }
            if (data[i].buttons[0] !== '') {
                buttonsec.appendChild(this.createButton('github', data[i].buttons[0]));
            }

            sec.appendChild(buttonsec);

            projecten.appendChild(sec);
        }

    }
    public createButton(className: string, url: string): any {
        let github_link: any = document.createElement('a');
        github_link.setAttribute('href', url);
        let github: any = document.createElement('section');
        github.className = className;
        github_link.appendChild(github);
        return github_link;
    }

    public loadProjectInfo(data: Iproject): void {
        this.infoSlider.clearDias();

        // console.log(data);
        document.title = data.title;
        document.getElementById('projectTitle').innerHTML = data.title;
        document.getElementById('projectDuration').innerHTML = data.duration;
        document.getElementById('projectDate').innerHTML = data.date;
        document.getElementById('projectSummary').innerHTML = data.summary;
        document.getElementById('projectDescription').innerHTML = data.description;
        let slideContainer: any = document.getElementsByClassName('slidecontainer')[1];
        slideContainer.style = 'width: ' + data.images.length + '00%;';

        for (let i: number = 0; i < data.images.length; i++) {
            if (data.images[i] !== '') {

                console.log(i);
                let el: any = document.createElement('div');
                el.className = 'dia';
                el.style = 'width:' + (100 / data.images.length) + '%; background-image:url("' + data.images[i] + '");';
                slideContainer.appendChild(el);
            }
        }

        let buttonContainer: any = document.getElementsByClassName('projectButtons')[0];
        buttonContainer.innerHTML = '';
        for (let i: number = 0; i < data.buttons.length; i++) {
            if (data.buttons[i] !== '') {
                let el: any = document.createElement('a');
                el.href = data.buttons[i];
                let img: any = document.createElement('section');

                if (i === 0) {
                    img.className = 'github';
                } else if (i === 1) {
                    img.className = 'play';
                } else {
                    img.className = 'info';
                }

                el.appendChild(img);
                buttonContainer.appendChild(el);

            }
        }
        this.infoSlider.updateSlider();
    }
}
