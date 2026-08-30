
import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
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
        <Route path='/erm' />
        <Route path='/ari' element={<Ari />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
