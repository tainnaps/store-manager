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
        sinon.stub(ProductsServices, 'getAll').rejects(error);
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
  
        const fakeProduct = {
          id: 2,
          name: 'Areia mágica',
          quantity: 20
        };
  
        before(() => {
          request.params = { id: 2 };

          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'getById').resolves({ product: fakeProduct });
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
  
          expect(response.json.calledWith(fakeProduct)).to.be.true;
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
  
        const notFoundError = {
          type: 'notFound',
          message: 'Product not found',
        };
  
        before(() => {
          request.params = {};

          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'getById').resolves({ error: notFoundError });
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
  
        it('should call next with not found error', async () => {
          await ProductsControllers.getById(request, response, next);
  
          expect(next.calledWith(notFoundError)).to.be.true;
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

        sinon.stub(ProductsServices, 'getById').rejects(error);
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

  describe('calling create controller', () => {
    describe('when there is no error in the app', () => {
      describe('and the product is created', () => {
        const request = {};
        const response = {};
        let next;
  
        const fakeProduct = {
          id: 2,
          name: 'Areia mágica',
          quantity: 20
        };
  
        before(() => {
          request.body = {
            name: 'Areia mágica',
            quantity: 20
          };

          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'create').resolves({ product: fakeProduct });
        });
  
        after(() => {
          ProductsServices.create.restore();
        });
  
        it('should call status with 201 code', async () => {
          await ProductsControllers.create(request, response, next);
  
          expect(response.status.calledWith(201)).to.be.true;
        });
  
        it('should call json with created product', async () => {
          await ProductsControllers.create(request, response, next);
  
          expect(response.json.calledWith(fakeProduct)).to.be.true;
        });
  
        it('should not call next', async () => {
          await ProductsControllers.create(request, response, next);
  
          expect(next.called).to.be.false;
        });
      });

      describe('and the product is not created', () => {
        const request = {};
        const response = {};
        let next;
  
        const alreadyExistsError = {
          type: 'alreadyExists',
        message: 'Product already exists',
        };
  
        before(() => {
          request.body = {
            name: 'Areia mágica',
            quantity: 20
          };

          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'create').resolves({ error: alreadyExistsError });
        });
  
        after(() => {
          ProductsServices.create.restore();
        });
  
        it('should not call status', async () => {
          await ProductsControllers.create(request, response, next);
  
          expect(response.status.called).to.be.false;
        });
  
        it('should not call json', async () => {
          await ProductsControllers.create(request, response, next);
  
          expect(response.json.called).to.be.false;
        });
  
        it('should call next with already exists error', async () => {
          await ProductsControllers.create(request, response, next);
  
          expect(next.calledWith(alreadyExistsError)).to.be.true;
        });
      });
    });

    describe('when an error in the app happens', () => {
      const request = {};
      const response = {};
      let next;

      const error = new Error;

      before(() => {
        request.body = {
          name: 'Areia mágica',
          quantity: 20
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        next = sinon.stub().returns();

        sinon.stub(ProductsServices, 'create').rejects(error);
      });

      after(() => {
        ProductsServices.create.restore();
      });

      it('should not call status', async () => {
        await ProductsControllers.create(request, response, next);

        expect(response.status.called).to.be.false;
      });

      it('should not call json', async () => {
        await ProductsControllers.create(request, response, next);

        expect(response.json.called).to.be.false;
      });

      it('should call next with catched error', async () => {
        await ProductsControllers.create(request, response, next);

        expect(next.calledWith(error)).to.be.true;
      });
    });
  });

  describe('calling update controller', () => {
    describe('when there is no error in the app', () => {
      describe('and the product is updated', () => {
        const request = {};
        const response = {};
        let next;
  
        const fakeProduct = {
          id: 2,
          name: 'Areia mágica',
          quantity: 20
        };
  
        before(() => {
          request.body = {
            name: 'Areia mágica',
            quantity: 20
          };

          request.params = { id: 2 };

          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'update').resolves({ product: fakeProduct });
        });
  
        after(() => {
          ProductsServices.update.restore();
        });
  
        it('should call status with 200 code', async () => {
          await ProductsControllers.update(request, response, next);
  
          expect(response.status.calledWith(200)).to.be.true;
        });
  
        it('should call json with updated product', async () => {
          await ProductsControllers.update(request, response, next);
  
          expect(response.json.calledWith(fakeProduct)).to.be.true;
        });
  
        it('should not call next', async () => {
          await ProductsControllers.update(request, response, next);
  
          expect(next.called).to.be.false;
        });
      });

      describe('and the product is not updated', () => {
        const request = {};
        const response = {};
        let next;
  
        const notFoundError = {
          type: 'notFound',
          message: 'Product not found',
        };
  
        before(() => {
          request.body = {
            name: 'Areia mágica',
            quantity: 20
          };

          request.params = { id: 2 };

          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'update').resolves({ error: notFoundError });
        });
  
        after(() => {
          ProductsServices.update.restore();
        });
  
        it('should not call status', async () => {
          await ProductsControllers.update(request, response, next);
  
          expect(response.status.called).to.be.false;
        });
  
        it('should not call json', async () => {
          await ProductsControllers.update(request, response, next);
  
          expect(response.json.called).to.be.false;
        });
  
        it('should call next with not found error', async () => {
          await ProductsControllers.update(request, response, next);
  
          expect(next.calledWith(notFoundError)).to.be.true;
        });
      });
    });

    describe('when an error in the app happens', () => {
      const request = {};
      const response = {};
      let next;

      const error = new Error;

      before(() => {
        request.body = {
          name: 'Areia mágica',
          quantity: 20
        };

        request.params = { id: 2 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        next = sinon.stub().returns();

        sinon.stub(ProductsServices, 'update').rejects(error);
      });

      after(() => {
        ProductsServices.update.restore();
      });

      it('should not call status', async () => {
        await ProductsControllers.update(request, response, next);

        expect(response.status.called).to.be.false;
      });

      it('should not call json', async () => {
        await ProductsControllers.update(request, response, next);

        expect(response.json.called).to.be.false;
      });

      it('should call next with catched error', async () => {
        await ProductsControllers.update(request, response, next);

        expect(next.calledWith(error)).to.be.true;
      });
    });
  });

  describe('calling deleteById controller', () => {
    describe('when there is no error in the app', () => {
      describe('and the product is deleted', () => {
        const request = {};
        const response = {};
        let next;

        before(() => {
          request.params = { id: 2 };

          response.status = sinon.stub().returns(response);
          response.end = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'deleteById').resolves({});
        });
  
        after(() => {
          ProductsServices.deleteById.restore();
        });
  
        it('should call status with 204 code', async () => {
          await ProductsControllers.deleteById(request, response, next);
  
          expect(response.status.calledWith(204)).to.be.true;
        });
  
        it('should call end', async () => {
          await ProductsControllers.deleteById(request, response, next);
  
          expect(response.end.called).to.be.true;
        });
  
        it('should not call next', async () => {
          await ProductsControllers.deleteById(request, response, next);
  
          expect(next.called).to.be.false;
        });
      });

      describe('and the product is not deleted', () => {
        const request = {};
        const response = {};
        let next;
  
        const notFoundError = {
          type: 'notFound',
          message: 'Product not found',
        };
  
        before(() => {
          request.params = { id: 2 };

          response.status = sinon.stub().returns(response);
          response.end = sinon.stub().returns();

          next = sinon.stub().returns();

          sinon.stub(ProductsServices, 'deleteById').resolves({ error: notFoundError });
        });
  
        after(() => {
          ProductsServices.deleteById.restore();
        });
  
        it('should not call status', async () => {
          await ProductsControllers.deleteById(request, response, next);
  
          expect(response.status.called).to.be.false;
        });
  
        it('should not call end', async () => {
          await ProductsControllers.deleteById(request, response, next);
  
          expect(response.end.called).to.be.false;
        });
  
        it('should call next with not found error', async () => {
          await ProductsControllers.deleteById(request, response, next);
  
          expect(next.calledWith(notFoundError)).to.be.true;
        });
      });
    });

    describe('when an error in the app happens', () => {
      const request = {};
      const response = {};
      let next;

      const error = new Error;

      before(() => {
        request.params = { id: 2 };

        response.status = sinon.stub().returns(response);
        response.end = sinon.stub().returns();

        next = sinon.stub().returns();

        sinon.stub(ProductsServices, 'deleteById').rejects(error);
      });

      after(() => {
        ProductsServices.deleteById.restore();
      });

      it('should not call status', async () => {
        await ProductsControllers.deleteById(request, response, next);

        expect(response.status.called).to.be.false;
      });

      it('should not call end', async () => {
        await ProductsControllers.deleteById(request, response, next);

        expect(response.end.called).to.be.false;
      });

      it('should call next with catched error', async () => {
        await ProductsControllers.deleteById(request, response, next);

        expect(next.calledWith(error)).to.be.true;
      });
    });
  });
});
