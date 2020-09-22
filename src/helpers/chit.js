export const constructStats = (chits = [], savings = []) => {
  try {
    const chitsCount = chits.length;
    const totalAmountCollected = savings.reduce((sum, saving) => (sum += saving.totalSaving), 0);
    const totalAmountPaid = chits.reduce((sum, chit) => (sum += chit.amount), 0);
    const totalAmountInPurse = totalAmountCollected - totalAmountPaid;
    return { chitsCount, totalAmountCollected, totalAmountPaid, totalAmountInPurse };
  } catch (error) {
    console.error(error);
    return { chitsCount: 0, totalAmountCollected: 0, totalAmountPaid: 0, totalAmountInPurse: 0 };
  }
};
