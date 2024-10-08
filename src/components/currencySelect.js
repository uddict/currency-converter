import React from "react";

const CurrencySelect = ({
  id,
  value,
  onChange,
  rates,
  defaultValue,
  label,
}) => (
  <div className={`input-${id}`}>
    <label htmlFor={id}>{label}</label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      {Object.keys(rates).length > 0 ? (
        Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))
      ) : (
        <option value={defaultValue}>{defaultValue}</option>
      )}
    </select>
  </div>
);

export default CurrencySelect;
