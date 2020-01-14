// const {CurveLogicType, TokenType} = require("./CurveEcosystemConfig");
const {bn} = require("./utils");

const defaultConfig = {
    accounts: {
        curveOwner: '0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE',
        beneficiary: '0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE',
        minter: '0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE',
        signer: '0xbf894BDF5CFfF5944547f19e21b8c75612990C2a'
    },
    addresses: {
        collateralToken: '0x9861Da395d7da984D5E8C712c2EDE44b41F777Ad'
    },
    deployParams: {
        // collateralType: TokenType.ERC20,
        // curveLogicType: CurveLogicType.STATIC,
        curveParams: {
            reservePercentage: bn(100), // sent to reserve, rest to beneficiary
            dividendPercentage: bn(100), // sent to holders, rest to beneficiary
        },
        bondedTokenParams: {
            name: 'BondedToken',
            symbol: 'BND',
            decimals: bn(18),
            initialSupply: bn(web3.utils.toWei('1000', 'ether'))
        },
        curveLogicParams: {
            tokenRatio: bn(100000000),
            reserveRatio: bn(1000),
        }
    }
}

module.exports = {
    defaultConfig
}