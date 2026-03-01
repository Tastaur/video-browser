import { useQuery } from '@tanstack/react-query';

import { fetchVideos } from '../api/videos';


export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });
};
