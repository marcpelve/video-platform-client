import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class Favorites extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: []
    }
  }

  componentDidMount () {
    const { alert, user } = this.props

    axios({
      url: `${apiUrl}/favorites`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => this.setState({ videos: res.data.user.favorites }))
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
      <Col xs='12' sm='4' md='3' lg='3' xl='2' key={video._id} style={{ textAlign: 'center' }}>
        <a style={{ height: '230px', display: 'inline-block' }} href={`#videos/${video._id}`} >
          <img style={{ width: '100%', objectPosition: 'top', objectFit: 'cover', height: '100%' }} src={video.imageUrl} />
        </a>
        <p>{video.title} ({video.year})</p>
      </Col>
    ))

    if (!this.state.videos[0]) return <img src="https://cdn.dribbble.com/users/107759/screenshots/2436386/copper-loader.gif"/>

    return (
      <Fragment>
        <Container className="mt-4">
          <Row className='justify-content-center'>
            {this.state.videos ? videos : 'No videos'}
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default Favorites
