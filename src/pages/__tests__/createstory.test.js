/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import UserStory from '../createstory'

describe('Login Component', () => {
  let component
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
        <UserStory />
      </Router>
    )
    component = getByTestId('create')
  })

  it('Should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})
