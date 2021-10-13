const currencyFormetter = (price) =>
  parseFloat(price, 10)
    .toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
    .slice(1);

export default currencyFormetter;
