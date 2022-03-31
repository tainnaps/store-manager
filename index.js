require('dotenv').config();
const express = require('express');
const errorMiddleware = require('./middlewares/error');
const ProductsRouter = require('./routes/products');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
