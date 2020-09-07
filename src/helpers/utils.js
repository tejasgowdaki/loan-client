const rupeeFormat = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumSignificantDigits: 3
});

export const formatAmount = (amount) => rupeeFormat.format(amount);
