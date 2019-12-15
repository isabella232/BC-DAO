// const {CurveLogicType, TokenType} = require("./CurveEcosystemConfig");
const {bn} = require("./utils");

const defaultConfig = {
    accounts: {
        curveOwner: '0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE',
        beneficiary: '0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE',
        minter: '0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE',
        signer: '0xe2DD09d719Da89e5a3D0F2549c7E24566e947260'
    },
    addresses: {
        collateralToken: '0x975aF01e87118858D88A03e0f1d3475A5781e5b5'
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