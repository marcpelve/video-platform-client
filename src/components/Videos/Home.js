import React from 'react'

const layoutStyles = {
  grid: {
    display: 'grid',
    gridTemplateRows: 'auto',
    minHeight: '100vh'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 0'
  }
}

const Home = props => {
  return (
    <div style={layoutStyles.grid}>
      <main style={layoutStyles.main}>
        <img style={{ maxWidth: '30vw' }} src="https://media2.giphy.com/media/l8C9PNnlpFpny/source.gif" />
        <p>Sign in or sign up to get started!</p>
      </main>
    </div>
  )
}

export default Home
