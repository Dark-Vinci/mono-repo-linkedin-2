export interface HomeProps {
  name: string;
  profileUrl: string;
}

export interface UG {
  readonly profileUrl: string;
}

export interface UserHomeCardProps {
  readonly profileUrl: string;
  readonly fullName: string;
  readonly profileViewers: number;
  readonly connections: number;
  readonly title: string;
  readonly backgroundImage: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  publicMessage: string;
}

export interface DefaultProps {
  children: React.ReactNode;
}

export interface WithClassProps extends DefaultProps {
  className: string;
}
