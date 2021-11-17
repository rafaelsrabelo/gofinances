import React, { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    const [data, setData] = useState<DataListProps[]>();

    async function loadTransactions() {
      const datakey = '@gofinances:transactions'
      const response = await AsyncStorage.getItem(datakey);

      const transactions = response ? JSON.parse(response) : [];

      const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format( new Date(item.date));

        return {
            id: item.id,
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date,
        }
    });

    setData(transactionsFormatted);

    }

    useEffect(() => {
        loadTransactions();
    },[])

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
