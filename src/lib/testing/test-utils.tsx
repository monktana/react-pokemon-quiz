import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';

import { AppProvider } from '@/providers';
import { LanguageStoreProvider } from '@/stores';

type WithProviderProps = {
  children?: ReactNode;
};

const WithProviders = ({ children }: WithProviderProps) => {
  return (
    <AppProvider initialLanguage="en">
      <LanguageStoreProvider initialLanguage="en">{children}</LanguageStoreProvider>
    </AppProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: WithProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
