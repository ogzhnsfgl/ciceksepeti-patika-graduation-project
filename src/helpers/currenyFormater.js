const currencyFormetter = (price) =>
  parseInt(price, 10)
    .toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    })
    .slice(1);

export default currencyFormetter;
