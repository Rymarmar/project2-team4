export function validateAmount(value: string, availableBalance?: number): string | undefined {
  const amount = value.trim();

  if (!amount) return 'Enter an amount.';
  if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
    return 'Enter a positive amount with up to two decimal places.';
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return 'Enter an amount greater than zero.';
  }
  if (!Number.isSafeInteger(Math.round(numericAmount * 100))) {
    return 'Enter a smaller amount.';
  }
  if (availableBalance !== undefined && numericAmount > availableBalance) {
    return 'Insufficient funds in the selected account.';
  }

  return undefined;
}

export function validateTransfer(
  originId: string,
  destinationId: string,
): string | undefined {
  if (!destinationId) return 'Select a destination account.';
  if (originId === destinationId) return 'Choose a different destination account.';
  return undefined;
}
