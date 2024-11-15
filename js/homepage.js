let typeDeck = ["Classiche","Austriache","Baccarat","Barocche","FrancesiAntiche","Russe","Napoletane","Tedesche","Imperiali","Lombarde","Svedesi","Salon"];
let suits = ["heart", "diamond", "club", "spade"];
let values = ["1", "2", "3", "4", "5", "6", "7", "jack", "queen", "king"];
let numberTypeDeck = 0;
let chosenDeck = "Classiche";

document.addEventListener("DOMContentLoaded", function(event) {
    showStats();
    createDeckToShow();
    
});
function createDeckToShow(){
        let chooseDeckSpan = document.getElementById("choose_deck_span");
        for(let m=0;m<typeDeck.length;m++){
            let deckContainer=document.createElement("span");
            deckContainer.classList.add("hidden",typeDeck[m]+"_deck_container");
            deckContainer.id=typeDeck[m]+"_deck_container";
            chooseDeckSpan.appendChild(deckContainer);
        for(let i=0; i<suits.length;i++){
            for(let j=0; j<values.length;j++){
                let img = document.createElement("img");
                img.src = "./images/decks/"+typeDeck[m]+"/"+suits[i]+"_"+values[j]+".png";
                img.alt = suits[i]+"_"+values[j];
                img.style.width = "5vw"; 
                img.style.height = "15vh"; 
                img.style.margin = "0 0.2vw";
                deckContainer.appendChild(img);
            }
            let br = document.createElement("br");
            deckContainer.appendChild(br);
        }
    }
}



document.getElementById("logout_btn").addEventListener("click", function() {
    let formData = new FormData();
    formData.append('action', 'logout');
    fetch('./php/action.php', {method: 'POST', body: formData})
    .then(response => response.json())
    .then(json => {
        if (json["success"]) {
            location.href = "./";
        }
    });
});

document.getElementById("choose_deck_btn").addEventListener("click", function() {
    document.getElementById("choose_deck_container").classList.remove("hidden");
    document.getElementById("play_btn").classList.add("hidden");
    document.getElementById("choose_deck_btn").classList.add("hidden");
    document.getElementById("stats_section").classList.add("hidden");

    deckName=document.createElement("h2");
    document.getElementById("deck_info_container").appendChild(deckName);
    deckName.id="deck_name";
    deckName.classList.add("deck_name");

    deckNumber=document.createElement("h3");
    document.getElementById("deck_info_container").appendChild(deckNumber);
    deckNumber.id="deck_number";
    deckNumber.classList.add("deck_number");

    showDeck();
});
document.getElementById("back_to_homepage").addEventListener("click", () => {
    backToHomepage(false)
    document.getElementById("deck_info_container").removeChild(document.getElementById("deck_name"));
    document.getElementById("deck_info_container").removeChild(document.getElementById("deck_number"));
});

document.getElementById("confirm_choise_btn").addEventListener("click", () => {
    chosenDeck = typeDeck[numberTypeDeck];
    backToHomepage(false);
    
    document.getElementById("deck_info_container").removeChild(document.getElementById("deck_name"));
    document.getElementById("deck_info_container").removeChild(document.getElementById("deck_number"));
});

document.getElementById("change_deck_right").addEventListener("click", function() {

    removeDeck();

    if(numberTypeDeck===typeDeck.length-1)
        numberTypeDeck=0;
    else
        numberTypeDeck++;

        
    showDeck();
    
});
document.getElementById("change_deck_left").addEventListener("click", function() {
    removeDeck();

    if(numberTypeDeck===0)
        numberTypeDeck=typeDeck.length-1;
    else
        numberTypeDeck--;

    showDeck();
    
});
/*Questi event listener mostrano il bottone di logout quando si passa sopra al nome utente*/
document.getElementById("homepage_header_container").firstElementChild.addEventListener("mouseover", function() {
    document.getElementById("logout_btn_container").classList.remove("hidden");
});
document.getElementById("homepage_header_container").firstElementChild.addEventListener("mouseout", function() {
    document.getElementById("logout_btn_container").classList.add("hidden");
});

document.getElementById("logout_btn_container").addEventListener("mouseout", function() {
    document.getElementById("logout_btn_container").classList.add("hidden");
});
document.getElementById("logout_btn_container").addEventListener("mouseover", function() {
    document.getElementById("logout_btn_container").classList.remove("hidden");
});

function showDeck() {
    document.getElementById("deck_name").innerText = typeDeck[numberTypeDeck];
    document.getElementById("deck_number").innerText = numberTypeDeck+1+"/"+typeDeck.length;
    document.getElementById(typeDeck[numberTypeDeck]+"_deck_container").classList.remove("hidden");
    }


function removeDeck() {
    document.getElementById(typeDeck[numberTypeDeck]+"_deck_container").classList.add("hidden");
}

function backToHomepage(fromGame) {
    if(fromGame){
        document.getElementById("homepage_header_container").classList.remove("hidden");
        document.getElementById("homepage_main_container").classList.remove("hidden");
        document.getElementById("game_container").classList.add("hidden");
        document.getElementById("back_to_home_container").classList.add("hidden");
        document.getElementById("more_info").classList.remove("hidden");
    }
    else{
    document.getElementById("choose_deck_container").classList.add("hidden");
    document.getElementById("play_btn").classList.remove("hidden");
    document.getElementById("choose_deck_btn").classList.remove("hidden");
    document.getElementById("stats_section").classList.remove("hidden");
    removeDeck(); 
}  
}

document.getElementById("order_stats").addEventListener("change", function() {
    showStats(this.value);
});

function showStats(orderBy="wins"){
    fetch(`./php/stats.php?order=${orderBy}`, {method: 'GET'})
    .then(response => response.json())
    .then(json => {
        let table = document.getElementById("stats_table");
        let tbody = table.getElementsByTagName("tbody")[0];
        tbody.innerHTML="";
        
        let tr,td,position=1;
        if(json.length){

            json.forEach(player => {
                tr=tbody.insertRow();

                td=tr.insertCell();
                td.innerText=position+"°";
                switch(position){
                    case 1:
                        td.style.color="#ffd700";
                        break;
                    case 2:
                        td.style.color="#c0c0c0";
                        break;
                    case 3:
                        td.style.color="#cd7f32";
                        break;
                }

                td=tr.insertCell();
                td.innerText=player.username;

                td=tr.insertCell();
                td.innerText=player.totalgames;

                td=tr.insertCell();
                td.innerText=(player.wins)?player.wins:0;
                
                td=tr.insertCell();
                td.innerText=(player.draws)?player.draws:0;

                td=tr.insertCell();
                td.innerText=(player.loses)?player.loses:0;

                td=tr.insertCell();
                td.innerText=player.points;

                td=tr.insertCell();
                td.innerText=Math.round((player.wins/player.totalgames)*100)+"%";

                td=tr.insertCell();
                td.innerText=Math.round((player.points/player.totalgames));

                position++;
            });
        }
        else{
            tr=tbody.insertRow();
            td=tr.insertCell();
            td.colSpan=9;
            td.innerText="Non ci sono statistiche da mostrare";
        }

    });
}
