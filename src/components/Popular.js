import React, { Component } from 'react'
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

class Popular extends Component {
    constructor(props){
        super(props)

        //state for language
        this.state = {
            selectedLanguage: 'All'
        }
        this.updateLanguage = this.updateLanguage.bind(this)
    }
    //handler for updating language
    updateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage
        })
    }

    render() {
        const { selectedLanguage } = this.state
        return (
            <>
                <LanguageNavBar 
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
            </>
        )
    }
}

export default Popular