import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
    it('renders Documents title', () => {
        render(<App />); 
        const titleElement = screen.getByRole('heading', { name: /Documents/i });
        expect(titleElement).toBeInTheDocument();
    });
});
