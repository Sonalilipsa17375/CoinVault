import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllcoin] = useState([]);
  const [currency, setcurr] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchallcoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91qjS66TxGyV8M5q9xCZYxsK",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllcoin(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchallcoins();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setcurr,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
