import React, { Component } from 'react'
import Movies from './components/movies.jsx'
class App extends Component {
  render() {
    return (
      <div className="container mt-2">
        <Movies />
      </div>
    )
  }
}


export default App;