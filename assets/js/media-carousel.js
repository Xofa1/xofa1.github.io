const buttonLeft    = document.querySelector(".strip-button.left");
const buttonRight   = document.querySelector(".strip-button.right");

const stripItems    = document.querySelector(".strip-items");
const mediaWrapper  = document.querySelector(".media-wrapper");

const stripItem = stripItems.querySelector(".strip-item");


const progressBar = document.querySelector(".bar");

var selectorSpan = document.createElement('span');
selectorSpan.classList.add("strip-item-selector");

// Displayed/Selected item
var selectedMediaIndex = -1;

// Left-most item
var currentStripIndex = 0;

var hiddenTag = "hidden";


// Code
buttonLeft.setAttribute("carouselAdvance", -1);
buttonRight.setAttribute("carouselAdvance", 1);

buttonLeft.addEventListener("click", HandleButtonClicked);
buttonRight.addEventListener("click", HandleButtonClicked);


window.addEventListener("resize", function () {
    SetCurrentStripIndex(0);
});

Init();
SelectStripItem(0);


// Functions
function Init()
{
    let stripItemArray = stripItems.children;
    for (i = 0; i < stripItemArray.length; i++)
    {
        stripItemArray[i].setAttribute("stripItemIndex", i);
        stripItemArray[i].addEventListener("click", HandleStripItemClicked);
    }

    let mediaArray = mediaWrapper.children;
    for (i = 0; i < mediaArray.length; i++)
    {
        if(!mediaArray[i].classList.contains(hiddenTag))
        {
            mediaArray[i].classList.add(hiddenTag);
        }
    }

    let totalElementCount = stripItems.childElementCount;
    let itemsPerView = Math.ceil((stripItems.offsetWidth / stripItem.scrollWidth));
    progressBar.style.width = ((itemsPerView / totalElementCount) * 100) + "%";
    UpdateProgressBar(0);
}

function UpdateProgressBar(index)
{
    let offset = progressBar.parentElement.scrollWidth * (index / stripItems.childElementCount);
    progressBar.style.transform = "translateX(" + offset + "px)";
}

//window.addEventListener("resize", function () { showCarouselPage(0); });

function HandleStripItemClicked(event)
{
    SelectStripItem(Number(event.currentTarget.attributes.stripItemIndex.value));
}

function HandleButtonClicked(event)
{
    AdvanceStrip(Number(event.currentTarget.attributes.carouselAdvance.value));
    // SelectStripItem(index)
}

function AdvanceStrip(n)
{
    let newIndex = currentStripIndex + n;

    let itemsPerView = Math.ceil((stripItems.offsetWidth / stripItem.scrollWidth));

    let totalElementCount = stripItems.childElementCount;


    let modulo = (totalElementCount - itemsPerView + 1);
    
    newIndex = newIndex % modulo;
    newIndex += modulo;
    newIndex = newIndex % modulo;
    
    
    // newIndex = newIndex < 0 ? (totalElementCount - itemsPerView + 1) + newIndex : newIndex;
    
    SetCurrentStripIndex(newIndex);
    
    
    //
    //
    // if(n > 0)
    // {
    //     let canFillPage = (newIndex + itemsPerView) > totalElementCount;
    //     SetCurrentStripIndex(canFillPage ? 0 : newIndex);
    // }
    // else if(n < 0)
    // {
    //     SetCurrentStripIndex(newIndex < 0 ? totalElementCount - itemsPerView: newIndex);
    // }
    
    
    // let count = totalElementCount - ((totalElementCount + 1) % itemsPerView);
    // count = Math.min(count, totalElementCount);
    // newIndex = newIndex % count;
    //
    // SetCurrentStripIndex(newIndex < 0 ? newIndex + count : newIndex);

    
    

}


function SetCurrentStripIndex(index)
{
    currentStripIndex = index;
    //offsetWidth
    let itemWidth = stripItem.scrollWidth;
    let offset = -currentStripIndex * itemWidth;
    //currentStripIndex
    stripItems.style.transform = "translateX(" + offset + "px)";
    UpdateProgressBar(index);
}




function SelectStripItem(index)
{
    if(selectedMediaIndex === index)
    {
        return;
    }

    //Remove .visible tag from currently selected
    let mediaArray = mediaWrapper.children;

    if(!mediaArray || typeof mediaArray[index] === 'undefined')
    {
        return;
    }
    
    if(selectedMediaIndex !== -1)
    {
        mediaArray[selectedMediaIndex].classList.add(hiddenTag);
        let children = stripItems.children;
        // let selector = children[selectedMediaIndex].querySelector(".strip-item-selector");
        // if(selector)
        // {
        //     selector.classList.add(hiddenTag);
        // }

        let iframe = mediaArray[selectedMediaIndex].querySelector("iframe");
        if(iframe)
        {
            iframe.src = iframe.src;
        }


        let video = mediaArray[selectedMediaIndex].querySelector("video");
        if(video)
        {
            video.pause();
            video.currentTime = 0;
        }
    }

    //Add to newly selected
    mediaArray[index].classList.remove(hiddenTag);


    let children = stripItems.children;
    children[index].appendChild(selectorSpan);
    // let selector = children[index].querySelector(".strip-item-selector");
    // selector.classList.remove(hiddenTag);
    //
    let video = mediaArray[index].querySelector("video");
    if(video)
    {
        video.currentTime = 0;
        video.play();
    }

    selectedMediaIndex = index;
}