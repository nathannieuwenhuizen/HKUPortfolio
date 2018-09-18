window.addEventListener("load", function (){
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("project");
    // console.log('var', c);

    var data = getData(c);
    console.log(data);
    document.title = data.title;

    document.getElementById('projectTitle').innerHTML = data.title;
    document.getElementById('projectDuration').innerHTML = data.duration;
    document.getElementById('projectDate').innerHTML = data.date;
    document.getElementById('projectSummary').innerHTML = data.summary;
    document.getElementById('projectDescription').innerHTML = data.description;
    let slideContainer = document.getElementsByClassName('slidecontainer')[0];
    slideContainer.style = 'width: ' + data.images.length +'00%;';

    for (i = 0; i < data.images.length; i++) {
        if (data.images[i] !== '') {

            console.log(i);
            let el = this.document.createElement("div");
            el.className = 'dia';
            el.style = 'width:'+ (100 / data.images.length) + '%; background-image:url("'+ data.images[i]+'");';
            slideContainer.appendChild(el);
        }
    }

    let buttonContainer = document.getElementsByClassName('projectButtons')[0];
    for (i = 0; i < data.buttons.length; i++) {
        if (data.buttons[i] !== '') {
            let el = this.document.createElement("a");
            el.href = data.buttons[i];            
            let img = this.document.createElement("section");
            
            
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

});