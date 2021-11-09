const NumberFormatter = (num: number) => {
  return Intl.NumberFormat('id-Id').format(num);
};

export default NumberFormatter;