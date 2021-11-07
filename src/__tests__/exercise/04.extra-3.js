// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

test('submitting the form calls onSubmit with username and password', () => {
  function getLoginDeets({user = null, pass = null}) {
    return {
      user: user || faker.internet.userName(),
      pass: pass || faker.internet.password(),
    }
  }

  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  // 🐨 get the username and password fields via `getByLabelText`
  const username = screen.getByLabelText('Username')
  const password = screen.getByLabelText('Password')
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  const {user, pass} = getLoginDeets({user: 'Krisp'})
  userEvent.type(username, user)
  userEvent.type(password, pass)
  //
  // 🐨 click on the button with the text "Submit"
  const submitButton = screen.getByRole('button', {text: 'Submit'})
  userEvent.click(submitButton)
  //
  expect(handleSubmit).toHaveBeenCalledWith({
    username: user,
    password: pass,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
