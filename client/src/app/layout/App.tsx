import {useEffect, useState } from 'react'
import Header from './Header'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { getCookie } from '../util/util'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'
import { useAppDispatch } from '../store/configureStore'
import { setBasket } from '../../features/basket/basketSlice'

function App() {

  const dispatch = useAppDispatch();
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const buyerId = getCookie('buyerId');
    //console.log(buyerId);
    if(buyerId) {
      agent.Basket.get()
          .then(basket => dispatch(setBasket(basket)))
          .catch(err => console.log(err))
          .finally(()=>setLoading(false))
    } else {
      setLoading(false)
    }
  },[dispatch])


  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  const handleThemeChange = () => setDarkMode(!darkMode)

  if(loading) return <LoadingComponent message='Initializing App...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
      <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
