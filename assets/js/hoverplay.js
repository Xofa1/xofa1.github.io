const HoverPlayCards = document.getElementsByClassName("hoverplay");


for (var i = 0; i < HoverPlayCards.length; i++) {
    
    let video = HoverPlayCards[i].getElementsByTagName('video')[0];
    if(!video)
    {
        continue;
    }

    HoverPlayCards[i].addEventListener("mouseenter", function () {
        video.play();
    });
    
    HoverPlayCards[i].addEventListener("mouseleave", function () {
        video.pause();
        // video.currentTime = 0;
    });
}