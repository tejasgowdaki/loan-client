import apiHandler from './apiHandler';

const baseUrl = 'http://192.168.1.6:4000/api';

const fetchHeader = () => {
  return {
    'Content-Type': 'application/json'
    // Authorization: `JWT ${token}`
  };
};

export const get = async url => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: fetchHeader()
    });

    return await apiHandler(response);
  } catch (error) {
    throw error;
  }
};

export const post = async (url, payload) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers: fetchHeader(),
      body: JSON.stringify(payload)
    });

    return await apiHandler(response);
  } catch (error) {
    throw error;
  }
};

export const put = async (url, payload) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'PUT',
      headers: fetchHeader(),
      body: JSON.stringify(payload)
    });

    return await apiHandler(response);
  } catch (error) {
    throw error;
  }
};

export const destroy = async url => {
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'DELETE',
      headers: fetchHeader()
    });

    return await apiHandler(response);
  } catch (error) {
    throw error;
  }
};
