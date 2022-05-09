import { FunctionComponent, StrictMode, ReactNode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { worker } from './mocks/browser'
import { App } from './App'
import { ChakraProvider } from '@chakra-ui/react'

const appReady =
    __DEV__
    ? worker.start()
    : Promise.resolve()


const Providers: FunctionComponent<{
  children: ReactNode
}> = props => (
            <ChakraProvider>
               {props.children}
            </ChakraProvider>
)

appReady.then(() => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = ReactDOM.createRoot(container)
    root.render(<Providers><App /></Providers>)

})
