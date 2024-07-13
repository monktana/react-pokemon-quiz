import { screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Navbar } from '@/components';
import { render } from '@/lib';

describe('Navbar', () => {
  it('displays the color mode switch', () => {
    render(<Navbar />);
    expect(screen.getByTestId('color-mode-switch')).toBeInTheDocument();
  });

  it('displays the language menu', () => {
    render(<Navbar />);
    expect(screen.getByTestId('language-switch')).toBeInTheDocument();
  });
});
