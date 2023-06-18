import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme';
import { SidebarDrawerProvider } from '@/contexts/SidebarDrawerContext';
import { makeServer } from '@/services/mirage';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '@/services/queryClient';

export default function App({ Component, pageProps }: AppProps) {

  if(process.env.NODE_ENV === 'development') {
    makeServer();
  }


  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
