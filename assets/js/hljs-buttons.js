var codeSections = document.getElementsByTagName('pre');

for (var i = 0; i < codeSections.length; i++) {
    code = codeSections[i].getElementsByTagName('code')[0].innerText;
    
    codeSections[i].classList.add('hljs');
    codeSections[i].innerHTML = '<button class="hljs-copy-button"> <i class="far fa-copy"></i> </button>' + codeSections[i].innerHTML; 

    codeSections[i].getElementsByClassName('hljs-copy-button')[0].addEventListener("click", function () {
        navigator.clipboard.writeText(code);
        OnButtonClicked(this);
    });
}


function OnButtonClicked(button)
{
    button.querySelector('i').className = "fas fa-check";
    setTimeout(function () {
        button.querySelector('i').className = "far fa-copy";
    }, 1000)
}