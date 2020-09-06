export const searchMembers = (members, searchText) => {
  const regex = RegExp(`${searchText}`, 'i');
  return members.filter(({ name, mobile }) => regex.test(name) || regex.test(mobile));
};

export const fetchAtiveLoanMembers = (members, loans) => {
  const activeLoans = loans.filter((l) => !l.isCompleted).map((l) => l.memberId);

  return members.filter(({ _id }) => activeLoans.includes(_id));
};
