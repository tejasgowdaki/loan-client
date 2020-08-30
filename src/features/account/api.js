import { post } from '../../api/index';

const url = '/accounts';

export const createAccount = async (account) => {
  try {
    const response = await post(url, account);
    return response.account;
  } catch (error) {
    throw error;
  }
};
