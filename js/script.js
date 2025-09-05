console.log("welcome to JS");
let songs;
let currentsong = new Audio();
let currfolder;

// This is a function used to convert the time from seconds in to minutes and to show it in the format of mins:sec, if requirement of padzeroes would be there it would be done.
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    // Add leading zeros if needed
    mins = String(mins).padStart(2, '0');
    secs = String(secs).padStart(2, '0');

    return `${mins}:${secs}`;
}


// We will get this songs through API's when we will study about backend because will be bringing this songs from the server side but for now we are just making a function that would give me the array of the songs from this function and this function is also good for the learning purposes.

// while making dynamic albums, we have taken an argument named folder in the getsongs function so that we could play the songs from the folder, not directly to songs, and then accordingly we are making the changes.
async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`/${currfolder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${currfolder}/`)[1]);
        }
    }

    // webpage mein songlist class ke pahle ul ko pakad liya ab usme gaane dalwayenge with the respective images and all.
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Chetan</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/playsong.svg" alt="">
                            </div> </li>`;
    }

    // Attach event-listener to all the songs
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })

    return songs;
}

// This function helps us to play the music when it is not going on that is when pause is false or vice versa wise you can say when play will be true and also it updates the songinfo and songtime classes.
const playmusic = (track, pause = false) => {
    // let audio= new Audio("/songs/"+track);
    currentsong.src = `${currfolder}/${track}`;
    if (!pause) {
        currentsong.play();
        play.src = "img/pausesong.svg";


    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00 ";

}


// This functions helps to display the different albums dynamically that builds a new feature for it, it is not hardcoded in HTML.

async function DisplayAlbums() {
    // This fetch is happening from the local server(VS code preview) and this will see that the songs is a directory so it will give a html code for that songs directory having some anchors tags for the files present inside them.
    let a = await fetch(`/songs/`);
    let response = await a.text();

    // We make this div because we have to use DOM, so we kinda make a mini webpage inside our main webpage that is hidden to user, but we are using it to access the elements using the DOM of the JS.
    let div = document.createElement("div");
    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a");


    let cardcontainer = document.querySelector(".cardcontainer");

    // since anchors is a HTML collection so we cannot apply foreach to it so we are converting it to array.
    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("\songs")) {
            // This folder will contain all the folder names that will be present in the song directory
            let folder = e.href.split("/").slice(-2)[0];
            console.log(folder);

            // Now my next task is to fetch the info.json file from the folders in the directory songs.
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
            let response = await a.json();

            // This info.json file i am gonna use to populate my albums that is cards that will eventually make it dynamic insertion of the cards.

            cardcontainer.innerHTML = cardcontainer.innerHTML + `<div data-folder="${folder}" class="card">
                            <div class="play">
                                <svg role="img" height="50" width="50" aria-hidden="true" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="12" fill="#1DB954" />
                                    <polygon points="9,7 17,12 9,17" fill="#000000" />
                                </svg>
                            </div>
                            <img src="/songs/${folder}/cover.jpg" alt="song image">
                            <h2>${response.title}</h2>
                            <p>${response.description}</p>
                        </div>`
        }
    }

        // Adding functionality to the Card, Loading the playlist whenever the card is clicked.
        Array.from(document.getElementsByClassName("card")).forEach(e => {
            e.addEventListener("click", async (item) => {
                songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
                playmusic(songs[0]);
            })
        })
}

// This is the main function of our program, in which everything is going on when the webpage is opened, this runs mainly as our JS
async function main() {
    await getsongs("songs/romanticsongs");
    playmusic(songs[0], true);

    // Display the Albums on the page.  
    DisplayAlbums();


    // attach event-listener to play,prev and next.
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "img/pausesong.svg";
        }
        else {
            currentsong.pause();
            play.src = "img/playsong.svg";
        }
    })

    // currentsong play hone pe kya kya karwan hain.
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })

    // seekbar ko response karna seekha raha hu
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = (currentsong.duration * percent) / 100;

    })

    // adding functionality to the hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    })



    // Applying event listener to the previous button
    previous.addEventListener("click", () => {
        console.log("previous button clicked");
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1]);
        }
    })

    // Applying event listener to the next button
    // theory regarding slice and splice, slice(startindex, endindex), it gives me a new array according to the index mentioned.
    // In splice it changes the original array, used for deleting, inserting and replacing elements in the exisiting array Syntax: splice(startindex,no.of eleme to be removed, element1toadd, element2toadd);

    next.addEventListener("click", () => {
        console.log("Next button clicked");
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        let nextindex = (index + 1) % (songs.length);
        if ((index + 1) < songs.length) {
            playmusic(songs[nextindex]);
        }
        // ye statement is in my program only and this for the function that when the songs gets finished then it loops over.
        else {
            playmusic(songs[nextindex]);
        }
    })

    // we have adjusted our slidebar of volume. currentsong here is our audio object, .volume is property of it adjust the volume, if e is the event object then e.target gives us the element that triggered that event and e.target.value would give us the current value of the slider , and by default it gives us a string so we convert it firstly to integer, and audio object of JS usually takes value between 0 and 1, therefore we have divided it by 100.

    // as an event listener you can take change, but it helps change the audio when the mouse is released so instead of it we can take input.
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("input", (e) => {
        console.log("Setting audio to: ", e.target.value)
        currentsong.volume = parseInt(e.target.value) / 100;
    })

    // Adding event listener to the mute and volume buttons
    document.querySelector(".volume>img").addEventListener("click", (e)=>{
        if(e.target.src.includes("volume-on.svg")){
            e.target.src=e.target.src.replace("volume-on.svg","volume-mute.svg");
            currentsong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0;
        }
        else{
            e.target.src=e.target.src.replace("volume-mute.svg","volume-on.svg");
            currentsong.volume = .1;
            document.querySelector(".range").getElementsByTagName("input")[0].value=10;
        }
    })


}
main();