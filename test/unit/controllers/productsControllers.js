const { expect } = require('chai');
const sinon = require('sinon');
const ProductsServices = require('../../../services/products');
const ProductsControllers = require('../../../controllers/products');

describe('ProductsControllers', () => {
  describe('calling getAll controller', () => {
    describe('when there is no error in the app', () => {
      const request = {};
      const response = {};
      let next;

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
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ProductsServices, 'getAll').resolves(fakeProducts);
        next = sinon.stub().returns();
      });

      after(() => {
        ProductsServices.getAll.restore();
      });

      it('should call status with 200 code', async () => {
        await ProductsControllers.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('should call json with array of products', async () => {
        await ProductsControllers.getAll(request, response, next);

        expect(response.json.calledWith(fakeProducts)).to.be.true;
      });

      it('should not call next', async () => {
        await ProductsControllers.getAll(request, response, next);

        expect(next.called).to.be.false;
      });
    });

    describe('when an error in the app happens', () => {
      const request = {};
      const response = {};
      let next;

      const error = new Error;

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(ProductsServices, 'getAll').throws(error);
        next = sinon.stub().returns();
      });

      after(() => {
        ProductsServices.getAll.restore();
      });

      it('should not call status', async () => {
        await ProductsControllers.getAll(request, response, next);

        expect(response.status.called).to.be.false;
      });

      it('should not call json', async () => {
        await ProductsControllers.getAll(request, response, next);

        expect(response.json.called).to.be.false;
      });

      it('should call next with catched error', async () => {
        await ProductsControllers.getAll(request, response, next);

        expect(next.calledWith(error)).to.be.true;
      });
    });
  });

  describe('calling getById controller', () => {
    describe('when there is no error in the app', () => {
      describe('and the product is found', () => {
        const request = {};
        const response = {};
        let next;
  
        const fakeFoundResult = {
          product: {
            id: 2,
            name: 'Areia mágica',
            quantity: 20
          },
        };
  
        before(() => {
          request.params = { id: 2 };

          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'getById').resolves(fakeFoundResult);
        });
  
        after(() => {
          ProductsServices.getById.restore();
        });
  
        it('should call status with 200 code', async () => {
          await ProductsControllers.getById(request, response, next);
  
          expect(response.status.calledWith(200)).to.be.true;
        });
  
        it('should call json with found product', async () => {
          await ProductsControllers.getById(request, response, next);
  
          expect(response.json.calledWith(fakeFoundResult.product)).to.be.true;
        });
  
        it('should not call next', async () => {
          await ProductsControllers.getById(request, response, next);
  
          expect(next.called).to.be.false;
        });
      });

      describe('and the product is not found', () => {
        const request = {};
        const response = {};
        let next;
  
        const fakeNotFoundResult = {
          error: {
            type: 'notFound',
            message: 'Product not found',
          },
        };
  
        before(() => {
          request.params = {};

          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'getById').resolves(fakeNotFoundResult);
        });
  
        after(() => {
          ProductsServices.getById.restore();
        });
  
        it('should not call status', async () => {
          await ProductsControllers.getById(request, response, next);
  
          expect(response.status.called).to.be.false;
        });
  
        it('should not call json', async () => {
          await ProductsControllers.getById(request, response, next);
  
          expect(response.json.called).to.be.false;
        });
  
        it('should call next with not found result', async () => {
          await ProductsControllers.getById(request, response, next);
  
          expect(next.calledWith(fakeNotFoundResult.error)).to.be.true;
        });
      });
    });

    describe('when an error in the app happens', () => {
      const request = {};
      const response = {};
      let next;

      const error = new Error;

      before(() => {
        request.params = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        next = sinon.stub().returns();

        sinon.stub(ProductsServices, 'getById').throws(error);
      });

      after(() => {
        ProductsServices.getById.restore();
      });

      it('should not call status', async () => {
        await ProductsControllers.getById(request, response, next);

        expect(response.status.called).to.be.false;
      });

      it('should not call json', async () => {
        await ProductsControllers.getById(request, response, next);

        expect(response.json.called).to.be.false;
      });

      it('should call next with catched error', async () => {
        await ProductsControllers.getById(request, response, next);

        expect(next.calledWith(error)).to.be.true;
      });
    });
  });
});
