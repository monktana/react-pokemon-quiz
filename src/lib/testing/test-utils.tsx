import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';

import { AppProvider } from '@/providers';

type WithProviderProps = {
  children?: ReactNode;
};

const WithProviders = ({ children }: WithProviderProps) => {
  return <AppProvider browserLanguage="en">{children}</AppProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: WithProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
