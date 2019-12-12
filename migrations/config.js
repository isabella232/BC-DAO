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
        collateralToken: '0x86395571b801266bd23588A1A0799EcFeF603b71'
    },
    deployParams: {
        // collateralType: TokenType.ERC20,
        // curveLogicType: CurveLogicType.STATIC,
        curveParams: {
            reservePercentage: bn(50), // sent to reserve, rest to beneficiary
            dividendPercentage: bn(50), // sent to holders, rest to beneficiary
        },
        bondedTokenParams: {
            name: 'BondedToken',
            symbol: 'BND',
            decimals: bn(18)
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