import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/Header';
import Chart from '../../components/RChart';

import { Main, InfoContainer, Background } from './styles';

const Home: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');

  const [x, setX] = useState([] as string[]);
  const [y, setY] = useState([] as number[]);

  useEffect(() => {
    async function loadStocksInfo(name: string) {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAilY&symbol=${name}&interval=5min&apikey=${process.env.API_KEY}`,
      );
      const timeSeries = response.data['Time Series (Daily)'];

      const datesArray: string[] = Object.keys(timeSeries)
        .reverse()
        .map(date => `${date.split('-')[1]}/${date.split('-')[2]}`);

      const valuesArray = Object.values(timeSeries)
        .reverse()
        .map((item: any) => Number(item['4. close']));

      return {
        x: datesArray,
        y: valuesArray,
      };
    }

    loadStocksInfo(selectedStock).then(results => {
      setX(results.x);
      setY(results.y);
    });
  }, [selectedStock]);

  const handleAddStock = useCallback(
    (name: string) => {
      setSelectedStock(name);
    },
    [setSelectedStock],
  );

  return (
    <>
      <Header />
      <Main>
        <InfoContainer>
          <h2>{selectedStock}</h2>
          <Chart x={x} y={y} />
        </InfoContainer>
      </Main>

      <Background />
    </>
  );
};

export default Home;
