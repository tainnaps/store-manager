const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductsModels = require('../../../models/products');

describe('ProductsModels', () => {
  describe('Get all products', () => {
    describe('when there are products on the database', () => {
      const fakeProducts = [
        {
          id: 1,
          name: 'Boneca Barbie',
          quantity: 10
        },
        {
          id: 2,
          name: 'Areia mágica',
          quantity: 20
        },
      ];

      before(() => {
        sinon.stub(connection, 'execute').resolves([fakeProducts]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('should return an array of products', async () => {
        const products = await ProductsModels.getAll();

        expect(products).to.be.an('array');
        expect(products).to.deep.equal(fakeProducts);
      });
    });

    describe('when there are no products on the database', () => {
      const fakeProducts = [];

      before(() => {
        sinon.stub(connection, 'execute').resolves([fakeProducts]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('should return an empty array', async () => {
        const products = await ProductsModels.getAll();

        expect(products).to.be.an('array');
        expect(products).to.be.empty;
      });
    });
  });

  describe('Get product by id', () => {
    describe('when the product exists on the database', () => {
      const fakeProduct = {
        id: 2,
        name: 'Areia mágica',
        quantity: 20
      };

      before(() => {
        sinon.stub(connection, 'execute').resolves([ [fakeProduct] ]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('should return an object with the product\'s details', async () => {
        const product = await ProductsModels.getById(2);

        expect(product).to.be.an('object');
        expect(product).to.deep.equal(fakeProduct);
      });
    });

    describe('when the product does not exist on the database', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([ [] ]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('should return null', async () => {
        const product = await ProductsModels.getById();

        expect(product).to.be.null;
      });
    });
  });
});
