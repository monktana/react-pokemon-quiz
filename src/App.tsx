import React, { Suspense } from 'react'

import './App.css'
import { Game } from './components/game'

function App(): JSX.Element | null {
  return (
    <Suspense fallback={(<>Loading</>)}>
      <Game/>
    </Suspense>
  )
}

export default App
