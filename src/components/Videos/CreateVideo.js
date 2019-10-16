import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class CreateVideo extends Component {
  constructor (props) {
    super(props)

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

  handleSelectChange = event => {
    const list = event.target.selectedOptions
    const values = []
    for (const item of list) {
      values.push(item.value)
    }

    const field = { [event.target.name]: values }
    const newVideo = Object.assign(this.state.video, field)

    this.setState({ video: newVideo })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { alert } = this.props

    if (!this.state.video.videoUrl.includes('youtube.com')) {
      alert({
        heading: 'Failed to add video',
        message: messages.wrongUrlFormat,
        variant: 'danger'
      })
      this.setState({ video: { ...this.state.video, videoUrl: '' } })
    } else {
      axios.post(`${apiUrl}/videos`, { video: this.state.video })
        .then(res => this.setState({ redirectId: res.data.video._id }))
        .catch(() => {
          alert({
            heading: 'Failed to add video',
            message: messages.createVideoFailure,
            variant: 'danger'
          })
        })
    }
  }

  render () {
    const { video, redirectId } = this.state

    if (redirectId) return <Redirect to={`/videos/${redirectId}`}/>

    return (
      <form onSubmit={this.handleSubmit}>
        <label className='mr-2'>Title</label>
        <input
          placeholder="Name"
          value={video.title}
          name="title"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label className='mr-2'>Date Released</label>
        <input
          type="number"
          placeholder="2019"
          value={video.year}
          name="year"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label className='mr-2'>Description</label>
        <input
          placeholder=""
          value={video.description}
          name="description"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label className='mr-2'>Trailer URL (youtube.com links accepted only)</label>
        <input
          placeholder="youtube.com"
          value={video.videoUrl}
          name="videoUrl"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label className='mr-2'>Poster URL (image source with extension)</label>
        <input
          placeholder="image.com/png"
          value={video.imageUrl}
          name="imageUrl"
          onChange={this.handleChange}
          required
        />
        <br/>
        <label>Category (ctrl or cmd to select mutliple)</label>
        <br/>
        <select multiple name="category" id="category-select" onChange={this.handleSelectChange} style={{ height: '150px' }} >
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Historical">Historical</option>
          <option value="Horror">Horror</option>
          <option value="Political">Political</option>
          <option value="Romance">Romance</option>
          <option value="Science fiction">Science fiction</option>
          <option value="Thriller">Thriller</option>
          <option value="Western">Western</option>
        </select>
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
