// Load zos scripts and truffle wrapper function
const { scripts, ConfigManager } = require('@openzeppelin/cli');
const { add, push, create } = scripts;

global.web3 = web3;
const defaultConfig = require('./config.js').defaultConfig;
const {curveParams, curveLogicType, collateralType, bondedTokenParams, collateralTokenParams, curveLogicParams} = defaultConfig.deployParams;
const {accounts, addresses} = defaultConfig;

const RewardsDistributor = artifacts.require('RewardsDistributor.sol');
const BondedToken = artifacts.require('BondedToken.sol');

async function deploy(options) {
  // console.log(JSON.stringify(options));
  // if (options.network === 'dev-8996') {
  //   console.log('Skipping migrations...');
  //   return;
  // }
  // Register contract in the zos project
  add({ contractsData: [
      { name: 'BancorCurveService', alias: 'BancorCurveService' },
      { name: 'BancorCurveLogic', alias: 'BancorCurveLogic' },
      { name: 'RewardsDistributor', alias: 'RewardsDistributor' },
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
      ]
    }, options));

  // const rewardsDistributor = await RewardsDistributor.new();
  // await rewardsDistributor.initialize(accounts.curveOwner);

  const rewardsDistributor = await create(
    Object.assign({
      contractAlias: 'RewardsDistributor', 
      methodName: 'initialize',
      methodArgs: [
        accounts.curveOwner
      ]
    }, options));

  // const bondedToken = await BondedToken.new();
  // await bondedToken.initialize(
  //     bondedTokenParams.name,
  //     bondedTokenParams.symbol,
  //     bondedTokenParams.decimals,
  //     accounts.signer,
  //     rewardsDistributor.address,
  //     addresses.collateralToken);
  
  const bondedToken = await create(
    Object.assign({
      contractAlias: 'BondedToken', 
      methodName: 'initialize',
      methodArgs: [
        bondedTokenParams.name,
        bondedTokenParams.symbol,
        bondedTokenParams.decimals.toString(),
        accounts.signer,
        rewardsDistributor.address,
        addresses.collateralToken
      ]
    }, options));

  const bondingCurve = await create(
    Object.assign({
      contractAlias: 'BondingCurve',
      methodName: 'initialize',
      methodArgs: [
        accounts.curveOwner,
        accounts.beneficiary,
        addresses.collateralToken,
        bondedToken.address,
        bancorCurveLogic.address,
        curveParams.reservePercentage.toString(),
        curveParams.dividendPercentage.toString()
      ] 
    }, options));

  console.log('Minting initial supply:', bondedTokenParams.initialSupply.toString());
  await bondedToken.methods.mint(accounts.signer, bondedTokenParams.initialSupply.toString());
  console.log('Adding minter');
  await bondedToken.methods.addMinter(bondingCurve.address).send({from: accounts.signer});
  console.log('Renouncing minter');
  await bondedToken.methods.renounceMinter().send({from: accounts.signer});

  const result = {
    'bancorCurveService': bancorCurveService.address,
    'bancorCurveLogic': bancorCurveLogic.address,
    'rewardsDistributor': rewardsDistributor.address,
    'bondedToken': bondedToken.address,
    'bondingCurve': bondingCurve.address,
  }

  console.log(JSON.stringify(result));
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[1] })
    await deploy({ network, txParams })
  })
}