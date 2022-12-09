import { Box, Grid, Typography } from '@mui/material';
import { GetStaticProps } from 'next'
import Head from 'next/head'
import api from '../api/api'
import styles from '../styles/Home.module.css'
import {Product} from '../api/types';

interface Props {
  participantes: Product[];
}

const IndexRoute: React.FC<Props> = ({participantes}) => {

  return <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="SHOW DE TALENTO 2022" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="og:image" content={ 'https://res.cloudinary.com/dnxxkvpiz/image/upload/v1670566225/samples/people/RS19662_GettyImages-994124858-352733209_jntf8n.jpg' }/>
      <meta name="Ochoa's Show" content="✨ SHOW DE TALENTO 2022 ✨"/>
    </Head>

    <main className={styles.main}>

      <Box mb='3rem'>
      <Typography variant='h2' className={styles.title} style={{ fontSize:'2rem'}}>
        🌟
      </Typography>
      <Typography variant='h2' className={styles.title} style={{ fontSize:'2rem'}}>
        Bienvenid@ al 
      </Typography>
        <Typography variant='h1' style={{ fontSize:'3rem'}} className={styles.title} color="orange">
          ✨ SHOW DE TALENTO 2022 ✨
        </Typography>
      </Box>

      <Grid container gap={ 3 } display='flex' alignItems='center' justifyContent='center'>
          {participantes.map((participante) => (
        <a
          href={ participante.url }
          target="_blank"
          rel="noopener noreferrer"
        >
          <Grid item  mb={5} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <img
                  key={participante.id}
                  src={participante.img} 
                  style={{ width:'200px', borderRadius:'100%'}}
                />
              <Typography textAlign='center'>{ participante.id }. { participante.name }</Typography>
              <Typography textAlign='center' variant='subtitle2' color="orange">{ participante.round }</Typography>
          </Grid>
        </a>    
        ))}
      </Grid>

    </main>

    <footer className={styles.footer}>
      <a
        href="https://www.ochoagram.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        @Ochoagram
      </a>
    </footer>
  </div>
}



export const getStaticProps: GetStaticProps = async () => { 

  const participantes = await api.list();
  console.log(participantes)

  return {
    revalidate: 10,
    props: {
      participantes,
    },
  };
};


export default IndexRoute;