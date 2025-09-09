import Maincontent from "./components/Maincontent"
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

        </div>
      </div>

    </>
  )
}

export default App
