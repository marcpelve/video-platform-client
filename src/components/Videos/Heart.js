import React, { useState, useEffect } from 'react'
import axios from 'axios'

import apiUrl from './../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const styles = {
  svg: {
    width: '2rem',
    userSelect: 'none',
    cursor: 'pointer'
  }
}

const Heart = ({ user, alert, videoId }) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/favorites/${videoId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setLiked(res.data.user.favorited))
      .catch(() => {
        alert({
          heading: 'Failed to determine liked video',
          message: messages.getLikedFailure,
          variant: 'danger'
        })
      })
  }, [])

  const apiLike = () => {
    axios({
      url: `${apiUrl}/favorites/add/${videoId}`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setLiked(!liked))
      .catch(() => {
        alert({
          heading: 'Failed to determine liked video',
          message: messages.getLikedFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280.23 258.19" style={styles.svg} onClick={apiLike}>
      <path
        id={'heart' + videoId}
        d="M140.32,248.11c-9.8-10.06-18.64-19.29-27.66-28.35q-33.14-33.27-66.4-66.41c-7.5-7.5-15.68-14.46-22.29-22.67a74.78,74.78,0,0,1-16.74-42C5.8,69.62,11.09,52.59,22,37.37A66.86,66.86,0,0,1,46,16.92c11.87-6.11,24.43-10.33,38-9.6,18.16,1,34.6,6.66,48.19,19.29,2.52,2.35,5.27,4.45,7.66,6.45,6.63-5,12.62-10.7,19.68-14.37a114.62,114.62,0,0,1,27-10.27c16.1-3.65,31.73,0,46,7.67,25.42,13.59,39.09,35,40.61,64,1,18.74-4.93,35.32-16.11,49.77-6.55,8.46-14.95,15.48-22.56,23.1q-37.08,37.09-74.16,74.19C153.75,233.77,147.46,240.61,140.32,248.11Z"
        style={{
          fill: liked ? 'pink' : 'lightgray',
          stroke: liked ? 'deeppink' : 'gray'
        }}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="14"
      />
      <path
        d="M36.17,79c-.85-23.71,32.14-49.81,54-44.74"
        style={{
          fill: liked ? 'pink' : 'lightgray',
          stroke: liked ? 'deeppink' : 'gray'
        }}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="14"
      />
    </svg>
  )
}

export default Heart
