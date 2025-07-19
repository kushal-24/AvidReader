import React from 'react'
import { Container } from '../components'
import { PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8'>
        <Container className=' mt-[9vh]'>
            <PostForm/>
        </Container>

    </div>
  )
}

export default AddPost;