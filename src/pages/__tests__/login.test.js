/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Login from '../login'

describe('Login Component', () => {
  let loginComponent
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
    const history = createMemoryHistory()
    const { getByTestId } = render(
      <Router history={history}>
        <Login />
      </Router>
    )
    loginComponent = getByTestId('login')
  })

  it('Should match snapshot', () => {
    expect(loginComponent).toMatchSnapshot()
  })
})
