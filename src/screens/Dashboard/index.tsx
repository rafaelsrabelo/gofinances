import React from 'react'
import { HightlightCard } from '../../components/HightlightCard'
import { 
    Container, 
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HightlightCards
} from './styles'

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo 
                        source={{ uri: 'https://avatars.githubusercontent.com/u/54684348?v=4'}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Rafael</UserName>
                        </User>
                    </UserInfo>
                    
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HightlightCards>
                <HightlightCard
                    type="up" 
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de Agosto"
                />
                <HightlightCard 
                    type="down" 
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última entrada dia 03 de Agosto"
                />
                <HightlightCard 
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="03 à 13 de Agosto"/>
                </HightlightCards>

        </Container>
    )
}
