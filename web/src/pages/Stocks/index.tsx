import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { FiActivity, FiInfo } from 'react-icons/fi';
import axios from 'axios';

import Header from '../../components/Header';
import Chart from '../../components/Chart';

import {
  Container,
  Main,
  ChartContainer,
  StocksContainer,
  ChooseStock,
  StockItem,
  StockInfo,
  StockActions,
} from './styles';

interface ApiResponseValues {
  ['1. open']: string;
  ['2. high']: string;
  ['3. low']: string;
  ['4. close']: string;
  ['5. volume']: string;
}

interface DataI {
  label: string;
  data: (string | number)[][];
}

const Home: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string>('ABEV3');
  const [data, setData] = useState({} as DataI[]);
  const [timestamps, setTimestamps] = useState({} as number[]);
  const [allStocks, setAllStocks] = useState<string[]>([
    'ABEV3',
    'BBAS3',
    'BBDC3',
    'BBDC4',
    'CVCB3',
    'ITSA4',
    'ITUB4',
    'JBSS3',
    'LAME4',
    'LREN3',
    'MGLU3',
    'NTCO3',
    'OIBR3',
    'PETR4',
    'RENT3',
    'SUSB3',
    'VALE3',
    'VVAR3',
    'WEGE3',
  ]);

  useEffect(() => {
    async function loadStocksInfo(name: string) {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAilY&symbol=${name}.SA&interval=5min&apikey=${process.env.API_KEY}`,
      );
      const crudeResponse = response.data['Time Series (Daily)'];

      const datesArray: string[] = Object.keys(crudeResponse).reverse();
      const datesAsStringsArrays = datesArray.map(date => date.split('-'));
      const timestampsDates = datesAsStringsArrays.map(date => {
        const eachDate = new Date(
          Number(date[0]),
          Number(date[1]),
          Number(date[2]),
        );
        return eachDate.getTime();
      });

      const valuesArray: ApiResponseValues[] = Object.values(crudeResponse);
      const closeValuesArray = valuesArray.map((item: ApiResponseValues) => {
        return item['4. close'];
      });
      const newDataArray = closeValuesArray.reverse().map((value, index) => {
        return [index, Number(value)];
      });
      const dataObject: DataI = {
        label: name,
        data: newDataArray,
      };
      return {
        dataObject,
        timestampsDates,
      };
    }

    loadStocksInfo(selectedStock).then(results => {
      setData([results.dataObject]);
      setTimestamps(results.timestampsDates);
    });
  }, [selectedStock]);

  const handleSearchSubmit = useCallback(() => {
    console.log('ok');
  }, []);

  const handleChooseStocks = useCallback(() => {
    setAllStocks([
      'ABEV3',
      'BBAS3',
      'BBDC3',
      'BBDC4',
      'CVCB3',
      'ITSA4',
      'ITUB4',
      'JBSS3',
      'LAME4',
      'LREN3',
      'MGLU3',
      'NTCO3',
      'OIBR3',
      'PETR4',
      'RENT3',
      'SUSB3',
      'VALE3',
      'VVAR3',
      'WEGE3',
    ]);
  }, []);

  const handleChooseFIIS = useCallback(() => {
    setAllStocks([
      'BBPO11',
      'BCFF11',
      'BRCO11',
      'BRCR11',
      'GTWR11',
      'HFOF11',
      'HGBS11',
      'HGLG11',
      'HGRU11',
      'HSML11',
      'IRDM11',
      'JSRE11',
      'KNCR11',
      'KNIP11',
      'KNRI11',
      'MXRF11',
      'VILG11',
      'VISC11',
      'XPLG11',
      'XPML11',
    ]);
  }, []);

  const handleAddStock = useCallback(
    (name: string) => {
      setSelectedStock(name);
    },
    [setSelectedStock],
  );

  const axes = useMemo(
    () => [
      {
        primary: true,
        type: 'utc',
        position: 'bottom',
        format: (index: number) => timestamps[index],
      },
      { type: 'linear', position: 'left' },
    ],
    [timestamps],
  );

  return (
    <Container>
      <Header />
      <Main>
        <ChartContainer>
          <h2>{selectedStock}</h2>
          <Chart data={data} axes={axes} />
        </ChartContainer>
        <StocksContainer>
          <ChooseStock>
            <button
              type="button"
              onClick={handleChooseStocks}
              className="stocks"
            >
              Ações
            </button>
            <button type="button" onClick={handleChooseFIIS} className="FIIS">
              FIIS
            </button>
          </ChooseStock>
          {allStocks.map(stock => (
            <StockItem key={stock}>
              <StockInfo>
                <h2>{stock}</h2>
                <div>
                  <h3>R$ 99,99</h3>
                  <strong>5%</strong>
                </div>
              </StockInfo>
              <StockActions>
                <button
                  type="button"
                  className="chart"
                  onClick={() => {
                    handleAddStock(stock);
                  }}
                >
                  <FiActivity size={38} />
                </button>

                <button type="button" className="info">
                  <FiInfo size={38} />
                </button>
              </StockActions>
            </StockItem>
          ))}
        </StocksContainer>
      </Main>
    </Container>
  );
};

export default Home;
