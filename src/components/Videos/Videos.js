import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import apiUrl from '../../apiConfig'

class Videos extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: []
    }
  }

  componentDidMount () {
    axios.get(`${apiUrl}/videos`)
      .then(res => this.setState({ videos: res.data.videos }))
      .catch(console.error)
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

    if (!this.state.videos[0]) return <img src="https://media1.giphy.com/media/l4FGv5Ci0WIp8kYhO/giphy.gif"/>

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
