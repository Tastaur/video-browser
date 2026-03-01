import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { VideoCard } from '../VideoCard/VideoCard';
import { ContentContainer } from '../shared/styles';
import { useGridColumns } from '../../hooks/useGridColumns';

import { GAP, GridCell, ROW_HEIGHT, VirtualGrid, VirtualRow } from './styles';
import type { VideoGridProps } from './types';


export const VideoGrid = ({ videos }: VideoGridProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const columns = useGridColumns();

  const rowCount = Math.ceil(videos.length / columns);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT + GAP,
    overscan: 2,
  });

  return (
    <ContentContainer ref={parentRef} data-testid="video-grid">
      <VirtualGrid style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const rowVideos = videos.slice(startIndex, startIndex + columns);

          return (
            <VirtualRow
              key={virtualRow.key}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {rowVideos.map((video) => (
                <GridCell key={video.id} columns={columns}>
                  <VideoCard
                    title={video.title}
                    artist={video.artist}
                    year={video.release_year}
                    imageUrl={video.image_url}
                  />
                </GridCell>
              ))}
            </VirtualRow>
          );
        })}
      </VirtualGrid>
    </ContentContainer>
  );
};
