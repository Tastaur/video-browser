import type { Video } from '../../api/types';


export interface ContentProps {
  videos: Video[];
  isLoading: boolean;
  isError: boolean;
}
