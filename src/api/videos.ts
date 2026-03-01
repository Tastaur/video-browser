import type { DatasetResponse } from './types';


const API_URL = 'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchVideos = async (): Promise<DatasetResponse> => {
  try {
    await delay(2000);
    const response = await fetch(API_URL);
    return response.json();
  } catch (e) {
    console.error('Error fetching videos:', e);
    throw e;
  }
};
