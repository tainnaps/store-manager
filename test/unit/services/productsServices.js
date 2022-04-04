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
        expect(result).to.have.deep.property('product', fakeProduct);
      });
    });

    describe('when the product is not found', () => {
      const error = {
        type: 'notFound',
        message: 'Product not found',
      };

      before(() => {
        sinon.stub(ProductsModels, 'getById').resolves(null);
      });

      after(() => {
        ProductsModels.getById.restore();
      });

      it('should return an object with the property "error"', async () => {
        const result = await ProductsServices.getById();

        expect(result).to.be.an('object');
        expect(result).to.have.deep.property('error', error);
      });
    });
  });

  describe('Create product', () => {
    const fakeProduct = {
      id: 2,
      name: 'Areia mágica',
      quantity: 20
    };

    describe('when the product does not exist yet', () => {
      before(() => {
        sinon.stub(ProductsModels, 'create').resolves(fakeProduct);
        sinon.stub(ProductsModels, 'getByName').resolves(null);
      });

      after(() => {
        ProductsModels.create.restore();
        ProductsModels.getByName.restore();
      });

      it('should call ProductsModels.create', async () => {
        await ProductsServices.create('Areia mágica', 20);

        expect(ProductsModels.create.called).to.be.true;
      });

      it('should return an object with the property "product" whose value is the product\'s details', async () => {
        const result = await ProductsServices.create('Areia mágica', 20);

        expect(result).to.be.an('object');
        expect(result).to.have.deep.property('product', fakeProduct);
      });
    });

    describe('when the product already exists', () => {
      const error = {
        type: 'alreadyExists',
        message: 'Product already exists',
      };

      before(() => {
        sinon.stub(ProductsModels, 'create').resolves();
        sinon.stub(ProductsModels, 'getByName').resolves(fakeProduct);
      });

      after(() => {
        ProductsModels.create.restore();
        ProductsModels.getByName.restore();
      });

      it('should not call ProductsModels.create', async () => {
        await ProductsServices.create('Areia mágica', 20);

        expect(ProductsModels.create.notCalled).to.be.true;
      });

      it('should return an object with the property "error"', async () => {
        const result = await ProductsServices.create('Areia mágica', 20);

        expect(result).to.be.an('object');
        expect(result).to.have.deep.property('error', error);
      });
    });
  });

  describe('Update product', () => {
    const fakeProduct = {
      id: 2,
      name: 'Areia mágica',
      quantity: 20
    };

    describe('when the product does not exist', () => {
      const error = {
        type: 'notFound',
        message: 'Product not found',
      };

      before(() => {
        sinon.stub(ProductsModels, 'update').resolves();
        sinon.stub(ProductsModels, 'getById').resolves(null);
      });

      after(() => {
        ProductsModels.update.restore();
        ProductsModels.getById.restore();
      });

      it('should not call ProductsModels.update', async () => {
        await ProductsServices.update(2, 'Areia mágica', 20);

        expect(ProductsModels.update.notCalled).to.be.true;
      });

      it('should return an object with the property "error"', async () => {
        const result = await ProductsServices.update(2, 'Areia mágica', 20);

        expect(result).to.be.an('object');
        expect(result).to.have.deep.property('error', error);
      });
    });

    describe('when the product exists', () => {
      before(() => {
        sinon.stub(ProductsModels, 'update').resolves(fakeProduct);
        sinon.stub(ProductsModels, 'getById').resolves(fakeProduct);
      });

      after(() => {
        ProductsModels.update.restore();
        ProductsModels.getById.restore();
      });

      it('should call ProductsModels.update', async () => {
        await ProductsServices.update(2, 'Areia mágica', 20);

        expect(ProductsModels.update.called).to.be.true;
      });

      it('should return an object with the property "product" whose value is the product\'s details', async () => {
        const result = await ProductsServices.update(2, 'Areia mágica', 20);

        expect(result).to.be.an('object');
        expect(result).to.have.deep.property('product', fakeProduct);
      });
    });
  });

  describe('Delete a product by id', () => {
    describe('when the product does not exist', () => {
      const error = {
        type: 'notFound',
        message: 'Product not found',
      };

      before(() => {
        sinon.stub(ProductsModels, 'deleteById').resolves();
        sinon.stub(ProductsModels, 'getById').resolves(null);
      });

      after(() => {
        ProductsModels.deleteById.restore();
        ProductsModels.getById.restore();
      });

      it('should not call ProductsModels.deleteById', async () => {
        await ProductsServices.deleteById(2);

        expect(ProductsModels.deleteById.notCalled).to.be.true;
      });

      it('should return an object with the property "error"', async () => {
        const result = await ProductsServices.deleteById(2);

        expect(result).to.be.an('object');
        expect(result).to.have.deep.property('error', error);
      });
    });

    describe('when the product exists', () => {
      const fakeProduct = {
        id: 2,
        name: 'Areia mágica',
        quantity: 20
      };

      before(() => {
        sinon.stub(ProductsModels, 'deleteById').resolves();
        sinon.stub(ProductsModels, 'getById').resolves(fakeProduct);
      });

      after(() => {
        ProductsModels.deleteById.restore();
        ProductsModels.getById.restore();
      });

      it('should call ProductsModels.deleteById', async () => {
        await ProductsServices.deleteById(2);

        expect(ProductsModels.deleteById.called).to.be.true;
      });

      it('should return an empty object', async () => {
        const result = await ProductsServices.deleteById(2);

        expect(result).to.be.an('object').that.is.empty;
      });
    });
  });
});
