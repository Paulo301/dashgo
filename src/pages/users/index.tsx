import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { User, useUsers } from "@/services/hooks/useUsers";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";



export default function UsersList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex
        w='100%'
        my='6'
        maxW={1480}
        mx='auto'
        px='6'
      >
        <Sidebar />

        <Box
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p='8'
        >
          <Flex
            mb='8'
            justify='space-between'
            align='center'
          >
            <Heading
              fontSize='large'
              fontWeight='normal'
            >
              Usuários

              { !isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
            </Heading>

            <Button 
              as={Link}
              size='sm'
              fontSize='sm'
              colorScheme='pink'
              leftIcon={<Icon as={RiAddLine} fontSize='20' />}
              href='/users/create'
            >
              Criar novo
            </Button>
            
          </Flex>

          { isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th
                      px={['4', '4', '6']}
                      color='gray.300'
                      w='8'
                    >
                      <Checkbox colorScheme='pink' />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w='8'></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  { data && data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme='pink' />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight='bold'>{user.name}</Text>
                          <Text fontSize='sm'>{user.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      <Td>
                      <Button 
                        as='a'
                        size='sm'
                        fontSize='sm'
                        colorScheme='purple'
                        leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
                      >
                        Editar
                      </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              
              <Pagination
                totalCountOfRegisters={data?.totalCount || 0}
                currentPage={page}
                registersPerPage={10}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}