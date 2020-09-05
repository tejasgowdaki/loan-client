import { get, post, put, destroy } from '../../api/index';

const url = '/loans';

export const getLoans = async () => {
  try {
    const response = await get(url);
    return response.loans;
  } catch (error) {
    throw error;
  }
};

export const createLoan = async (loan) => {
  try {
    const response = await post(url, loan);
    return response.loan;
  } catch (error) {
    throw error;
  }
};

export const updateSubLoan = async (id, subLoan) => {
  try {
    const response = await post(`${url}/sub-loan/${id}`, subLoan);
    return response.loan;
  } catch (error) {
    throw error;
  }
};

export const deleteSubLoan = async (id, subLoanId) => {
  try {
    const response = await destroy(`${url}/sub-loan/${id}/${subLoanId}`);
    return response.loan;
  } catch (error) {
    throw error;
  }
};

export const updateLoan = async (id, loan) => {
  try {
    const response = await put(`${url}/${id}`, loan);
    return response.loan;
  } catch (error) {
    throw error;
  }
};

export const deleteLoan = async (id) => {
  try {
    const response = await destroy(`${url}/${id}`);
    return response.loanId;
  } catch (error) {
    throw error;
  }
};

export const addPayment = async (id, payment) => {
  try {
    const response = await post(`${url}/add/${id}`, payment);
    return response.loan;
  } catch (error) {
    throw error;
  }
};

export const deletePayment = async (id, payment) => {
  try {
    const response = await post(`${url}/delete/${id}`, payment);
    return response.loan;
  } catch (error) {
    throw error;
  }
};
