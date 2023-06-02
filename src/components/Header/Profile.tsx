import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>Paulo Victor Lemos</Text>
        <Text color='gray.300' fontSize='small'>
          paulolemos.dev@gmail.com
        </Text>
      </Box>

      <Avatar
        size='md'
        name='Paulo Victor Lemos'
        src='https://github.com/Paulo301.png'
      />
    </Flex>
  );
}