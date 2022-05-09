import {
    FunctionComponent,
    useState,
    useEffect
} from 'react'
import {
    Box,
    Heading,
    VStack,
    HStack,
    Input,
    Button,
    IconButton,
    Table,
    Td,
    Tr,
    Thead,
    Tbody,
    Th,
    Spinner,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { assertType } from 'typescript-is'

type RemoteData<E, D> =
    | { type: 'idle' }
    | { type: 'loading' }
    | { type: 'success', data: D }
    | { type: 'error', error: E }


export const App: FunctionComponent<{}> = props => {

    const [query, setQuery] = useState<string | null>(null)

    const [state, setState] = useState<RemoteData<string, Array<Components.Schemas.Company>>>({ type: 'idle' })
    
    useEffect(
        () => {
            if (typeof query === 'string' && 3 <= query.length) {
                loadCompanies(query)
            }
        },
        [query]
    )
        
    const loadCompanies = async (query: string) => {
        try {
            setState({ type: 'loading' })
            const { data } = await axios.get('https://api.overheid.io/suggest/openkvk/' + query, {
                params: {
                    'ovio-api-key': __API_KEY__
                }
            })

            assertType<Paths.SuggestOpenkvk.Get.Responses.$200>(data)

            setState({ type: 'success', data: data.handelsnaam })
        }
        catch (e) {
            if (e instanceof Error) {
                setState({ type: 'error', error: e.message })
            }
            else {
                setState({ type: 'error', error: 'Unknown error' })
            }
        }
    }


    return (
        <VStack>
            
            <Box p={15}>
                <HStack>
                    <Input
                        placeholder="Company search terms"
                        onInput={e => setQuery((e.target as HTMLInputElement).value)}
                    />

                    <IconButton
                        aria-label="Search"
                        icon={<SearchIcon />}
                    />

                </HStack>
            </Box>

            {
                state.type === 'idle'
                ? <p>Enter search terms to look up companies</p>
                : state.type === 'loading'
                ? <Center><Spinner /></Center>
                : state.type === 'success'
                ? <ResultsTable data={state.data} />
                : state.type === 'error'
                ? (
                    <Alert status="error">
                        <AlertIcon />
                        <Box>
                            <AlertTitle>An error occurred</AlertTitle>
                            <AlertDescription>
                                We were unable to display the results: {state.error}
                            </AlertDescription>
                        </Box>
                    </Alert>
                )
                : null
            }
            
        </VStack>
    )
}


const ResultsTable: FunctionComponent<{
    data: Array<Components.Schemas.Company>
}> = props => (
    <Table>
        <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Dossiernummer</Th>
                <Th>City</Th>
            </Tr>
        </Thead>
        <Tbody>
            {props.data.map((item: any, idx: number) =>
                <Tr key={idx}>
                    <Td>{item.handelsnaam}</Td>
                    <Td>{item.dossiernummer}</Td>
                    <Td>{item.plaats}</Td>
                </Tr>
            )}
        </Tbody>
    </Table>
)
