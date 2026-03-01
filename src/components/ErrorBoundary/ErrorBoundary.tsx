import { Component, type PropsWithChildren } from 'react';
import { Button } from '@mui/material';

import { ErrorContainer, ErrorTitle, ErrorMessage, ErrorDetails } from './styles';
import type { ErrorBoundaryState } from './types';


export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {  error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {  error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({  error });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            An unexpected error occurred. Please try reloading the page.
          </ErrorMessage>
          <ErrorDetails>{this.state.error.message}</ErrorDetails>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReload}
            sx={{ mt: 3 }}
          >
            Reload Page
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
    
}
