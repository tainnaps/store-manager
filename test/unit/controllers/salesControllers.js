const { expect } = require('chai');
const sinon = require('sinon');
const SalesServices = require('../../../services/sales');
const SalesControllers = require('../../../controllers/sales');

describe('SalesControllers', () => {
  describe('calling getAll controller', () => {
    describe('when there is no error in the app', () => {
      const request = {};
      const response = {};
      let next;

      const fakeSales = [
        {
          saleId: 1,
          date: '2022-04-03T05:09:19.000Z',
          productId: 1,
          quantity: 5
        },
        {
          saleId: 2,
          date: '2022-04-03T05:09:19.000Z',
          productId: 3,
          quantity: 15
        },
      ];

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        next = sinon.stub().returns();

        sinon.stub(SalesServices, 'getAll').resolves(fakeSales);
      });

      after(() => {
        SalesServices.getAll.restore();
      });

      it('should call status with 200 code', async () => {
        await SalesControllers.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('should call json with array of sales', async () => {
        await SalesControllers.getAll(request, response, next);

        expect(response.json.calledWith(fakeSales)).to.be.true;
      });

      it('should not call next', async () => {
        await SalesControllers.getAll(request, response, next);

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

        next = sinon.stub().returns();

        sinon.stub(SalesServices, 'getAll').throws(error);
      });

      after(() => {
        SalesServices.getAll.restore();
      });

      it('should not call status', async () => {
        await SalesControllers.getAll(request, response, next);

        expect(response.status.called).to.be.false;
      });

      it('should not call json', async () => {
        await SalesControllers.getAll(request, response, next);

        expect(response.json.called).to.be.false;
      });

      it('should call next with catched error', async () => {
        await SalesControllers.getAll(request, response, next);

        expect(next.calledWith(error)).to.be.true;
      });
    });
  });
});
