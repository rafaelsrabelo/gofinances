import React, { useState } from "react";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/form/Button";
import { Container, Header, Title, Form, Fields, TransactionsTypes } from "./styles";
import { TransactionTypeButton } from "../../components/form/TransactionTypeButton";
import { CategorySelect } from "../../components/form/CategorySelect";

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  function handleTransactionsTypes(type: 'up' | 'down') {
    setTransactionType(type);
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionsTypes('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionsTypes('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelect 
            title="Categoria"
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

    </Container>
  );
}
