import React, { Component } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import mapValues from 'lodash/mapValues'

import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class EditVideo extends Component {
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
      selected: {
        action: false,
        adventure: false,
        comedy: false,
        crime: false,
        drama: false,
        fantasy: false,
        historical: false,
        horror: false,
        political: false,
        romance: false,
        sciencefiction: false,
        thriller: false,
        western: false
      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/videos/${this.props.match.params.id}`)
      .then(res => this.setState({ video: res.data.video }))
      .then(() => {
        const newStateSelected = mapValues({ ...this.state.selected }, () => false)
        for (const category of this.state.video.category) {
          newStateSelected[category.toLowerCase().trim()] = true
        }
        this.setState({ selected: newStateSelected })
      })
      .catch(() => {
        alert({
          heading: 'Failed to retrieve video',
          message: messages.getVideoFailure,
          variant: 'danger'
        })
      })
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedMovie = Object.assign(this.state.video, updatedField)

    this.setState({ video: editedMovie })
  }

  handleSelectChange = event => {
    const list = event.target.selectedOptions
    const values = []
    const selectFields = { }

    for (const item of list) {
      values.push(item.value)
      selectFields[item.value.toLowerCase] = true
    }

    const newStateSelected = Object.assign(this.state.selected, selectFields)
    this.setState({ selected: newStateSelected })

    const field = { [event.target.name]: values }
    const newVideo = Object.assign(this.state.video, field)

    this.setState({ video: newVideo })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { alert } = this.props

    if (!this.state.video.videoUrl.includes('youtube.com')) {
      alert({
        heading: 'Failed to edit video',
        message: messages.wrongUrlFormat,
        variant: 'danger'
      })
      this.setState({ video: { ...this.state.video, videoUrl: '' } })
    } else {
      axios({
        url: `${apiUrl}/videos/${this.props.match.params.id}`,
        method: 'PATCH',
        data: { video: this.state.video }
      })
        .then(() => this.setState({ updated: true }))
        .catch(() => {
          alert({
            heading: 'Failed to edit video',
            message: messages.createVideoFailure,
            variant: 'danger'
          })
        })
    }
  }

  render () {
    const { video, updated } = this.state

    if (updated) {
      return <Redirect to={`/videos/${this.props.match.params.id}`} />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label className='mr-2'>Title</label>
        <input
          placeholder="Title"
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
        <select multiple name="category" id="category-select" onChange={this.handleSelectChange} style={{ height: '150px' }} required>
          <option selected={this.state.selected.action} value="Action">Action</option>
          <option selected={this.state.selected.adventure} value="Adventure">Adventure</option>
          <option selected={this.state.selected.comdey} value="Comedy">Comedy</option>
          <option selected={this.state.selected.crime} value="Crime">Crime</option>
          <option selected={this.state.selected.drama} value="Drama">Drama</option>
          <option selected={this.state.selected.fantasy} value="Fantasy">Fantasy</option>
          <option selected={this.state.selected.historical} value="Historical">Historical</option>
          <option selected={this.state.selected.horror} value="Horror">Horror</option>
          <option selected={this.state.selected.political} value="Political">Political</option>
          <option selected={this.state.selected.romance} value="Romance">Romance</option>
          <option selected={this.state.selected.sciencefiction} value="Science fiction">Science fiction</option>
          <option selected={this.state.selected.thriller} value="Thriller">Thriller</option>
          <option selected={this.state.selected.western} value="Western">Western</option>
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

export default withRouter(EditVideo)
