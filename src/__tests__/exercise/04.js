// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData
  function handleSubmit(data) {
    submittedData = data
  }
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
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
  // assert that submittedData is correct
  expect(submittedData).toEqual({username: 'Krisp', password: 'supersecret'})
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
