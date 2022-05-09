import {
    FunctionComponent,
    useState
} from 'react'
import {
    Box,
    Heading,
    Button,
    VStack
} from '@chakra-ui/react'

export const App: FunctionComponent<{}> = props => {
    const [clicked, setClicked] = useState<boolean>(false)

    return (
        <VStack>
            <Heading>Hello world!</Heading>
            <Button
                disabled={clicked}
                role="button"
                onClick={() => setClicked(true)}
            >
                Press me!
            </Button>
            {
                clicked
                ? <p role="message">Button was pressed!</p>
                : null
            }

        </VStack>
    )
}

