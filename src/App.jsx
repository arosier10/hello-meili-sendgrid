import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubscribe = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SENDGRID_API, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SENDGRID_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contacts: [{ email }]
        })
      })

      if (res.ok) setMessage('Subscribed!')
      else setMessage('Something went wrong.')
    } catch (err) {
      setMessage('Error: ' + err.message)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hello World</h1>
      <p>This is a starter site using React, Meilisearch Cloud, and SendGrid.</p>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubscribe}>Subscribe</button>
      <p>{message}</p>
    </div>
  )
}

export default App
