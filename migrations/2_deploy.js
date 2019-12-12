// Load zos scripts and truffle wrapper function
const { scripts, ConfigManager } = require('@openzeppelin/cli');
const { add, push, create } = scripts;

global.web3 = web3;
const defaultConfig = require('./config.js').defaultConfig;
const {curveParams, curveLogicType, collateralType, bondedTokenParams, collateralTokenParams, curveLogicParams} = defaultConfig.deployParams;
const {accounts} = defaultConfig;

const RewardsDistributor = artifacts.require('RewardsDistributor.sol');
const BondedToken = artifacts.require('BondedToken.sol');

async function deploy(options) {
  // Register contract in the zos project
  add({ contractsData: [
      { name: 'BancorCurveService', alias: 'BancorCurveService' },
      { name: 'BancorCurveLogic', alias: 'BancorCurveLogic' },
      { name: 'BondedToken', alias: 'BondedToken' },
      { name: 'BondingCurve', alias: 'BondingCurve' }
    ] });

  // Push implementation contracts to the network
  await push(options);

  // Create instance of...
  const bancorCurveService = await create(Object.assign({ contractAlias: 'BancorCurveService', methodName: 'initialize', methodArgs: [] }, options));
  const bancorCurveLogic = await create(
    Object.assign({
      contractAlias: 'BancorCurveLogic', 
      methodName: 'initialize', 
      methodArgs: [
        bancorCurveService.address,
        curveLogicParams.reserveRatio.toString()
      ] }, options));

  const rewardsDistributor = await RewardsDistributor.new();
  await rewardsDistributor.initialize(accounts.curveOwner);

  const bondedToken = await BondedToken.new();
  await bondedToken.initialize(
      bondedTokenParams.name,
      bondedTokenParams.symbol,
      bondedTokenParams.decimals,
      accounts.curveOwner,
      rewardsDistributor.address,
      ''); //paymentToken.address
  
  await create(
    Object.assign({
      contractAlias: 'BondingCurve',
      methodName: 'initialize',
      methodArgs: [
        accounts.curveOwner,
        accounts.curveOwner,
        // paymentToken.address,
        // bondedToken.address,
        bancorCurveLogic.address,
        curveParams.reservePercentage,
        curveParams.dividendPercentage
      ] }, options));
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[1] })
    await deploy({ network, txParams })
  })
}