// const {CurveLogicType, TokenType} = require("./CurveEcosystemConfig");
const {bn} = require("./utils");

const defaultConfig = {
    accounts: {
        curveOwner: '0x0e190Baf2eBaA5322a93A205eD8450D6E893BbbE',
    },
    deployParams: {
        // collateralType: TokenType.ERC20,
        // curveLogicType: CurveLogicType.STATIC,
        curveParams: {
            reservePercentage: bn(10),
            dividendPercentage: bn(50),
        },
        bondedTokenParams: {
            name: 'BondedToken',
            symbol: 'BND',
            decimals: bn(18)
        },
        collateralTokenParams: {
            name: "PaymentToken",
            symbol: "Pay",
            decimals: 18,
            initialSupply: bn(1000000000)
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