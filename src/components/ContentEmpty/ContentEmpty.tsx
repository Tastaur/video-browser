import { ContentContainer } from '../shared/styles';

import { EmptyMessage } from './styles';


export const ContentEmpty = () => (
  <ContentContainer data-testid="content-empty">
    <EmptyMessage data-testid="empty-message">No videos were found</EmptyMessage>
  </ContentContainer>
);
