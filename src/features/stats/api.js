import { get } from '../../api/index';

const url = '/stats';

export const getStats = async (isOnlyMonth = false, month = null) => {
  try {
    return get(`${url}?isOnlyMonth=${isOnlyMonth}&&month=${month || ''}`);
  } catch (error) {
    throw error;
  }
};
