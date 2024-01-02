import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import { LikeThisMemo } from './like-this.tsx';


describe('LikeThis', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <LikeThisMemo />
      </BrowserRouter>
    );

    expect(screen.getByText('More like this')).toBeInTheDocument();
  });
});
