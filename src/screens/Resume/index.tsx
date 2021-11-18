import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { HistoryCard } from "../../components/HistoryCard";
import { 
  Container, 
  Header, 
  Title, 
  Content, 
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from "./styles";
import { categories } from "../../utils/categories";
import { addMonths, subMonths, format } from "date-fns"
import { ptBR } from "date-fns/locale"
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  
  const theme = useTheme();

  function handleChangeDate(action: 'next' | 'prev') {
    if(action === 'next') {
     const newDate = addMonths(selectedDate, 1)
     setSelectedDate(newDate)

     console.log(newDate)
    }else{
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }

  async function loadData() {
    const datakey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(datakey);
    const reseponseFormatted = response ? JSON.parse(response) : [];

    const expensives = reseponseFormatted.filter(
      (expensive: TransactionDate) => 
      expensive.type === "negative" &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
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
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      > 

      <MonthSelect>
        <MonthSelectButton onPress={() => handleChangeDate('prev')}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>
          { format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
        </Month>

        <MonthSelectButton onPress={() => handleChangeDate('next')}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      
      </MonthSelect>

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

          {
          totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))
          }
      </Content>
    </Container>
  );
}
