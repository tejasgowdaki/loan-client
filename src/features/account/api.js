import { get, post, put } from '../../api/index';

const url = '/accounts';

export const getAccounts = async () => {
  try {
    const response = await get(url);
    return response.accounts;
  } catch (error) {
    throw error;
  }
};

export const getAccount = async (id) => {
  try {
    const response = await get(`${url}/${id}`);
    return response.account;
  } catch (error) {
    throw error;
  }
};

export const switchAccount = async (payload) => {
  try {
    const response = await post(`${url}/switch-account`, payload);
    return response.token;
  } catch (error) {
    throw error;
  }
};

export const createAccount = async (account) => {
  try {
    const response = await post(url, account);
    return response.account;
  } catch (error) {
    throw error;
  }
};

export const updateAccount = async (id, account) => {
  try {
    const response = await put(`${url}/${id}`, account);
    return response.account;
  } catch (error) {
    throw error;
  }
};
