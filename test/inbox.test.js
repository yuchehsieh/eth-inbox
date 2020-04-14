const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;

beforeEach(async () => {
   // Get a list of all accounts
    /*** almost every function we called in web3 are asynchronous ***/
    accounts = await web3.eth.getAccounts();

   // Use one of those accounts to deploy
   // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there!']})
        .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploy a contract', () => {
        console.log(inbox);
        assert.ok(inbox.options.address); /*** .ok means that the value exist or truthy ***/
    })
});