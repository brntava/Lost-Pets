import axios from 'axios';

import { LoginResponse, UserLoginBody, UserRequestBody } from '~/types/userTypes';

type RequestConfig = {
  method: string;
  url: string;
  data?: object;
};

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

export const getUser = async (id: string, method: string, body?: UserRequestBody) => {
  const config: RequestConfig = {
    method,
    url: `/user/${id}`,
  };

  if (body) config.data = body;

  const { data } = await axios(config);

  if (!data) return;

  return data;
};
