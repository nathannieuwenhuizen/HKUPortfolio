import {
    Iproject,
    Ihomework,
    subjects
} from './data';
import Slider from './slider';
import App from './app';

export default class Page {

    private aboutField: Element;
    private projectOverviewAlreadyLoaded: boolean = false;
    private projectUploadButton: Element;
    private HKULoaded: boolean = false;
    private infoSlider: Slider;

    private about_interval: any;

    constructor() {
        this.infoSlider = new Slider(1);
        this.aboutField = document.getElementsByClassName('aboutField')[0];

        window.addEventListener('resize', () => {
            this.resize();
        });
        this.resize();
    }

    public resize(): void {
        this.aboutField.style.transform = 'scale(' + (Math.min(window.innerHeight + 200, window.innerWidth - 200)) / 1000 + ')';
    }

    public aboutMe(): void {
        let li: any = document.getElementsByClassName('newStatField')[0].getElementsByTagName('li');
        console.log('lis', li);
        for (let i: number = 0; i < li.length; i++) {
            li[i].style = 'transition: transform 200ms ease-in-out ' + (1.5 + i / 20.0) + 's;';
            // li[i].style = 'transition: color 200ms ease-in-out 0s;';
            // console.log( li.style.transitionDelay );
        }

        let aboutField: any = document.getElementsByClassName('aboutField')[0];
        aboutField.classList.add('aboutField_show');
        /*addEventListener('mousemove', (event: any) => {
            let rect: any = aboutField.getBoundingClientRect();
            let dist: any = {
                x: event.clientX - (rect.x + rect.width / 2)
                y: event.clientY - (rect.y + rect.height / 2)
            };
            // this.aboutField.style.transform = 'scale(' + (Math.min(window.innerHeight + 200, window.innerWidth - 200)) / 1000 + ')';
            let maxDegree: number = 5;
            this.aboutField.style.transform =
                'rotateY(' + Math.min(maxDegree, Math.max(-maxDegree, (dist.x / 200))) + 'deg)';
                // 'rotateX(' + -Math.min(maxDegree, Math.max(-maxDegree, (dist.y / 100))) + 'deg)';
            console.log(dist);

        });*/
    }
    public hideAboutMe(): void {
        let aboutField: any = document.getElementsByClassName('aboutField')[0];
        aboutField.classList.remove('aboutField_show');
        clearInterval(this.about_interval);
    }

    public loadHKUwork(data: Ihomework[]): void {
        if (this.HKULoaded) {
            return;
        }
        this.HKULoaded = true;

        let sortedsubjects: any = Object.keys(subjects).sort();
        sortedsubjects.forEach((key: any) => {
            let filterHomework: Ihomework[] = data.filter((homework: Ihomework) => {
                // console.log(homework.subject, subjects[ key]);
                return homework.subject === subjects[key];
            });
            if (filterHomework.length !== 0) {
                this.createSubject(subjects[key], filterHomework);
                this.addFilterOption(subjects[key]);
            }
        });
        let subjectlist: any = document.getElementById('filter_val');
        subjectlist.onchange = () => {
            this.filterHKUwork(subjectlist.value);
        };
        this.applyClickEventToHomework();

    }
    public addFilterOption(header: string): void {
        let filter: any = document.getElementById('filter_val');
        let el: any = document.createElement('option');
        el.innerHTML = header;
        el.setAttribute('value', header);
        filter.appendChild(el);
    }
    public filterHKUwork(val: string): void {
        let subjectlist: any = document.getElementsByClassName('subject');
        for (let i: number = 0; i < subjectlist.length; i++) {
            let headerName: any = subjectlist[i].getElementsByTagName('h2')[0].innerText;
            if (val !== '') {
                subjectlist[i].style = (headerName === val ? 'display: block;' : 'display: none;');
            } else {
                subjectlist[i].style = 'display: block;';

            }
        }
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
            p.innerHTML = work.description + ' - year ' + work.year + ' - ' + work.teachers;
            link.appendChild(a);
            link.appendChild(p);
            elb.appendChild(link);
        });
        el.appendChild(elb);

        document.getElementById('HKU').appendChild(el);

    }
    public applyClickEventToHomework(): void {
        let subjectButtons: HTMLCollectionOf < any > = document.getElementsByClassName('subjectHeader');
        for (let i: number = 0; i < subjectButtons.length; i++) {
            subjectButtons[i].onclick = () => {
                let parent: any = subjectButtons[i].parentElement;

                let headerHeight: number = subjectButtons[i].clientHeight;
                let bodyHeight: number = parent.getElementsByClassName('subjectBody')[0].clientHeight;

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

    public uploadProject(data: Iproject[]): void {
        console.log("click!");
        let form: Element = document.getElementsByClassName("projectForm")[0];

        let uploadedData: Iproject = {
            title: form.getElementsByClassName("title")[0].value,
            team: form.getElementsByClassName("team")[0].value,
            type: form.getElementsByClassName("type")[0].value,
            duration: form.getElementsByClassName("duration")[0].value,
            date: form.getElementsByClassName("date")[0].value,
            summary: form.getElementsByClassName("summary")[0].value,
            description: form.getElementsByClassName("description")[0].value,
            images: this.getimagesVal(),
            buttons: this.getbuttonsVal()
        }
        data.push(uploadedData);
        console.log("copy this:");
        console.log(JSON.stringify(uploadedData));

    }
    public getbuttonsVal(): string[][] {
        let result: string[][] = [];
        let buttonContainer = document.getElementsByClassName("buttonContainer")[0];
        for (let i: number = 0; i < buttonContainer.childElementCount; i++) {
            result.push([
                buttonContainer.children[i].getElementsByClassName("buttonLink")[0].value,
                buttonContainer.children[i].getElementsByClassName("buttonText")[0].value
            ]);
        }
        return result;
    }

    public getimagesVal(): string[][] {
        let result: string[][] = [];
        let buttonContainer = document.getElementsByClassName("imageLinksContainer")[0];
        for (let i: number = 0; i < buttonContainer.childElementCount; i++) {
            result.push(buttonContainer.children[i].getElementsByClassName("imageLink")[0].value);
        }
        return result;
    }

    public changeAmountofButtons(val: number) {
        let buttonContainer = document.getElementsByClassName("buttonContainer")[0];
        let exampleButton = document.getElementById("exampleButton");

        if (val > buttonContainer.childElementCount) {
            for (let i: number = 0; i < val - buttonContainer.childElementCount; i++) {
                let newElement = exampleButton.cloneNode(true);
                newElement.classList.remove("hide");
                buttonContainer.appendChild(newElement);
            }
        } else {
            if (val >= 0) {
                for (let i: number = 0; i < buttonContainer.childElementCount - val; i++) {
                    buttonContainer.removeChild(buttonContainer.childNodes[buttonContainer.childElementCount - 1]);
                }
            }
        }
    }

    public changeAmountofImages(val: number) {
        let imagesContainer = document.getElementsByClassName("imageLinksContainer")[0];
        let exampleImage = document.getElementById("exampleimageLink");

        if (val > imagesContainer.childElementCount) {
            for (let i: number = 0; i < val - imagesContainer.childElementCount; i++) {
                let newElement = exampleImage.cloneNode(true);
                newElement.classList.remove("hide");
                imagesContainer.appendChild(newElement);
            }
        } else {
            if (val >= 0) {
                for (let i: number = 0; i < imagesContainer.childElementCount - val; i++) {
                    imagesContainer.removeChild(imagesContainer.childNodes[imagesContainer.childElementCount - 1]);
                }
            }
        }
    }

    public reloadProjectOverview(data: Iproject[]) {
        let projects: any = document.getElementById('projecten');
        let elements: any = projects.getElementsByClassName("flipTile");

        while (elements[0]) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        this.projectOverviewAlreadyLoaded = false;
        this.loadProjectOverview(data);
    }


    public loadProjectOverview(data: Iproject[]): void {
        if (this.projectOverviewAlreadyLoaded) {
            return;
        }
        this.projectOverviewAlreadyLoaded = true;


        let numberofbuttons: Element = document.getElementsByClassName("numberofbuttons")[0];
        numberofbuttons.addEventListener("click", () => {
            this.changeAmountofButtons(numberofbuttons.value);
        });

        let numberofimages: Element = document.getElementsByClassName("numberofimages")[0];
        numberofimages.addEventListener("click", () => {
            this.changeAmountofImages(numberofimages.value);
        });

        this.projectUploadButton = document.getElementById("projectUploadButton");
        this.projectUploadButton.addEventListener("click", () => {
            this.uploadProject(data);
        });


        //slider
        {
            let highLightedProjects = data.filter(project => project.highLighted == true);
            highLightedProjects.sort((a: Iproject, b: Iproject) => {
                let result = 0;
                result = a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
                return result;
            });
    
            let slideContainer: any = document.getElementsByClassName('slidecontainer')[0];
            let projects: any = document.getElementById('projecten');
            slideContainer.style = 'width: ' + highLightedProjects.length + '00%;';

            for (let i: number = 0; i < highLightedProjects.length; i++) {
                if (highLightedProjects[i].images.length !== 0) { 
                    let el: any = document.createElement('div');
                    let a: any = document.createElement('a');
                    el.className = 'dia';
                    let link: string = '#projectinfo?project=' + highLightedProjects[i].id;
                    el.style = 'width:' + (100 / highLightedProjects.length) + '%; background-image:url("' + highLightedProjects[i].images[0] + '");';
                    a.appendChild(el);
                    a.setAttribute('href', link);
                    slideContainer.appendChild(a);
                }
            }
        }

        let otherData = data.filter(project => project.highLighted == false);

        let orderSelection: Element = document.getElementById("projectsorder");
        orderSelection.onchange = () => {
            this.reloadProjectOverview(data);
        })
        let orderSelectionDirection =document.getElementById("projectorderInvert");
        orderSelectionDirection.onchange = () => {
            this.reloadProjectOverview(data);
        })

        otherData.sort((a: Iproject, b: Iproject) => {
            let result = 0;
            switch (orderSelection.value) {
                case "Time":
                    result = a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
                    break;
                case "Title":
                    result = a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
                    break;
                case "Type":
                    result = a.type > b.type ? -1 : a.type < b.type ? 1 : 0;
                    break;

            }
            if (orderSelectionDirection.checked) {
                result = result == 1 ? -1 : 1;
            }
            return result;
        });

        //thumbs - new
        for (let i: number = 0; i < otherData.length; i++) {
            let link: string = '#projectinfo?project=' + otherData[i].id;

            let sec: any = document.createElement('div');
            sec.className = 'flipTile';

            //cover
            let cover: any = document.createElement('div');
            cover.className = 'cover';
            let front: any = document.createElement('section');
            front.className = 'front';
            let h2: any = document.createElement('h2');
            h2.innerHTML = otherData[i].title;
            let back: any = document.createElement('section');
            back.className = 'back';
            front.style = 'background-image:url(' + otherData[i].images[0] + ')';
            back.style = 'background-image:url(' + otherData[i].images[1] + ')';
            front.appendChild(h2);
            cover.appendChild(front);
            cover.appendChild(back);
            sec.appendChild(cover);

            //back page

            let buttons: string = '';
            for (let j: number = 0; j < otherData[i].buttons.length; j++) {
                buttons += '<a target="n_project" href="' + otherData[i].buttons[j][0] + '">' + otherData[i].buttons[j][1] + '</a>';
            }

            let backpage: any = document.createElement('div');
            backpage.className = 'backPage';
            backpage.innerHTML =
                '<h2><a href="' + link + '">' + otherData[i].title + '</a></h2>' +
                '<p><b>Type </b>' + otherData[i].type + '</p>' +
                '<p><b>Date </b>' + otherData[i].date + '</p>' +
                '<p><b>Duration </b>' + otherData[i].duration + '</p>' +
                '<p><b>Team </b>' + otherData[i].team + '</p>' +
                // '<p><b>Description: </b> </p>' +
                // '<p>' + otherData[i].summary + '</p>' +
                '<div class="buttons">' +
                '<a href="' + link + '">More info...</a>' +
                buttons +
                '</div></div></div>';
            sec.appendChild(backpage);

            projects.appendChild(sec);
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

        document.title = data.title;
        document.getElementById('projectTitle').innerHTML = data.type;
        document.getElementById('projectTeam').innerHTML = data.team;
        document.getElementById('project_title_h').innerHTML = data.title;
        document.getElementById('projectDuration').innerHTML = data.duration;
        document.getElementById('projectDate').innerHTML = data.date;
        document.getElementById('projectSummary').innerHTML = data.summary;
        document.getElementById('projectDescription').innerHTML = data.description;
        let slideContainer: any = document.getElementsByClassName('slidecontainer')[1];
        slideContainer.style = 'width: ' + data.images.length + '00%;';

        for (let i: number = 0; i < data.images.length; i++) {
            if (data.images[i] !== '') {

                let a: any = document.createElement('a');
                a.target = 'n_img';
                a.href = data.images[i];

                let el: any = document.createElement('div');
                el.className = 'dia';
                el.style = 'width:' + (100 / data.images.length) + '%; background-image:url("' + data.images[i] + '");';
                a.appendChild(el);
                slideContainer.appendChild(a);
            }
        }

        let buttonContainer: any = document.getElementsByClassName('projectButtons')[0];
        buttonContainer.innerHTML = '';
        for (let i: number = 0; i < data.buttons.length; i++) {
            let el: any = document.createElement('a');
            el.href = data.buttons[i][0];
            el.target = 'n_project';
            el.innerHTML = data.buttons[i][1];

            // el.appendChild(img);
            buttonContainer.appendChild(el);
        }
        this.infoSlider.updateSlider();
    }
}