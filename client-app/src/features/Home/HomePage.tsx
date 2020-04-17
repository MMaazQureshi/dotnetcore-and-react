import React from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const HomePage = () => {
    return (
        <Container>
            <h1 style={{marginTop:'7em'}}>Home page</h1>
            <h1>Go to <Link to='/activities'>Activites</Link></h1>
        </Container>
        
        
    )
}
