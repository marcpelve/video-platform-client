import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class Videos extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: []
    }
  }

  componentDidMount () {
    const { alert } = this.props

    axios.get(`${apiUrl}/videos`)
      .then(res => this.setState({ videos: res.data.videos }))
      .catch(() => {
        alert({
          heading: 'Failed to index videos',
          message: messages.indexVideosFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const videos = this.state.videos.map(video => (
      <Col md="2" key={video._id}>
        <a href={`#videos/${video._id}`} >
          <img style={{ height: '250px', width: '180px' }} src={video.imageUrl} />
        </a>
        <p>{video.title} ({video.year})</p>
      </Col>
    ))

    if (!this.state.videos[0]) return <img src="https://cdn.dribbble.com/users/107759/screenshots/2436386/copper-loader.gif"/>

    return (
      <Fragment>
        <Container className="mt-4">
          <Row>
            {this.state.videos ? videos : 'No videos'}
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default Videos
