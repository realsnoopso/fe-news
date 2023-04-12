import customFetch from './index';

export const getNews = async () => {
  const path = '/rolling-news';
  const method = 'GET';
  const data = await customFetch({ path, method });
  return data;
};

interface getPressProps {
  page: number;
}

export const getPress = async ({ page }: getPressProps) => {
  // const path = `/press?page=${page}`;
  const path = `/press`;
  const method = 'GET';
  const data = await customFetch({ path, method });
  return data;
};
