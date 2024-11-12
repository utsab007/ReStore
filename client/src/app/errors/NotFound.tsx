import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Container component={Paper} sx={{height: 400}}>
        <Typography gutterBottom variant="h3">Oops - we can't find what you are looking for</Typography>
        <Divider />
        <Button fullWidth component={Link} to='/Catalog'>Go back to Shop</Button>
    </Container>
  )
}

export default NotFound