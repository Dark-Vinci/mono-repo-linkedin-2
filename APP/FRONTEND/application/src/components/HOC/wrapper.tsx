import React, { ComponentType, FC } from 'react';

export function WithWrapper<P extends object>(
  WrappedComponent: ComponentType<P & AdditionalProps>,
): FC<P> {
  const withWrapper: FC<P> = (props) => {
    const newProps: AdditionalProps = {
      customProps: 'the value',
    };

    return <WrappedComponent {...props} {...newProps} />;
  };

  return withWrapper;
}
