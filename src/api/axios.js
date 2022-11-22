import axios from 'axios';
const BASE_URL = 'https://freddy.codesubmit.io';

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
});
