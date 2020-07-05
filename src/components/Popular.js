import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'


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



const ReposGrid = ({ repos }) => {
    return(
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url}>
                        <Card 
                            header={`#${index+1}`}
                            name={login}
                            href={html_url}
                            avatar={avatar_url}
                            >
                        <ul className='card-list'>
                            <li>
                                <Tooltip text="Github username">
                                <FaUser color='rgb(255,191,116)' size={22}/>
                                <a href={`https://github.com/${login}`}>
                                    {login}
                                </a>
                                </Tooltip>
                            </li>
                            <li>
                                <FaStar color='gold' size={22}/>
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129,195,245)' size={22}/>
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241,138,147)' size={22}/>
                                {open_issues.toLocaleString()} open issues
                            </li>
                        </ul>
                        </Card>
                        
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
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

    // for re-rendering repos of selected language
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
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

                {this.isLoading() && <Loading />}

                {error && <p className='center-text error'>{error}</p>}

                {repos && <ReposGrid repos={repos}/>}
            </>
        )
    }
}

export default Popular