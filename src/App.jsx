import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ErmPage from './pages/ErmPage.jsx'
function App() {

  return (
    <>
    <ErmPage/>
    <Router>
      <Routes>
        <Route path='/nur'/>
        <Route path='/med'/>
        <Route path='/aie'/>
        <Route path='/sam'/>
        <Route path='/ami'/>
        <Route path='/bai'/>
        <Route path='/ali' />
        <Route path='/ily' />
        {/* <Route path='/erm' element={<ErmPage/>}/> */}
        <Route path='/ari' />
      </Routes>
    </Router>
    </>
  )
}

export default App
