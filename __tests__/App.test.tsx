import * as React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'

import { render, fireEvent, screen, waitFor, act } from './test-utils'
import { App } from '../src/App'


const server = setupServer(
    rest.get('/foo', (req, res, ctx) =>
        res(ctx.status(200), ctx.json('foo')))
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('foo test', async () => {

    render(<App />)

    let button = screen.getByRole('button')

    fireEvent.click(button)

    await waitFor(() => screen.getByRole('message'))

    expect(screen.getByRole('message')).toHaveTextContent('Button was pressed!')
    expect(screen.getByRole('button')).toBeDisabled()

})

