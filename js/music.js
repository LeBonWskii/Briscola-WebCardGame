
let soundtrack=document.getElementById("soundtrack");
let audioIcon=document.getElementById("audioicon");
let volume=document.getElementById("setvolume");
soundtrack.volume=volume.value;

 volume.addEventListener("input",function(){
    if(volume.value==0){
        audioIcon.src="./images/audio/audio_mute.svg"
        soundtrack.pause();
    }
    else
        audioIcon.src="./images/audio/audio_play.svg"
    
    soundtrack.volume=volume.value;})

document.getElementById("audiobutton").addEventListener("click",muteAudio);

document.getElementById("div_audio").addEventListener("mouseover",function(){
    let img=audioIcon.src;
    if(!img.includes("mute"))
        document.getElementById("setvolume").classList.remove("hidden");
});
document.getElementById("div_audio").addEventListener("mouseout",function(){
    document.getElementById("setvolume").classList.add("hidden");
});


function muteAudio(){
    if(soundtrack.paused){
        volume.value=0.3;
        soundtrack.volume=volume.value;
        audioIcon.src="./images/audio/audio_play.svg"
        soundtrack.play();
    }
    else{
        soundtrack.pause();
        audioIcon.src="./images/audio/audio_mute.svg"
    }
    

}





