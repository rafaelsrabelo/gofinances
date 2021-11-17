import React from 'react'
import { HightlightCard } from '../../components/HightlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
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
    HightlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from './styles'

export interface DataListProps extends TransactionCardProps{
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
        id: '1',
        type: 'positive',
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: "13/04/2020"
    },
    {   
        id: '2',
        type: 'negative',
        title: "Burger",
        amount: "R$ 59,00",
        category: {
            name: 'Alimentação',
            icon: 'coffee'
        },
        date: "13/04/2020"
    },
    {   
        id: '3',
        type: 'negative',
        title: "Aluguel do Apartamento",
        amount: "R$ 1.200,00",
        category: {
            name: 'Casa',
            icon: 'shopping-bag'
        },
        date: "13/04/2020"
    }
];
    
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
                    <LogoutButton onPress={() => {  }}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HightlightCards>
                <HightlightCard
                    type="up" 
                    title="Entradas"
                    amount="R$ 12.000,00"
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
                    amount="R$ 10.741,00"
                    lastTransaction="03 à 13 de Agosto"/>
                </HightlightCards>

                <Transactions>
                    <Title>Listagem</Title>

                    <TransactionList 
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <TransactionCard data={item} />}

                    />

                </Transactions>

        </Container>
    )
}
