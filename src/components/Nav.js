import React from 'react'
import { ThemeConsumer, ThemeProvider } from '../context/theme'

export default function Nav(){
    return(
        <ThemeConsumer>
            {({theme,toggleTheme}) => (
                <nav className='row space-between'>
                    <button style={{fontSize:30}} className='btn-clear' onClick={toggleTheme}>
                        {theme==='dark' ? '💡' : '🔦'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}