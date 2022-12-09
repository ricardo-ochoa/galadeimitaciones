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
      <title>✨Imitaciones 2022✨</title>
      <meta name="description" content="SHOW DE TALENTO 2022" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="og:image" content={ 'https://res.cloudinary.com/dnxxkvpiz/image/upload/v1670566225/samples/people/RS19662_GettyImages-994124858-352733209_jntf8n.jpg' }/>
      <meta name="Ochoa's" content="✨ Gala de Imitaciones 2022 ✨"/>
    </Head>

    <main className={styles.main}>

      <Box mb='3rem'>
      <Typography variant='h2' className={styles.title} style={{ fontSize:'2rem'}}>
        🌟
      </Typography>
      <Typography variant='h2' className={styles.title} style={{ fontSize:'2rem'}}>
        Bienvenid@ a la 
      </Typography>
        <Typography variant='h1' style={{ fontSize:'3rem'}} className={styles.title} color="orange">
          ✨ Gala de Imitaciones 2022 ✨
        </Typography>
      </Box>

      <Grid container gap={ 3 } display='flex' alignItems='center' justifyContent='center'>
          {participantes.map((participante) => (
        <a
          key={participante.id}
          href={ participante.url }
          target="_blank"
          rel="noopener noreferrer"
        >
          <Grid item  xs={12} lg={12} mb={5} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <img
                 
                  src={participante.img} 
                  style={{ maxWidth:'150px', borderRadius:'1000px'}}
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