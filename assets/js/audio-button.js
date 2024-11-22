var audioMedia = document.getElementsByClassName('audio-source');

for (let i = 0; i < audioMedia.length; i++) {
    audioMedia[i].parentElement.innerHTML = '<button class="audio-button"> <i class="fas fa-volume-xmark"></i> </button>' + audioMedia[i].parentElement.innerHTML;

    let audioSource = audioMedia[i];
    let button = audioMedia[i].parentElement.getElementsByClassName('audio-button')[0];
    button.addEventListener("click", function () {
        SetAudioMuted(audioSource, button, !audioSource.muted);
    });

    audioSource.addEventListener('volumechange', function () {
        EvaluateMuteButtonState(audioSource, button);
    });
}





function SetAudioMuted(audioSource, button, bMuted)
{
    audioSource.muted = bMuted;
    EvaluateMuteButtonState(audioSource, button);
}

function EvaluateMuteButtonState(audioSource, button)
{
    button.querySelector('i').className 
        = IsAudioSourceMuted(audioSource) ? "fas fa-volume-xmark" : "fas fa-volume-high";
}

function IsAudioSourceMuted(audioSource)
{
    return Boolean(audioSource.muted || (audioSource.volume === 0));
}
