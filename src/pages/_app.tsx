import type { AppProps } from 'next/app'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import '../styles/globals.css'
import axios from 'axios'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { DefaultLayout } from '../components/layout/DefaultLayout'
import ThemeConfig from '../theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeConfig>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ToastContainer />

          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </Hydrate>
      </QueryClientProvider>
    </ThemeConfig>
  )
}

export default MyApp
