import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';


  test('App render without error', ()=> {
    render(<App />)
  })

test('renders message when !show', () => {
  render(<App />)
  screen.getByText(/Fetching data.../i)
})