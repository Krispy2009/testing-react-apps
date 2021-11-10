// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
window.navigator.geolocation = {getCurrentPosition: jest.fn()}
// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
function deferred() {
  let resolve, reject

  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}
// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// // assert on the resolved state

test('handles error gracefully', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {coords: {latitude: 1124, longitude: 123}}
  // 🐨 create a deferred promise here
  const {promise, resolve, reject} = deferred()

  // 🐨 Now we need to mock the geolocation's getCurrentPosition function
  // To mock something you need to know its API and simulate that in your mock:
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  //
  // here's an example of the API:
  // function success(position) {}
  // function error(error) {}
  // navigator.geolocation.getCurrentPosition(success, error)
  navigator.geolocation.getCurrentPosition.mockImplementation(
    (success, error) => {
      promise.then(
        () => {
          console.log('successsss')
          success(fakePosition)
        },
        () => {
          console.log('mamma mia there is an error ')
          error(new Error('MAMMA MIA'))
        },
      )
    },
  )
  render(<Location />)
  const loadingSpinner = screen.getByLabelText(/loading/i)
  expect(loadingSpinner).toBeInTheDocument()

  await act(async () => {
    reject()
  })

  expect(screen.queryByLabelText(/loading/)).not.toBeInTheDocument()
  expect(screen.queryByText(/longitude/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/latitude/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent('MAMMA MIA')
})

/*
eslint
  no-unused-vars: "off",
*/
