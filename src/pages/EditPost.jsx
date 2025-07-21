import React,{useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appWrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import Transition from '../Transition'

function EditPost() {
    const[post,setPost] = useState(null)  
    const{slug}=useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post)=>{//ig a change here is needed
                if(post) {
                    setPost(post);
                }
            })
        }else{
            navigate('/');
        }
    },[slug, navigate])
    return post ? (
        <div className='py-8 mt-[8vh]'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
}

/* with return()
->our component mounts.
->post is initially null.
->PostForm post={post} is rendered immediately.
->PostForm receives post=null, and likely fails to populate the form (or skips render).
->Once post is fetched, setPost(post) triggers a re-render, but PostForm has already rendered once with empty data.
 */

/* with return post? ():null; it says:
->Don’t render anything at all until post is ready.
->So when PostForm finally renders, post is non-null, and form fields are populated.
*/

export default Transition(EditPost)