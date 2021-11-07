// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  // 🐨 get the username and password fields via `getByLabelText`
  const username = screen.getByLabelText('Username')
  const password = screen.getByLabelText('Password')
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  userEvent.type(username, 'Krisp')
  userEvent.type(password, 'supersecret')
  //
  // 🐨 click on the button with the text "Submit"
  const submitButton = screen.getByRole('button', {text: 'Submit'})
  userEvent.click(submitButton)
  //
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'Krisp',
    password: 'supersecret',
  })
})

/*
eslint
  no-unused-vars: "off",
*/
