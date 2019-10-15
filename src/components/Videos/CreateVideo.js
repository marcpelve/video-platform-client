import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class CreateVideo extends Component {
  constructor (props) {
    super()

    this.state = {
      video: {
        title: '',
        year: '',
        description: '',
        videoUrl: '',
        imageUrl: '',
        category: ['']
      },
      redirectId: null
    }
  }

  handleChange = event => {
    const field = { [event.target.name]: event.target.value }
    const newVideo = Object.assign(this.state.video, field)

    this.setState({ video: newVideo })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios.post(`${apiUrl}/videos`, { video: this.state.video })
      .then(res => this.setState({ redirectId: res.data.video.id }))
      .catch(console.error)
  }
  render () {
    const { video, redirectId } = this.state

    if (redirectId) return <Redirect to={`/videos/${redirectId}`}/>

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title</label>
        <input
          placeholder="Name"
          value={video.title}
          name="title"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label>Date Released</label>
        <input
          type="number"
          placeholder="2019"
          value={video.year}
          name="year"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label>Description</label>
        <input
          placeholder=""
          value={video.description}
          name="description"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label>Trailer URL</label>
        <input
          placeholder="youtube.com"
          value={video.videoUrl}
          name="videoUrl"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label>Poster URL</label>
        <input
          placeholder="image.com/png"
          value={video.imageUrl}
          name="imageUrl"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label>Category</label>
        <input
          placeholder="Drama"
          value={video.category}
          name="category"
          onChange={this.handleChange}
          required
        />
        <br/>
        <button type="submit">Submit</button>
        <Link to="/videos">
          <button>Cancel</button>
        </Link>
      </form>
    )
  }
}

export default CreateVideo
