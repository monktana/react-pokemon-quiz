import { ColorModeScript, theme } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';

import { AppProvider } from '@/providers';

type WithProviderProps = {
  children?: ReactNode;
};

const WithProviders = ({ children }: WithProviderProps) => {
  return (
    <AppProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </AppProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: WithProviders, ...options });

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react';

// override render method
// eslint-disable-next-line import/export
export { customRender as render };
