import { ContentContainer } from '../shared/styles';

import { ErrorMessage } from './styles';


export const ContentError = () => (
  <ContentContainer data-testid="content-error">
    <ErrorMessage data-testid="error-message">OOOOOOps... something went wrong :(</ErrorMessage>
  </ContentContainer>
);
