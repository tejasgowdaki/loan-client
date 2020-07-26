export const searchMembers = (members, searchText) => {
  const regex = RegExp(`${searchText}`, 'i');
  return members.filter(({ name, mobile }) => regex.test(name) || regex.test(mobile));
};
