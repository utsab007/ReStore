import {
  Box,
  Button,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Add, Delete, Remove } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import BasketSummary from './BasketSummary'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice'

const BasketPage = () => {
  const { basket,status } = useAppSelector(state=>state.basket)
  const dispatch = useAppDispatch();
  // const [status, setStatus] = useState({
  //   loading: false,
  //   name: '',
  // })

  // const handleAddItem = (productId: number, name: string) => {
  //   setStatus({ loading: true, name })
  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch((err) => console.log(err))
  //     .finally(() => setStatus({ loading: false, name: '' }))
  // }

  // const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
  //   setStatus({ loading: true, name })
  //   agent.Basket.removeItem(productId, quantity)
  //     .then(() => dispatch(removeItem({productId, quantity})))
  //     .catch((err) => console.log(err))
  //     .finally(() => setStatus({ loading: false, name: '' }))
  // }

  if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='center'>Quantity</TableCell>
            <TableCell align='right'>Subtotal</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                <Box display='flex'>
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align='right'>
                ${(item.price / 100).toFixed(2)}
              </TableCell>
              <TableCell align='center'>
                <LoadingButton
                  loading={
                    status === ('pendingRemoveItem'+item.productId+'rem')
                  }
                  onClick={() =>
                    dispatch(removeBasketItemAsync({productId: item.productId,quantity: 1,name: 'rem'}))
                  }
                  color='error'
                >
                  <Remove />
                </LoadingButton>
                {item.quantity}
                <LoadingButton
                  loading={
                    status === ('pendingAddItem'+item.productId)
                  }
                  onClick={() =>
                    dispatch(addBasketItemAsync({productId: item.productId}))
                  }
                  color='secondary'
                >
                  <Add />
                </LoadingButton>
              </TableCell>
              <TableCell align='right'>
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </TableCell>
              <TableCell align='right'>
                <LoadingButton
                  loading={
                    status === ('pendingRemoveItem'+item.productId+'del')
                  }
                  onClick={() =>
                    dispatch(removeBasketItemAsync({productId: item.productId,quantity: item.quantity,name: 'del'}))
                  }
                  color='error'
                >
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid2 container>
          <Grid2 size={{xs:6}} />
          <Grid2 size={{xs:6}}>
            <BasketSummary />
            <Button component={Link}
            to='/checkout'
            variant='contained'
            size='large'
            fullWidth
            >
              Checkout
            </Button>
          </Grid2>
    </Grid2>
    </>
  )
}

export default BasketPage
