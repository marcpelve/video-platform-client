import React, { Component, Fragment } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import apiConfig from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class Video extends Component {
  constructor (props) {
    super(props)

    this.state = {
      video: null,
      deleted: null
    }
  }

  componentDidMount () {
    const { alert } = this.state

    axios(`${apiConfig}/videos/${this.props.match.params.id}`)
      .then(res => this.setState({ video: res.data.video }))
      .catch(() => {
        alert({
          heading: 'Failed to retrieve video',
          message: messages.getVideoFailure,
          variant: 'danger'
        })
      })
  }

  edit = () => {
    this.setState({ queueEdit: true })
  }

  destroy = () => {
    axios.delete(`${apiConfig}/videos/${this.state.video._id}`)
      .then(res => this.setState({ deleted: true }))
      .catch(() => {
        alert({
          heading: 'Failed to delete video',
          message: messages.deleteVideoFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { video, deleted } = this.state
    if (!video) return <img src="https://cdn.dribbble.com/users/107759/screenshots/2436386/copper-loader.gif"/>
    if (deleted) return <Redirect to='/videos'/>

    return (
      <Fragment>
        <h2>{video.title} ({video.year})</h2>
        <p>{video.category.join(', ')}</p>
        <p>{video.description}</p>
        <div style={{ maxWidth: '100vw', height: '70vh' }}>
          <iframe
            width="100%"
            height="100%"
            src={`${this.state.video.videoUrl.replace('watch?v=', 'embed/')}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
        <br/>
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/videos"><Button variant='secondary' className='mr-2'>Back to all videos</Button></Link>
          <Link to={`/videos/${video._id}/edit`}><Button variant='warning' className='mr-2'>Update this video</Button></Link>
          <Button variant='danger' onClick={this.destroy}>Delete this video</Button>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Video)
