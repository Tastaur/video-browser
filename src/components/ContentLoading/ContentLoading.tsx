import { CircularProgress } from '@mui/material';

import { ContentContainer, CenteredContent } from '../shared/styles';


export const ContentLoading = () => (
  <ContentContainer data-testid="content-loading">
    <CenteredContent>
      <CircularProgress data-testid="loading-spinner" />
    </CenteredContent>
  </ContentContainer>
);
