import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"


function Root() {


  return (
    <>
    <Navbar/>
    <div id="content">
    <Outlet/>
    </div>

    </>
  )
}

export default Root
