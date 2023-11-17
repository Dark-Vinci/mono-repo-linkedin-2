import React, { Component, ErrorInfo } from 'react';

import { ErrorBoundaryState, DefaultProps } from '@types';

import style from './error-boundary.module.scss';

export class ErrorBoundary extends Component<DefaultProps, ErrorBoundaryState> {
  public constructor(props: DefaultProps) {
    super(props);
    this.state = { hasError: false, publicMessage: '' };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo });
    this.setState({ hasError: false, publicMessage: error.message });
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className={style.container}>
          <h2>Something went wrong</h2>
          <p>{this.state.publicMessage}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
