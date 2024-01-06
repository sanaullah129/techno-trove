export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
      }).format(amount);
};

export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat('en-Us').format(digit);
}