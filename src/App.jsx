import { useState } from 'react'

import './App.css'
import AddItems from './dashboard/addItems'
import HandleAdded from './dashboard/handleAdded'

function App() {
  
  return (
    <>
      <AddItems />
      <HandleAdded />
    </>
  )
}

export default App
