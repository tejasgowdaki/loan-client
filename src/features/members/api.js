import { get, post, put, destroy } from "../../api/index";

const url = "/members";

export const getMembers = async () => {
  try {
    const response = await get(url);
    return response.members;
  } catch (error) {
    throw error;
  }
};

export const createMember = async member => {
  try {
    const response = await post(url, member);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMember = async (id, member) => {
  try {
    const response = await put(`${url}/${id}`, member);
    return response.member;
  } catch (error) {
    throw error;
  }
};

export const deleteMember = async id => {
  try {
    const response = await destroy(`${url}/${id}`);
    return response.memberId;
  } catch (error) {
    throw error;
  }
};
