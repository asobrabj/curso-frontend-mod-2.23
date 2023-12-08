/* eslint-disable no-undef */
import '@testing-library/jest-dom'

const originalConsoleError = console.error
console.error = jest.fn()

afterAll(() => {
  console.error = originalConsoleError
})
