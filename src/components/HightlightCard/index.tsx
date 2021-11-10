import React from 'react'
import { Container, 
    Header, 
    Title, 
    Icon, 
    Footer, 
    Amount, 
    LastTranaction 
} from './styles'

interface Props {
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HightlightCard({
    type, 
    title, 
    amount, 
    lastTransaction 
} : Props ) {
    return(
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>

            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTranaction type={type}>{lastTransaction}</LastTranaction>
            </Footer>

        </Container>
    )
}