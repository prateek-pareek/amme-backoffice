import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Page3 from './components/Page3'
import Page9 from './components/Page9'
import Page10 from './components/Page10'
import Page4 from './components/Page4'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page1/>}/>
      <Route path='/page2' element={<Page2/>}/>
      <Route path='/page3' element={<Page3/>}/>
      <Route path='/page4' element={<Page4/>}/>
      <Route path='/page9' element={<Page9/>}/>
      <Route path='/page10' element={<Page10/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
