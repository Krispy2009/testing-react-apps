// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

const TestComponent = ({props}) => {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<TestComponent />)
  const count = screen.getByText(/Count/i)
  const [increment, decrement] = screen.getAllByRole('button')

  expect(count).toHaveTextContent('Count: 0')

  userEvent.click(increment)
  expect(count).toHaveTextContent('Count: 1')

  userEvent.click(decrement)
  expect(count).toHaveTextContent('Count: 0')
})

/* eslint no-unused-vars:0 */
