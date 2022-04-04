const { expect } = require('chai');
const sinon = require('sinon');
const SalesModels = require('../../../models/sales');
const SalesServices = require('../../../services/sales');

describe('SalesServices', () => {
  describe('Get all sales', () => {
    describe('when there are registered sales', () => {
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
        const fakeResult = [
          {
            sale_id: 1,
            date: '2022-04-03T05:09:19.000Z',
            product_id: 1,
            quantity: 5
          },
          {
            sale_id: 2,
            date: '2022-04-03T05:09:19.000Z',
            product_id: 3,
            quantity: 15
          },
        ];

        sinon.stub(SalesModels, 'getAll').resolves(fakeResult);
      });

      after(() => {
        SalesModels.getAll.restore();
      });

      it('should return an array of sales', async () => {
        const sales = await SalesServices.getAll();

        expect(sales).to.be.an('array');
        expect(sales).to.deep.equal(fakeSales);
      });
    });

    describe('when there are no registered products', () => {
      before(() => {
        sinon.stub(SalesModels, 'getAll').resolves([]);
      });

      after(() => {
        SalesModels.getAll.restore();
      });

      it('should return an empty array', async () => {
        const products = await SalesServices.getAll();

        expect(products).to.be.an('array').that.is.empty;
      });
    });
  });

  describe('Get sale by id', () => {
    describe('when the sale is found', () => {
      const fakeSale = [
        {
          date: '2022-04-03T05:09:19.000Z',
          productId: 3,
          quantity: 15
        }
      ];

      before(() => {
        const fakeResult = [
          {
            date: '2022-04-03T05:09:19.000Z',
            product_id: 3,
            quantity: 15
          }
        ];

        sinon.stub(SalesModels, 'getById').resolves(fakeResult);
      });

      after(() => {
        SalesModels.getById.restore();
      });

      it('should return an object with the property "sale" whose value is the sale\'s details', async () => {
        const result = await SalesServices.getById(2);

        expect(result).to.be.an('object');
        expect(result).to.have.deep.property('sale', fakeSale);
      });
    });

    describe('when the product is not found', () => {
      const error = {
        type: 'notFound',
        message: 'Sale not found',
      };

      before(() => {
        sinon.stub(SalesModels, 'getById').resolves(null);
      });

      after(() => {
        SalesModels.getById.restore();
      });

      it('should return an object with the property "error"', async () => {
        const result = await SalesServices.getById();

        expect(result).to.be.an('object');
        expect(result).to.have.deep.property('error', error);
      });
    });
  });
});
