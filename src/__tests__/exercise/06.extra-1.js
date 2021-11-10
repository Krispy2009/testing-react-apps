// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {coords: {latitude: 1124, longitude: 123}}

  let setPositionFunc
  useCurrentPosition.mockImplementation(() => {
    const [position, setPosition] = React.useState([])
    setPositionFunc = setPosition
    return position
  })

  render(<Location />)

  const loadingSpinner = screen.getByLabelText(/loading/i)
  expect(loadingSpinner).toBeInTheDocument()

  act(() => setPositionFunc([fakePosition]))

  expect(screen.queryByLabelText(/loading/)).not.toBeInTheDocument()
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
