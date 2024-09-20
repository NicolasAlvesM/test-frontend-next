"use client"
import { API_URL } from '@/configs/enviromentsVars';
import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = Cookies.get('session');
  console.log({ token });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
