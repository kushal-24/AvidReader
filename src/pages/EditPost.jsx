import React,{useEffect, useState} from 'react'
import { Container } from '../components'
import appwriteService from '../appWrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const[post,setPost] = useState(null)  
    const{slug}=useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post) {
                    setPost(post);
                }
            })
        }
    },[slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
}

export default EditPost