import React, { useState, useEffect, useCallback } from 'react';
import { FiHeart, FiInfo } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import axios from 'axios';

import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import { useStock } from '../../hooks/StockContext';

import Header from '../../components/Header';
import Chart from '../../components/RChart';
import Button from '../../components/Button';

import {
  Main,
  InfoContainer,
  InfoHeader,
  ButtonsContainer,
  LinksContainer,
  Indicators,
  Indicator,
  Background,
} from './styles';

interface stockInfo {
  peRatio: number;
  pegRatio: number;
  bookValue: number;
  dividendPerShare: number;
  dividendYeld: number;
  eps: number;
  profitMargin: number;
  operatingMargin: number;
  roa: number;
  roe: number;
  grossProfit: number;
  targetPrice: number;
  priceToSalesRatio: number;
  beta: number;
}

interface timePropsI {
  intraday: {
    function: string;
    min: number;
  };
  daily: {
    function: string;
    min: number;
  };
  full: {
    function: string;
    min: number;
  };
}

const Home: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const { contextStock } = useStock();

  const [time, setTime] = useState('daily' as keyof timePropsI);
  const [liked, setLiked] = useState(() => {
    if (
      user &&
      user.stocks &&
      user.stocks.findIndex(el => el === contextStock) > -1
    ) {
      return true;
    }
    return false;
  });
  const [x, setX] = useState([] as string[]);
  const [y, setY] = useState([] as number[]);
  const [yStart, setYStart] = useState(0);
  const [stockInfo, setStockInfo] = useState({} as stockInfo);

  const timeProps: timePropsI = {
    intraday: {
      function: 'function=TIME_SERIES_INTRADAY&interval=5min',
      min: 0.95,
    },
    daily: {
      function: 'function=TIME_SERIES_DAIlY',
      min: 0.5,
    },
    full: {
      function: 'function=TIME_SERIES_DAIlY&outputsize=full',
      min: 0,
    },
  };

  useEffect(() => {
    async function loadStockValues(name: string, timeString: keyof timePropsI) {
      try {
        let timeSeries;
        let datesArray;

        const response = await axios.get(
          `https://www.alphavantage.co/query?${timeProps[timeString].function}&symbol=${name}&apikey=${process.env.API_KEY}`,
        );

        if (time === 'intraday') {
          timeSeries = response.data['Time Series (5min)'];

          datesArray = Object.keys(timeSeries)
            .reverse()
            .map(
              date =>
                `${date.split(':')[0].substring(11)}:${date.split(':')[1]}`,
            );
        } else {
          timeSeries = response.data['Time Series (Daily)'];

          datesArray = Object.keys(timeSeries)
            .reverse()
            .map(
              date =>
                `${date.split('-')[1]}/${date.split('-')[2]}/${date
                  .split('-')[0]
                  .substring(2, 4)}`,
            );
        }

        const valuesArray = Object.values(timeSeries)
          .reverse()
          .map((item: any) => Number(item['4. close']));

        return {
          x: datesArray,
          y: valuesArray,
        };
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Request error',
          description: 'API limit calls reached, try again 1 minute later.',
        });
        return {
          x: [],
          y: [],
        };
      }
    }

    loadStockValues(contextStock, time).then(results => {
      setX(results.x);
      setY(results.y);
      setYStart(Math.round(results.y[0] * timeProps[time].min));
    });
  }, [contextStock, time, addToast]);

  useEffect(() => {
    async function loadStockInfo(name: string) {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${name}&apikey=demo${process.env.API_KEY}`,
        );

        return {
          peRatio: response.data.PERatio,
          pegRatio: response.data.PEGRatio,
          bookValue: response.data.BookValue,
          dividendPerShare: response.data.DividendPerShare,
          dividendYeld: response.data.DividendYield,
          eps: response.data.EPS,
          profitMargin: response.data.ProfitMargin,
          operatingMargin: response.data.OperatingMarginTTM,
          roa: response.data.ReturnOnAssetsTTM,
          roe: response.data.ReturnOnEquityTTM,
          grossProfit: response.data.GrossProfitTTM,
          targetPrice: response.data.PriceToSalesRatioTTM,
          priceToSalesRatio: response.data.AnalystTargetPrice,
          beta: response.data.Beta,
        };
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Request error',
          description: 'API limit calls reached, try again 1 minute later.',
        });
        return {
          peRatio: 0,
          pegRatio: 0,
          bookValue: 0,
          dividendPerShare: 0,
          dividendYeld: 0,
          eps: 0,
          profitMargin: 0,
          operatingMargin: 0,
          roa: 0,
          roe: 0,
          grossProfit: 0,
          targetPrice: 0,
          priceToSalesRatio: 0,
          beta: 0,
        };
      }
    }

    loadStockInfo(contextStock).then(results => {
      setStockInfo(results);
    });
  }, [contextStock, addToast]);

  const handleTimeSeries = useCallback(
    (timeString: keyof timePropsI) => {
      setTime(timeString);
    },
    [setTime],
  );

  const handleLike = useCallback(
    async (stock: string) => {
      if (user && user.id) {
        const formData = {
          userId: user.id,
          stockId: stock,
        };

        try {
          const response = await api.patch('/users/stock/', formData);

          if (response && response.data && response.data.stocks) {
            const findFavorite = response.data.stocks.find(
              (el: string) => el === stock,
            );
            setLiked(!!findFavorite);
          }

          updateUser(response.data);
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Request error',
            description: 'Unable to like/deslike, try again later.',
          });
        }
      } else {
        addToast({
          type: 'info',
          title: 'Request error',
          description: 'You must be logged to like or dislike.',
        });
      }
    },
    [user, addToast, setLiked, updateUser],
  );

  return (
    <>
      <Header />
      <Main>
        <InfoContainer style={{ opacity: 1 }}>
          <InfoHeader>
            <ButtonsContainer>
              <Button
                onClick={() => handleTimeSeries('intraday')}
                style={{ opacity: time === 'intraday' ? 1 : 0.8 }}
              >
                Last day
              </Button>
              <Button
                onClick={() => handleTimeSeries('daily')}
                style={{ opacity: time === 'daily' ? 1 : 0.8 }}
              >
                Four months
              </Button>
              <Button
                onClick={() => handleTimeSeries('full')}
                style={{ opacity: time === 'full' ? 1 : 0.8 }}
              >
                All
              </Button>
            </ButtonsContainer>
            <h2>{contextStock}</h2>
            <LinksContainer>
              <button type="button" onClick={() => handleLike(contextStock)}>
                {liked ? (
                  <AiFillHeart size={36} color="#c53030" />
                ) : (
                  <FiHeart size={36} color="#c53030" />
                )}
              </button>
              <button type="button">
                <FiInfo size={36} color="#000" />
              </button>
            </LinksContainer>
          </InfoHeader>

          <Chart x={x} y={y} yStart={yStart} />

          <Indicators>
            <Indicator>
              <h3>PE Ratio</h3>
              <p>{stockInfo.peRatio}</p>
            </Indicator>
            <Indicator>
              <h3>PEG Ratio</h3>
              <p>{stockInfo.pegRatio}</p>
            </Indicator>
            <Indicator>
              <h3>Book Value</h3>
              <p>{stockInfo.bookValue}</p>
            </Indicator>
            <Indicator>
              <h3>Divdend Per Share</h3>
              <p>{stockInfo.dividendPerShare}</p>
            </Indicator>
            <Indicator>
              <h3>Divdend Yeld</h3>
              <p>{stockInfo.dividendYeld}</p>
            </Indicator>
            <Indicator>
              <h3>EPS</h3>
              <p>{stockInfo.eps}</p>
            </Indicator>
            <Indicator>
              <h3>Profit Margin</h3>
              <p>{stockInfo.profitMargin}</p>
            </Indicator>
            <Indicator>
              <h3>Operating Margin</h3>
              <p>{stockInfo.operatingMargin}</p>
            </Indicator>
            <Indicator>
              <h3>Return On Assets</h3>
              <p>{stockInfo.roa}</p>
            </Indicator>
            <Indicator>
              <h3>Return On Equity</h3>
              <p>{stockInfo.roe}</p>
            </Indicator>
            <Indicator>
              <h3>Gross Profit</h3>
              <p>{stockInfo.grossProfit}</p>
            </Indicator>
            <Indicator>
              <h3>Analyst Target Price</h3>
              <p>{stockInfo.targetPrice}</p>
            </Indicator>
            <Indicator>
              <h3>Price To Sales Ratio</h3>
              <p>{stockInfo.priceToSalesRatio}</p>
            </Indicator>
            <Indicator>
              <h3>Beta</h3>
              <p>{stockInfo.beta}</p>
            </Indicator>
          </Indicators>
        </InfoContainer>
      </Main>

      <Background />
    </>
  );
};

export default Home;
