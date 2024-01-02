import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import { CatalogMemo } from './catalog.tsx';

describe('Catalog', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <CatalogMemo/>
      </BrowserRouter>
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
