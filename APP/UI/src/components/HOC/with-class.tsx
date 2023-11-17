import React from 'react';

import { WithClassProps } from '@types';

export function WithClass(props: WithClassProps): JSX.Element {
  return <div className={props.className}>{props.children}</div>;
}
