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
        collateralToken: '0xC9ad663CBa331715ba175E11BfC99b9AF524DA1E'
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