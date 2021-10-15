import { render, screen, fireEvent } from '@testing-library/react';
import { AttributesProvider } from '../../contexts';
import { Prism } from './Prism';

describe('Prism', () => {
  const Component = () =>
    render(
      <AttributesProvider>
        <Prism />
      </AttributesProvider>,
    );

  it('renders with auto as default', async () => {
    Component();
    expect(screen.getAllByText('auto')).toHaveLength(8);
  });

  it('shows a default value of "px" when any initial attribute is clicked', async () => {
    Component();
    fireEvent.click(screen.getByTestId('mt'));
    expect(screen.getAllByText('auto')).toHaveLength(7);
    expect(screen.getByText('px')).toBeDefined();
  });

  /* NOTE more tests can be written to walk through all expected functionality :) */
});
