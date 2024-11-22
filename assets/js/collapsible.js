const Collapsibles = document.getElementsByClassName("collapsible");
var ContentWrappers = new Array(Collapsibles.length);
var Buttons = new Array(Collapsibles.length);

// Setup the collapsible content, buttons and click events
for (let i = 0; i < Collapsibles.length; i++) {
    
    ContentWrappers[i] = Collapsibles[i].querySelector(".content-wrapper");
    
    Buttons[i] = Collapsibles[i].querySelector(".collapse-button");
    Buttons[i].addEventListener("click", OnCollapsibleButtonClicked);
    Buttons[i].setAttribute("CollapsibleIndex", String(i));
    
    if(!ContentWrappers[Number(i)].classList.contains("collapsed"))
    {
        HideCollapsibleContent(i);
    }
}

function OnCollapsibleButtonClicked(event) {
    
    var index = Number(event.currentTarget.attributes.CollapsibleIndex.value);
    ContentWrappers[Number(index)].classList.contains("collapsed")
        ? ShowCollapsibleContent(index)
        : HideCollapsibleContent(index);
}


function ShowCollapsibleContent(index) {
    const i = Number(index);
    ContentWrappers[i].classList.remove("collapsed");
    ContentWrappers[i].style.display = "block";
    ContentWrappers[i].style.maxHeight = ContentWrappers[i].scrollHeight + "px";
    ContentWrappers[i].style.opacity = 1;

    const icon = Buttons[i].querySelector("i");
    if(icon)
    {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
    }
}

function HideCollapsibleContent(index)//, skipTransition = false) 
{
    const i = Number(index);
    ContentWrappers[i].classList.add("collapsed");
    

    // content.style.maxHeight = "200px";
    ContentWrappers[i].style.maxHeight = "200px";


    const icon = Buttons[i].querySelector("i");
    if(icon)
    {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }
    
    // Collapsibles[i].parentElement.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });
    // Collapsibles[i].scrollTo({
    //     top: 100,
    //     left: 100,
    //     behavior: "smooth",
    // });
    // ContentWrappers[i].style.opacity = 0;

    // if(skipTransition)
    // {
    //     ContentWrappers[i].style.display = "none";
    // }
}