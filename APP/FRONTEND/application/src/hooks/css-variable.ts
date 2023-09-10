import { useEffect, useState } from 'react';

export function useCSSVariables() {
  const [cssVariables, setCSSVariables] = useState({});

  useEffect(() => {
    // Get all CSS variables
    const root = document.documentElement;
    const computedStyles = getComputedStyle(root);

    // Filter and extract CSS variables
    const variables = Array.from(computedStyles).reduce(
      (acc: Record<string, any>, style: string) => {
        if (style.startsWith('--')) {
          acc[style] = computedStyles.getPropertyValue(style).trim();
        }
        return acc;
      },
      {},
    );

    setCSSVariables(variables);
  }, []);

  return cssVariables;
}

// export default useCSSVariables;
