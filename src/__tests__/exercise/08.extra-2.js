// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'

let result
function setup(props) {
  const TestComponent = props => {
    result = useCounter(props)
    return null
  }
  render(<TestComponent {...props} />)
}

test('exposes the count and increment/decrement functions', () => {
  setup()

  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows customization of the initial count', () => {
  setup({initialCount: 5})

  expect(result.count).toBe(5)
  act(() => result.increment())
  expect(result.count).toBe(6)

  act(() => result.decrement())
  expect(result.count).toBe(5)
})

test('allows customization of the step', () => {
  setup({step: 5})

  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(5)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})
/* eslint no-unused-vars:0 */
