import { get, post, destroy } from '../../api/index';

const url = '/chits';

export const getChits = async () => {
  try {
    const response = await get(url);
    return response.chits;
  } catch (error) {
    throw error;
  }
};

export const createChit = async (chit) => {
  try {
    const response = await post(url, chit);
    return response.chit;
  } catch (error) {
    throw error;
  }
};

export const deleteChit = async (id) => {
  try {
    const response = await destroy(`${url}/${id}`);
    return response.chitId;
  } catch (error) {
    throw error;
  }
};
