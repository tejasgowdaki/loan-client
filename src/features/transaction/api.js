import { get, post, destroy } from '../../api/index';

const url = '/transactions';

export const getTransactions = async () => {
  try {
    const response = await get(url);
    return response.transactions;
  } catch (error) {
    throw error;
  }
};

export const createTransaction = async (transaction) => {
  try {
    const response = await post(url, transaction);
    return response.transaction;
  } catch (error) {
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await destroy(`${url}/${id}`);
    return response.transactionId;
  } catch (error) {
    throw error;
  }
};
