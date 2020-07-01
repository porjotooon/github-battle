import React, { Component } from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'

const Instructions = () => {
    return(
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>INSTRUCTIONS</h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li>
                    <h3 className='header-sm'>Enter two Github users</h3>
                    <FaUserFriends className='bg-light' size={140} color='rgb(255,191,116)' />
                </li>
                <li>
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className='bg-light' size={140} color='#727272' />
                </li>
                <li>
                    <h3 className='header-sm'>See the winner</h3>
                    <FaTrophy className='bg-light' size={140} color='rgb(255,215,0)' />
                </li>
            </ol>
        </div>
    )
}

export default class Battle extends Component {
    render(){
        return(
            <>
                <Instructions />
            </>
        )
    }
}