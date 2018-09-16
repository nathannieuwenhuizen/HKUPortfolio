window.addEventListener("load", function (){
	var slider = document.getElementsByClassName("slidecontainer")[0];
    var buttons = document.getElementsByClassName("button");
    
    var amountOfimages = document.getElementsByClassName("dia").length;
    var curentimage = 1;
    var loop;
    var pauzeDuration = 1;
    //ResumeLoop();
    gotToSlide(0);

    buttons[0].addEventListener('click', () => {
        nextSlide();
    })
    buttons[1].addEventListener('click', () => {
        previousSlide();
    })
    
    // for(var i = 0; i < buttons.length; i++)
    // {
    //     (function(i){
    //         buttons[i].onclick = function()
    //         {
    //             gotToSlide(i); 
    //             curentimage = i+1;
    //             clearInterval(loop); 
    //             //ResumeLoop();
    //         };
    //     })(i);
    // }
    
    function ResumeLoop()
    {
        loop = setInterval(function(){
            console.log('loop');
            nextSlide();
        }, pauzeDuration*1000);
    }
    function nextSlide() 
    {
        curentimage++;

        if(curentimage >amountOfimages)
            curentimage = 1;            

        gotToSlide(curentimage-1);
    }
    function previousSlide()
    {
        curentimage--;

        if(curentimage < 1)
            curentimage = amountOfimages;            

        gotToSlide(curentimage-1);
    }
    
    function gotToSlide(index)
    {
        console.log(index, slider);
        slider.style.transition = "all 1s";
        slider.style.left = '-'+(index)+'00%';
        
        UpdateButtons(index);
    }
    function UpdateButtons(index)
    {
        // for(var i = 0; i < buttons.length; i++)
        // {
        //     if(i == index)
        //         buttons[i].src = "img/buttonPressed.jpg";
        //     else
        //         buttons[i].src = "img/button.jpg";
        // }
    }
    
}, false);