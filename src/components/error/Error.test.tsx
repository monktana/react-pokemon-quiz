import { screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Error } from '@/components';
import { render } from '@/lib';
import { geti18nText } from '@/util';

describe('Error', () => {
  it('displays the error texts', () => {
    render(<Error resetErrorBoundary={vi.fn()} error={null} />);

    expect(screen.getByText(geti18nText('en', 'error.title'))).toBeInTheDocument();
    expect(screen.getByText(geti18nText('en', 'error.info'))).toBeInTheDocument();
  });

  it('displays the reset button', () => {
    const resetErrorBoundary = vi.fn();
    render(<Error resetErrorBoundary={resetErrorBoundary} error={null} />);

    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent(geti18nText('en', 'error.button'));
  });

  it('calls the resetErrorBoundary when the button is clicked', () => {
    const resetErrorBoundary = vi.fn();
    render(<Error resetErrorBoundary={resetErrorBoundary} error={null} />);

    const button = screen.getByRole('button');
    button.click();

    expect(resetErrorBoundary).toHaveBeenCalled();
  });
});
