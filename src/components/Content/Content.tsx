import { ContentLoading } from '../ContentLoading/ContentLoading';
import { ContentEmpty } from '../ContentEmpty/ContentEmpty';
import { ContentError } from '../ContentError/ContentError';
import { VideoGrid } from '../VideoGrid/VideoGrid';

import type { ContentProps } from './types';


export const Content = ({ videos, isLoading, isError }: ContentProps) => {
  if (isLoading) {
    return <ContentLoading />;
  }

  if (isError) {
    return <ContentError />;
  }

  if (0 === videos.length) {
    return <ContentEmpty />;
  }

  return <VideoGrid videos={videos} />;
};
