import React, { Component, Fragment } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import apiConfig from '../../apiConfig'

class Video extends Component {
  constructor (props) {
    super(props)

    this.state = {
      video: null,
      deleted: null
    }
  }

  componentDidMount () {
    axios(`${apiConfig}/videos/${this.props.match.params.id}`)
      .then(res => this.setState({ video: res.data.video }))
      .catch(console.error)
  }

  edit = () => {
    this.setState({ queueEdit: true })
  }

  destroy = () => {
    axios.delete(`${apiConfig}/videos/${this.state.video._id}`)
      .then(res => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { video, deleted } = this.state
    if (!video) return <img src="https://media1.giphy.com/media/l4FGv5Ci0WIp8kYhO/giphy.gif"/>
    if (deleted) return <Redirect to='/videos'/>

    return (
      <Fragment>
        <h3>{video.title} ({video.year})</h3>
        <p>{video.category.join(', ')}</p>
        <p>{video.description}</p>
        <img style={{ height: '250px', width: '180px' }} src={video.imageUrl} />
        <br/>
        <div style={{ marginTop: '1rem' }}>
          <Link to={`/videos/${video._id}/edit`}><Button className='mr-2'>Update this Video</Button></Link>
          <Button className='mr-2' onClick={this.destroy}>Delete this Video</Button>
          <Link to="/videos"><Button>Back to all videos</Button></Link>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Video)
