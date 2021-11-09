const Price = (num: number) => {
  return Intl.NumberFormat("id-Id", {
    style: "currency",
    currency: "IDR",
  }).format(num);
};

export default Price;