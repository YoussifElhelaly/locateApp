import React from 'react';
import { Text, Image } from 'react-native';
import SaudiRiyalSymbol from '../assets/Saudi_Riyal_Symbol-1.png';
import SaudiRiyalSymbolWhite from '../assets/Saudi_Riyal_Symbol-1-modified.png';

const CurrencyText = ({ amount, className = '', style = {}, showSymbol = true, invert = false, iconSize = 15 }) => {
  const formatAmount = (value) => {
    const numAmount = parseFloat(value);
    return numAmount.toFixed(2);
  };

  if (!showSymbol) {
    return (
      <Text className={className} style={style}>
        {formatAmount(amount)}
      </Text>
    );
  }

  return (
    <Text className={className} style={style}>
      {formatAmount(amount)} 
      <Image 
        source={invert ? SaudiRiyalSymbolWhite : SaudiRiyalSymbol}
        style={{ width: iconSize, height: iconSize, marginLeft: 3 }}
        resizeMode="contain"
      />
    </Text>
  );
};

export default CurrencyText;