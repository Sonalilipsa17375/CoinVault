// import React from 'react'
import { useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();

  const [data, setData] = useState();
  const { currency } = useContext(CoinContext);
  const [prev_data, setPrevData] = useState();

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91qjS66TxGyV8M5q9xCZYxsK",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  };

  const prevdata = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91qjS66TxGyV8M5q9xCZYxsK",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=5&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setPrevData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
    prevdata();
  }, [currency]);

  if (data && prev_data) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={data.image.large} alt="" />
          <p>
            <b>
              {data.name}({data.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart prev_data={prev_data} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>
              {currency.symbol}
              {data.market_cap_rank}
            </li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}
              {data.market_data.current_price[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}
              {data.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.symbol}
              {data.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}
              {data.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
