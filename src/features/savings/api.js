import { get, post } from '../../api/index';

const url = '/savings';

export const getSavings = async () => {
  try {
    const response = await get(url);
    return response.savings;
  } catch (error) {
    throw error;
  }
};

export const addDeposit = async (id, deposit) => {
  try {
    const response = await post(`${url}/add/${id}`, deposit);
    return response.saving;
  } catch (error) {
    throw error;
  }
};

export const deleteDeposit = async (id, deposit) => {
  try {
    const response = await post(`${url}/delete/${id}`, deposit);
    return response.saving;
  } catch (error) {
    throw error;
  }
};
