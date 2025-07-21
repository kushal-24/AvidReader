import React from 'react'
import { Login as LoginComponent } from '../components'
import Transition from '../Transition'

function Login() {
  return (
    <div className='py-8'>
        <LoginComponent />
    </div>
  )
} 

export default Transition(Login)