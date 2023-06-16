import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export default function UsersList() {
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();

    const users = data.users.map((user: User) => {
      const { createdAt, ...rest } = user;

      return {
        createdAt: new Date(createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        ...rest
      };
    });

    return users;
  });

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
                  { data.map((user: User) => (
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

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}