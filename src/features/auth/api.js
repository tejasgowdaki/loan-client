import { post } from '../../api/index';

const url = '/auth';

export const requestLoginOTP = async (account) => {
  try {
    const response = await post(`${url}/send-login-otp`, account);
    return response.message;
  } catch (error) {
    throw error;
  }
};

export const login = async (account) => {
  try {
    const response = await post(`${url}/login`, account);
    return response.token;
  } catch (error) {
    throw error;
  }
};

export const signup = async (account) => {
  try {
    const response = await post(`${url}/signup`, account);
    return response.account;
  } catch (error) {
    throw error;
  }
};
