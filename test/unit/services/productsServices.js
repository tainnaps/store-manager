const { expect } = require('chai');
const sinon = require('sinon');
const ProductsModels = require('../../../models/products');
const ProductsServices = require('../../../services/products');

describe('ProductsServices', () => {
  describe('Get all products', () => {
    describe('when there are registered products', () => {
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
        sinon.stub(ProductsModels, 'getAll').resolves(fakeProducts);
      });

      after(() => {
        ProductsModels.getAll.restore();
      });

      it('should return an array of products', async () => {
        const products = await ProductsServices.getAll();

        expect(products).to.be.an('array');
        expect(products).to.deep.equal(fakeProducts);
      });
    });

    describe('when there are no registered products', () => {
      before(() => {
        sinon.stub(ProductsModels, 'getAll').resolves([]);
      });

      after(() => {
        ProductsModels.getAll.restore();
      });

      it('should return an empty array', async () => {
        const products = await ProductsServices.getAll();

        expect(products).to.be.an('array');
        expect(products).to.be.empty;
      });
    });
  });
});
