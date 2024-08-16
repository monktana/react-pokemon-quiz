import React from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loading } from '@/components';
import { render } from '@/lib';

describe('Loading', () => {
  it('renders the Loading component ', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading-container')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
