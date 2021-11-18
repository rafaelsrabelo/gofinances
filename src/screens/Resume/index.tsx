import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

interface TransactionDate {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percenty: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  
  const theme = useTheme();

  async function loadData() {
    const datakey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(datakey);
    const reseponseFormatted = response ? JSON.parse(response) : [];

    const expensives = reseponseFormatted.filter(
      (expensive: TransactionDate) => expensive.type === "negative"
    );

    const expensivesTotal = expensives
    .reduce((acumullator: number, expensive: TransactionDate) => {
      return acumullator + Number(expensive.amount);
    }, 0);

    console.log(expensivesTotal);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionDate) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
      <ChartContainer>
        <VictoryPie 
          data={totalByCategories}
          colorScale={totalByCategories.map(category => category.color)}
          style={{
            labels: { 
              fontSize: RFValue(18),
              fontWeight: 'bold',
              fill: theme.colors.shape
            }
          }}
          labelRadius={50}
          x="percent"
          y="total"
        />
      </ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
      </Content>
    </Container>
  );
}
