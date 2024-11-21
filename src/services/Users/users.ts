import axios from 'axios';

import { PostImageType } from '~/types/imageTypes';
import { LoggedUser, LoginResponse, UserLoginBody, UserRequestBody } from '~/types/userTypes';

const URL = process.env.URL;

export const registerUser = async (body: UserRequestBody) => {
  return await axios.post(`${URL}/api/User/register`, body);
};

export const loginUser = async (body: UserLoginBody) => {
  const { data } = await axios.post<LoginResponse>(`${URL}/api/User/login`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { token, user } = data;

  return {
    token,
    user,
  };
};

export const getUser = async (id: string) => {
  const { data } = await axios.get<Promise<LoggedUser>>(`${URL}/api/User/${id}`);

  if (!data) return;

  return data;
};

export const addUserImage = async (body: FormData, autCookie: string) => {
  const { data } = await axios.post<Promise<PostImageType>>(`${URL}/api/User/image`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${autCookie}`,
    },
  });

  return data;
};

export const deleteUserImage = async (autCookie: string) => {
  return await axios.delete(`${URL}/api/User/image`, {
    headers: {
      Authorization: `Bearer ${autCookie}`,
    },
  });
};
