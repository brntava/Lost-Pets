import axios from 'axios';

type RequestBody = {
  type: number; // 0 - Email | 1 - Phone | 2 - WPP | 3 - URL
  content: string;
};

const URL = process.env.URL;

export const createContact = async (body: RequestBody, autCookie: string) => {
  const { data } = await axios.post(`${URL}/api/Contact`, body, {
    headers: {
      Authorization: `Bearer ${autCookie}`,
    },
  });

  return data;
};

export const updateContact = async (contactId: string, body: RequestBody, autCookie: string) => {
  const { data } = await axios.put(`${URL}/api/Contact/${contactId}`, body, {
    headers: {
      Authorization: `Bearer ${autCookie}`,
    },
  });

  return data;
};

export const deleteContact = async (contactId: string, autCookie: string) => {
  return await axios.delete(`${URL}/api/Contact/${contactId}`, {
    headers: {
      Authorization: `Bearer ${autCookie}`,
    },
  });
};
