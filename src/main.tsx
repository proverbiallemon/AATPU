import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Dynamic import of amplify_outputs.json
const getAmplifyOutputs = async () => {
  try {
    return await import('../amplify_outputs.json')
  } catch (error) {
    console.warn('Failed to load amplify_outputs.json:', error)
    return {}
  }
}

getAmplifyOutputs().then((amplifyOutputs) => {
  // You can use amplifyOutputs here if needed
  console.log('Amplify outputs:', amplifyOutputs)
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})