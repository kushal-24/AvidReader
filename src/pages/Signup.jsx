import React from 'react'
import { Signup as SignupComponent } from '../components'
import Transition from '../Transition'

function Signup() {
  return (
    <div className='py-8'>
        <SignupComponent />
    </div>
  )
}

export default Transition(Signup)