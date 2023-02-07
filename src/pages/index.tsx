import { FC, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../assets/lbc-logo.webp'
import styles from '../styles/Home.module.css'
import { Box, Button, Typography } from '@mui/material'
import router from 'next/router'
import { ROUTES_CONVERSATIONS } from './conversations/routes'
import { Spacer, spacerSize } from '../components/common/Spacer'

const Home: FC = () => {
  const year = new Date().getFullYear()

  const handleAccessTheAppClick = useCallback(() => {
    router.push(ROUTES_CONVERSATIONS.LIST)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta
          name='description'
          content='Frontend exercise for developpers who want to join us on leboncoin.fr'
        ></meta>
      </Head>

      <main className={styles.main}>
        <Image
          src={Logo}
          alt='Leboncoin Frontend Team'
          width={400}
          height={125}
        />

        <Spacer size={spacerSize.lg} />

        <Typography variant='body1'>
          Welcome ! To access the application, simply click on the button below.
        </Typography>

        <Spacer />

        <Box>
          <Button
            onClick={handleAccessTheAppClick}
            variant='contained'
            size='large'
          >
            Access the app
          </Button>
        </Box>
      </main>

      <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
    </div>
  )
}

export default Home
