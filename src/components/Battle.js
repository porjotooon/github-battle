import React, { Component } from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'
import PropTypes from 'prop-types'

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

class Player extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({username: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault() // we don't want to have the normal browser events take place

        this.props.onSubmit(this.state.username)
    }

    render(){
        return (
            <form className='column player' onSubmit={this.handleSubmit}>
                <label htmlFor='username' className='player-label'>
                    {this.props.label}
                </label>
                <div className='row player-inputs'>
                    <input
                      type='text'
                      id='username'
                      className='input-light'
                      placeholder='github username'
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    <button className='btn dark-btn' type='submit' disabled={!this.state.username}>
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

const PlayerPreview = ({ username, onReset, label }) => {
    return(
        <div className='column player'>
            {username}
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}
export default class Battle extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            playerOne: null,
            playerTwo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(id, player){
        this.setState({
            [id]: player
        })
    }
    render(){
        const { playerOne, playerTwo } = this.state
        return(
            <>
                <Instructions />
                <div className='players-container'>
                    <h1 className='header-lg center-text'>Players</h1>
                </div>
                <div className='row space-around'>
                    {playerOne === null ? (
                        <Player label='Player One' 
                                onSubmit={(player) => this.handleSubmit('playerOne', player)}/>
                    ) : <PlayerPreview
                            username={playerOne} 
                            label='Player One'
                            onReset={() => {}}
                        />}
                    {playerTwo === null ? (
                        <Player label='Player Two' 
                                onSubmit={(player) => this.handleSubmit('playerTwo', player)}/>
                    ) : <PlayerPreview
                            username={playerOne} 
                            label='Player One'
                            onReset={() => {}}
                        />}}
                </div>
            </>
        )
    }
}