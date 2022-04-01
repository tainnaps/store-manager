require('dotenv').config();
const express = require('express');
// const errorMiddleware = require('./middlewares/error');
const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

// app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
