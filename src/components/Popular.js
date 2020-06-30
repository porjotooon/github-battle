import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

import './Popular.css'

const LanguageNavBar = ({ selected, onUpdateLanguage }) => {
    const languages = ["All","JavaScript","Ruby","Java","CSS","Python"]
    return (
        <ul className="flex-center">
            {languages.map(lang => (
                <li key={lang}>
                    <button className="btn-clear nav-link"
                    style={lang === selected ? {color: 'rgb(187, 46, 31)'} : null}
                    onClick={() => onUpdateLanguage(lang)}
                    >
                        {lang}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguageNavBar.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

class Popular extends Component {
    constructor(props){
        super(props)

        //state for language
        this.state = {
            selectedLanguage: 'All',
            repos: null,
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    //handler for updating language
    updateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage,
            error: null,
            repos: null //repos & error being null means it's loading
        })

        fetchPopularRepos(selectedLanguage)
            .then(repos => this.setState({
                repos,
                error: null,
            }))
            .catch(() => {
                console.warn('Error in fetching repos: ', this.state.error)
                this.setState({
                    error: `There was an error fetching the repositories`                    
                })
            })           
            
    }

    //handler for returning bool if it's loading or not
    isLoading(){
        return this.state.repos === null && this.state.error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state
        return (
            <>
                <LanguageNavBar 
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <p>LOADING</p>}

                {error && <p>{error}</p>}

                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </>
        )
    }
}

export default Popular