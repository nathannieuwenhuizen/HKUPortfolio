window.addEventListener("load", function (){

    var data = getData(-1);
    console.log(data);

    var slideContainer = document.getElementsByClassName('slidecontainer')[0];
    var projecten = document.getElementById('projecten');
    slideContainer.style = 'width: ' + data.length +'00%;';

    for (i = 0; i < data.length; i++) {
        if (data[i].images.length !== 0) {
            var el = this.document.createElement("div");
            var a = this.document.createElement("a");
            el.className = 'dia';
            el.style = 'width:'+ (100 / data.length) + '%; background-image:url("'+ data[i].images[0]+'");';
            a.appendChild(el);
            a.setAttribute('href', './projectinfo.html?project=' + i);
            slideContainer.appendChild(a);
        }
    }

    for (i = 0; i < data.length; i++) {
        var sec = this.document.createElement("section");
        sec.className = 'projectTile';

        var title = this.document.createElement("h3");
        var title_link = this.document.createElement("a");
        title_link.innerHTML = data[i].title;
        title_link.setAttribute('href', './projectinfo.html?project=' + i);
        title.appendChild(title_link);
        sec.appendChild(title);

        var img = this.document.createElement("img");
        var img_link = this.document.createElement("a");
        img_link.setAttribute('href', './projectinfo.html?project=' + i);
        img.setAttribute('src', data[i].images[0]);
        img_link.appendChild(img);
        sec.appendChild(img_link);

        var buttonsec = this.document.createElement("section");
        buttonsec.className = 'buttonContainer';

        var info_link = this.document.createElement("a");
        info_link.setAttribute('href', './projectinfo.html?project=' + i);
        var info = this.document.createElement("section");
        info.className = 'info';
        info_link.appendChild(info);
        buttonsec.appendChild(info_link);

        if (data[i].buttons[1] !== '') {
            var play_link = this.document.createElement("a");
            play_link.setAttribute('href', data[i].buttons[1]);
            var play = this.document.createElement("section");
            play.className = 'play';
            play_link.appendChild(play);
            buttonsec.appendChild(play_link);
        }
        if (data[i].buttons[0] !== '') {
            var github_link = this.document.createElement("a");
            github_link.setAttribute('href', data[i].buttons[0]);
            var github = this.document.createElement("section");
            github.className = 'github';
            github_link.appendChild(github);
            buttonsec.appendChild(github_link);
        }
        
        sec.appendChild(buttonsec);

        projecten.appendChild(sec);
    }

});