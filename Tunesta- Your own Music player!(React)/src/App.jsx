import Maincontent from "./components/Maincontent"
import Playbar from "./components/Playbar"
import Sidebar from "./components/Sidebar"
import React, { useState, useEffect, useRef } from "react"


function App() {
  // Initialising the albums state with an empty array.
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentsong, setCurrentSong] = useState(null);
  // Lifting state up(from the playbar.jsx)
  const [isplaying, setIsPlaying] = useState(false);

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


  const handleAlbumClick = (album) => {
    if (album.songs && album.songs.length > 0) {
      const firstsong = album.songs[0];


      // Now updating the brain's memory with the new information.
      setSongs(album.songs);
      setCurrentSong(firstsong);
      setIsPlaying(true);

    }
  }

  // Creating the useEffect hook for the audio object that we have build in the playbar.jsx.
  // Imp: It is generally advised to allow the react manage as much as the DOM possible , so use this useref hook only for the cases where the work cannot be managed by the state and the props. like media player like things.

  useEffect(() => {
    if (audioref.current) {
      // Because initially the value of the audioref.current would be NULL so to check now whether the audioref remote control has been paired to our audio object TV in the playbar.jsx.

      if (isplaying && currentsong) {
        audioref.current.src=`${import.meta.env.VITE_API_URL}${currentsong.path}`;
        audioref.current.play();
      }
      else {
        audioref.current.pause();
      }
    }
  }, [isplaying, currentsong]);













  return (
    <>
      <div className="container flex bg-black">
        <div className="left">
          <Sidebar songs={songs} />
        </div>

        <div className="right">
          <Maincontent
            albums={albums}
            handleAlbumClick={handleAlbumClick} />
          <div className="playbar">
            <Playbar
              isplaying={isplaying}
              currentsong={currentsong}
              audioref={audioref}
              setisplaying={setIsPlaying} />
          </div>
        </div>
      </div>

    </>
  )
}


export default App
