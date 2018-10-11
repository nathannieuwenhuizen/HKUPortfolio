import { Iproject, Ihomework, subjects } from './data';
import Slider from './slider';
import App from './app';

export default class Page {

    private aboutField: any;
    private projectOverviewAlreadyLoaded: boolean = false;
    private HKULoaded: boolean = false;
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

    public aboutMe(): void {
        let aboutField: any = document.getElementsByClassName('aboutField')[0];
        aboutField.classList.add('aboutField_show');
    }
    public hideAboutMe(): void {
        let aboutField: any = document.getElementsByClassName('aboutField')[0];
        aboutField.classList.remove('aboutField_show');
    }

    public loadHKUwork(data: Ihomework[]): void {
        if (this.HKULoaded) {
            return;
        }
        this.HKULoaded = true;

        Object.keys(subjects).forEach((key: any) => {
            let filterHomework: Ihomework[] = data.filter((homework: Ihomework) => {
                return homework.subject === Object.keys(subjects).indexOf(key);
            });
            if (filterHomework.length !== 0) {
                console.log(key, filterHomework);
                this.createSubject(key, filterHomework);
            }
            // if (Object.keys(subjects).indexOf(key) === 1) {
            //     console.log('eureka!');
            // }
        });

        this.applyClickEventToHomework();

    }
    public createSubject(header: string, works: Ihomework[]): void {

        let el: any = document.createElement('div');
        el.className = 'subject';

        let elh: any = document.createElement('div');
        elh.className = 'subjectHeader';
        let elhb: any = document.createElement('div');
        elhb.className = 'subjectButton';
        let elhh: any = document.createElement('h2');
        elhh.innerHTML = header;
        elh.appendChild(elhb);
        elh.appendChild(elhh);
        el.appendChild(elh);

        let elb: any = document.createElement('div');
        elb.className = 'subjectBody';
        works.forEach((work: Ihomework) => {
            let link: any = document.createElement('div');
            link.className = 'subjectLink';
            let a: any = document.createElement('a');
            a.setAttribute('href', work.link);
            a.innerHTML = work.link_name;
            let p: any = document.createElement('p');
            p.innerHTML = work.description + ' - year ' + work.year;
            link.appendChild(a);
            link.appendChild(p);
            elb.appendChild(link);
        });
        el.appendChild(elb);

        document.getElementById('HKU').appendChild(el);

    }
    public applyClickEventToHomework(): void {
        let subjectButtons: HTMLCollectionOf<any> = document.getElementsByClassName('subjectHeader');
        for (let i: number = 0; i < subjectButtons.length; i++) {
            subjectButtons[i].onclick = () => {
                let parent: any = subjectButtons[i].parentElement;

                let headerHeight: number  = subjectButtons[i].clientHeight;
                let bodyHeight: number  = parent.getElementsByClassName('subjectBody')[0].clientHeight;

                // console.log(headerHeight, bodyHeight);
                parent.classList.toggle('show');
                if (parent.classList.contains('show')) {
                    headerHeight += bodyHeight;
                    parent.style = 'max-height: ' + headerHeight + 'px;';
                } else {
                    parent.style = 'max-height: ' + headerHeight + 'px;';

                }
                // console.log(i, 'click');
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
                let link: string = '#projectinfo?project=' + i;
                el.style = 'width:' + (100 / data.length) + '%; background-image:url("' + data[i].images[0] + '");';
                a.appendChild(el);
                a.setAttribute('href', link);
                slideContainer.appendChild(a);
            }
        }

        for (let i: number = 0; i < data.length; i++) {
            let link: string = '#projectinfo?project=' + i;

            let sec: any = document.createElement('section');
            sec.className = 'projectTile';

            let title: any = document.createElement('h3');
            let title_link: any = document.createElement('a');
            title_link.innerHTML = data[i].title;
            title_link.setAttribute('href', link);
            title.appendChild(title_link);
            sec.appendChild(title);

            let img: any = document.createElement('img');
            let img_link: any = document.createElement('a');
            img_link.setAttribute('href', link);
            img.setAttribute('src', data[i].images[0]);
            img_link.appendChild(img);
            sec.appendChild(img_link);

            let buttonsec: any = document.createElement('section');
            buttonsec.className = 'buttonContainer';

            buttonsec.appendChild(this.createButton('info', link));

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
