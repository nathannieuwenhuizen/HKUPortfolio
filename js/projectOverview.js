window.addEventListener("load", function (){

    var data = getData(-1);
    console.log(data);

    let slideContainer = document.getElementsByClassName('slidecontainer')[0];
    let projecten = document.getElementById('projecten');
    slideContainer.style = 'width: ' + data.length +'00%;';

    for (i = 0; i < data.length; i++) {
        if (data[i].images.length !== 0) {
            let el = this.document.createElement("div");
            let a = this.document.createElement("a");
            el.className = 'dia';
            el.style = 'width:'+ (100 / data.length) + '%; background-image:url("'+ data[i].images[0]+'");';
            a.appendChild(el);
            a.setAttribute('href', './projectinfo.html?project=' + i);
            slideContainer.appendChild(a);
        }
    }

    for (i = 0; i < data.length; i++) {
        let sec = this.document.createElement("section");
        sec.className = 'projectTile';

        let title = this.document.createElement("h3");
        let title_link = this.document.createElement("a");
        title_link.innerHTML = data[i].title;
        title_link.setAttribute('href', './projectinfo.html?project=' + i);
        title.appendChild(title_link);
        sec.appendChild(title);

        let img = this.document.createElement("img");
        let img_link = this.document.createElement("a");
        img_link.setAttribute('href', './projectinfo.html?project=' + i);
        img.setAttribute('src', data[i].images[0]);
        img_link.appendChild(img);
        sec.appendChild(img_link);

        let buttonsec = this.document.createElement("section");
        buttonsec.className = 'buttonContainer';

        let info_link = this.document.createElement("a");
        info_link.setAttribute('href', './projectinfo.html?project=' + i);
        let info = this.document.createElement("section");
        info.className = 'info';
        info_link.appendChild(info);
        buttonsec.appendChild(info_link);

        if (data[i].buttons[1] !== '') {
            let play_link = this.document.createElement("a");
            play_link.setAttribute('href', data[i].buttons[1]);
            let play = this.document.createElement("section");
            play.className = 'play';
            play_link.appendChild(play);
            buttonsec.appendChild(play_link);
        }
        if (data[i].buttons[0] !== '') {
            let github_link = this.document.createElement("a");
            github_link.setAttribute('href', data[i].buttons[0]);
            let github = this.document.createElement("section");
            github.className = 'github';
            github_link.appendChild(github);
            buttonsec.appendChild(github_link);
        }
        
        sec.appendChild(buttonsec);

        projecten.appendChild(sec);
    }

});