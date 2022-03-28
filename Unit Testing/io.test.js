const mocha = require("mocha");
const assert = mocha.assert;
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const io_assgn = require("./test1");


describe('IO Assignment', () => {
    context('Connection', () => {
        it('Checking Connection', (done)=> {
            io_assgn.runasync().then((res) => {

                expect(res.exportConnection).to.have.property('type');
                expect(res.importConnection).to.have.property('type');
                expect(res.import).to.have.property('_connectionId');
                expect(res.export).to.have.property('_connectionId');
                expect(res.flow).to.have.property('_integrationId');
                expect(res.flow.pageProcessors[0]).to.have.property('_importId');
                expect(res.flow.pageGenerators[0]).to.have.property('_exportId');
                done()


            }).catch((err)=> {
                done(err);
            })
           


        })
    })
})
