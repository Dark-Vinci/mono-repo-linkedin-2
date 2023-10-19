import { ErrorInfo, ReactNode, Component } from 'react';

import {ErrorBoundaryProps, ErrorBoundaryState} from "@types";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: {} as Error,
      message: '',
      name: '',
      cause: '',
      stack: '',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({
      error,
      errorInfo,
    });

    this.setState({
      hasError: true,
      error: error,
      message: error.message,
      name: error.name,
      stack: error?.stack || '',
      cause: error.cause as string,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
