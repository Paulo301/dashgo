import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Flex } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Flex direction='column'>
      <Header />

      <Flex
        w='100%'
        my='6'
        maxW={1480}
        mx='auto'
        px='6'
      >
        <Sidebar />
      </Flex>
    </Flex>
  );
}