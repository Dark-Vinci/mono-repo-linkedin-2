import {ReactNode} from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error;
  message: string;
  name: string;
  cause?: string;
  stack: string;
}
