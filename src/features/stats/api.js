import { get } from '../../api/index';

const url = '/stats';

export const getStats = async () => {
  try {
    return await get(url);
  } catch (error) {
    throw error;
  }
};
