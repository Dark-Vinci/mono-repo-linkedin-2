interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error;
  message: string;
  name: string;
  cause?: string;
  stack: string;
}
