'use client';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorState } from '..';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          error={this.state.error}
          errorCode="UNKNOWN_ERROR"
          showAction={false}
        />
      );
    }

    return this.props.children;
  }
}
