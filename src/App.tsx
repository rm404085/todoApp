
import { Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Navbar'


function App() {


  
 

  return (
    <>
      <div>
        <Header></Header>
        <Outlet></Outlet>

        
      </div>
    </>
  )
}

export default App
