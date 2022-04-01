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

  describe('Get product by id', () => {
    describe('when the product is found', () => {
      const fakeProduct = {
        id: 2,
        name: 'Areia mágica',
        quantity: 20
      };

      before(() => {
        sinon.stub(ProductsModels, 'getById').resolves(fakeProduct);
      });

      after(() => {
        ProductsModels.getById.restore();
      });

      it('should return an object with the property "product" whose value is the product\'s details', async () => {
        const result = await ProductsServices.getById(2);

        expect(result).to.be.an('object');
        expect(result).to.have.property('product', fakeProduct);
      });

      it('should return an object without the property "error"', async () => {
        const result = await ProductsServices.getById(2);

        expect(result).to.be.an('object');
        expect(result).to.not.have.property('error');
      });
    });

    describe('when the product is not found', () => {
      before(() => {
        sinon.stub(ProductsModels, 'getById').resolves(null);
      });

      after(() => {
        ProductsModels.getById.restore();
      });

      it('should return an object without the property "product"', async () => {
        const result = await ProductsServices.getById();

        expect(result).to.be.an('object');
        expect(result).to.not.have.property('product');
      });

      it('should return an object with the property "error"', async () => {
        const result = await ProductsServices.getById();

        expect(result).to.be.an('object');
        expect(result).to.have.property('error');
      });

      it('error should be an object with property "message" equals "Product not found"', async () => {
        const { error } = await ProductsServices.getById();

        expect(error).to.be.an('object');
        expect(error.message).to.be.equal('Product not found');
      });
    });
  });
});
