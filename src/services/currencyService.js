const API_KEY = "59d560835c4e8d4f996adc83";
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export const fetchRates = async () => {
  const response = await fetch(`${BASE_URL}/${API_KEY}/latest/USD`);
  const data = await response.json();
  return data.result === "success" ? data.conversion_rates : {};
};

export const calculateConversion = async (amount, fromCurrency, toCurrency) => {
  const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
  const data = await response.json();
  const rates = data.conversion_rates;
  return amount * rates[toCurrency];
};
   
