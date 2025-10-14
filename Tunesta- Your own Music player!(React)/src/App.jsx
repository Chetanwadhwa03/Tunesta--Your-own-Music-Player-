import Maincontent from "./components/Maincontent"
import Playbar from "./components/Playbar"
import Sidebar from "./components/Sidebar"
import CursorGlow from "./components/Mousemove"
import React, { useState, useEffect, useRef } from "react"


function App() {
  // Initialising the albums state with an empty array.
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentsong, setCurrentSong] = useState(null);
  // Lifting state up(from the playbar.jsx)
  const [isplaying, setIsPlaying] = useState(false);

  // State to track the currentIndex, intially the value will be 0 because the first song is playing.
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to display the songTime and the song duration
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  // State to store the songTime and the song duration in seconds for the seekbar circle to move smoothly.

  const[currentTimeInSeconds, setcurrentTimeInSeconds] = useState(0);
  const[durationInSeconds, setdurationInSeconds] = useState(0);




  // State to set the currentVolume(1:100% & 0:0%)
  const [volume, setVolume] = useState(1);





  // Creating a useRef hook, as an global remote which will be paired after sometime.
  const audioref = useRef(null);


  // Using my useffect hook, this will run only on the first render.
  useEffect(() => {
    const fetchalbums = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/albums`);
        const data = await response.json();
        setAlbums(data);
        console.log("The data has been fetched successfully: ", data);
      } catch (error) {
        console.log("Failed to fetch albums: ", error);
      }
    }
    fetchalbums();
  }, [])


  // This useEffect hook will be executed whenever the isplaying or the currentsong state will change, that is being used to play/pause the song.

  // Since if we just play/pause the song, and if we directly change the src everytime then the major bug would be that whenever we pause a song then play then it will again and again start from beginning, so for that we have made an if condition that if the newsrc is not equal to the currentsrc then only the src should change, and the fact is when we will just play pause the button then the newsrc would remain the same as the audioref src and therfore the audioref src will not change the if statement will not be executed and thereby the song will not again and again play from the starting. 

  useEffect(() => {
    if (audioref.current) {
      // Because initially the value of the audioref.current would be NULL so to check now whether the audioref remote control has been paired to our audio object TV in the playbar.jsx.

      if (isplaying && currentsong) {
        const newsrc=`${import.meta.env.VITE_API_URL}${currentsong.path}`;
        if(audioref.current.src !== newsrc){
          audioref.current.play();
        }
      }
      else {
        audioref.current.pause();
      }
    }
  }, [isplaying,currentsong]);

  
  // When the volume state changes, then we have to make sure that it effects on the audio tag inbuilt attribute volume also
  useEffect(() => {
    if (audioref.current) {
      audioref.current.volume = volume;
    }
  }, [volume])


  // function to play the music(Logic was already there in the vanilla.js), Here my vanilla JS code is treating the current song as the global audio object but in reality it is a state which we have made in react.

  // const playmusic = (track, pause = false) => {
  //   // let audio= new Audio("/songs/"+track);
  //   if (!pause) {
  //     // currentsong is not an audio object so it will be not having the play function in it, it is just a state variable.
  //     currentsong.play();
  //     play.src = "img/pausesong.svg";
  //   }
  // }

  // async function getsongs(folder) {
  //   let a = await fetch(`/${folder}}/`);
  //   let response = await a.text();
  //   return response;
  // }


  // // Function for the dynamic behaviour when an album is clicked
  // const onalbumclick = async (album) => {
  //   // When the respective album is clicked the songs from it are fetched and inserted in to this variable fetchedsongs.
  //   const fetchedsongs = await getsongs(`songs/${album.songs}`)
  //   // Why these dollar signs: doubt

  //   // If fetchedsongs have some song then
  //   if (fetchedsongs && fetchedsongs.length > 0) {

  //     // fetchedsongs was an array and now using this function in the songs variable the array with the songswill come.
  //     setsongs(fetchedsongs);
  //     const firstsong = fetchedsongs[0];
  //     // same this function will help to enter the currentsong in the currentsong variable.
  //     setcurrentsong(firstsong);
  //     // This will mark the isplaying variable true
  //     setisplaying(true);
  //     // Then the playmusic function that was built in vanillajs we will pass the firstsong in to it: and that i have stated that it will not work because of the reason i have already mentioned.
  //     playmusic(firstsong, false);
  //   }
  // }



  // Creating the useEffect hook for the audio object that we have build in the playbar.jsx.
  // Imp: It is generally advised to allow the react manage as much as the DOM possible , so use this useref hook only for the cases where the work cannot be managed by the state and the props. like media player like things.

  const handleAlbumClick = (album) => {
    if (album.songs && album.songs.length > 0) {
      const firstsong = album.songs[0];


      // Now updating the brain's memory with the new information.
      setSongs(album.songs);
      setCurrentSong(firstsong);
      setIsPlaying(true);
      setCurrentIndex(0);

    }
  }


  const handleNextButton = () => {
    if (songs.length === 0) {
      return;
    }
    else {
      const nextindex = (currentIndex + 1) % (songs.length);
      setCurrentIndex(nextindex);
      setCurrentSong(songs[nextindex])
      setIsPlaying(true)

    }

  }

  const handlePrevButton = () => {
    if (songs.length === 0) {
      return;
    }
    else {
      const previndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentIndex(previndex);
      setCurrentSong(songs[previndex]);
      setIsPlaying(true)
    }
  }

  const muteplaytoggle =()=>{
    (volume === 0 ? setVolume(1) : setVolume(0) );
  }











  return (
    <>
      <CursorGlow/>  
      <div className="container flex ">
        <div className="left glass-effect ">
          <Sidebar songs={songs} />
        </div>

        <div className="right">
          <Maincontent
            albums={albums}
            handleAlbumClick={handleAlbumClick} />
          <div className="playbar glass-effect">
            <Playbar
              songs={songs}
              isplaying={isplaying}
              currentsong={currentsong}
              audioref={audioref}
              setisplaying={setIsPlaying}
              handleNextButton={handleNextButton}
              handlePrevButton={handlePrevButton}
              duration={duration}
              setDuration={setDuration}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              volume={volume}
              setVolume={setVolume}
              muteplaytoggle={muteplaytoggle}
              currentTimeInSeconds={currentTimeInSeconds}
              setcurrentTimeInSeconds={setcurrentTimeInSeconds}
              durationInSeconds={durationInSeconds}
              setdurationInSeconds={setdurationInSeconds} />
          </div>
        </div>
      </div>

      

    </>
  )
}


export default App
