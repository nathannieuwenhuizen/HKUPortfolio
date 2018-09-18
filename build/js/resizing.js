window.addEventListener("load", function (){
    window.addEventListener("resize", function (){
        resize();
    });

    var aboutField = document.getElementsByClassName('aboutField')[0];
    
    function resize(){
        console.log(aboutField.style.transform);
        console.log('resize', window.innerHeight, window.innerWidth);
        aboutField.style.transform = 'scale(' + (window.innerWidth -200) / 1000 + ')';
    };
    resize();
});