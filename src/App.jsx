
import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AielitaPage from './pages/AielitaPage'
import AliaskatPage from './pages/AliaskatPage'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/nur'/>
        <Route path='/med'/>
        <Route path='/aie' element={<AielitaPage/>}/>
        <Route path='/sam'/>
        <Route path='/ami'/>
        <Route path='/bai'/>
        <Route path='/ali' element={<AliaskatPage/>} />
        <Route path='/ily' />
        <Route path='/erm' />
        <Route path='/ari' />
      </Routes>
    </Router>
    </>
  )
}

export default App
