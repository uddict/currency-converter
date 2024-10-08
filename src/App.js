import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { fetchRates, calculateConversion } from "./services/currencyService.js";
import CurrencySelect from "./components/currencySelect.js";
import "./styles.css";

function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRates()
      .then((fetchedRates) => {
        setRates(fetchedRates);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rates:", error);
        setIsLoading(false);
      });
  }, []);

  const handleCalculate = async () => {
    try {
      const result = await calculateConversion(
        amount,
        fromCurrency,
        toCurrency
      );
      setOutput(result);
    } catch (error) {
      console.error("Error calculating conversion:", error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Currency Converter</h1>
      </header>
      <main className="app-main">
        <div className="converter-container">
          <div className="input-group">
            <CurrencyInput
              value={amount}
              onValueChange={(value) => setAmount(value)}
              intlConfig={{ locale: "en-US", currency: fromCurrency }}
              allowDecimals={true}
              allowNegativeValue={false}
              className="currency-input"
              placeholder="Enter amount"
            />
            <CurrencySelect
              id="from"
              value={fromCurrency}
              onChange={setFromCurrency}
              rates={rates}
              defaultValue="USD"
              label="From"
            />
          </div>
          <div className="input-group">
            <CurrencySelect
              id="to"
              value={toCurrency}
              onChange={setToCurrency}
              rates={rates}
              defaultValue="INR"
              label="To"
            />
          </div>
          <button className="calculate-btn" onClick={handleCalculate}>
            Calculate
          </button>
          {output !== null && (
            <div className="output">
              <p>
                {amount} {fromCurrency} = {output.toFixed(2)} {toCurrency}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
