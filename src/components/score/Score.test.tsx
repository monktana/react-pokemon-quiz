import { screen } from '@testing-library/react';
import React from 'react';
import { describe, expect } from 'vitest';

import { Score } from '@/components';
import { render } from '@/lib';
import { geti18nText } from '@/util';

describe('<Score />', () => {
  it('displays the score label', () => {
    render(<Score />);

    expect(screen.getByTestId('score-label')).toBeVisible();
    expect(screen.getByTestId('score-label')).toHaveTextContent(geti18nText('en', 'score.label'));
  });

  it('displays the current score', () => {
    render(<Score />);

    expect(screen.getByTestId('score-value')).toBeVisible();
    expect(screen.getByTestId('score-value')).toHaveTextContent('0');
  });
});
