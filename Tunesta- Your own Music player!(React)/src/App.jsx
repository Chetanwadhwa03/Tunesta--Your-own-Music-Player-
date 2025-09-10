import Maincontent from "./components/Maincontent"
import Playbar from "./components/Playbar"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <>
      <div className="container flex bg-black">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right">
          <Maincontent />
        <div className="playbar">
          <Playbar />
        </div>
        </div>
      </div>
        
    </>
  )
}

export default App
