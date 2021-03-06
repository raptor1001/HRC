var HarmonyERC20 = artifacts.require("HarmonyMintable");
var HRC20Crowdsale = artifacts.require("HRC20Crowdsale");

module.exports = function (deployer, network, accounts) {

	const name = "HarmonyHRC20"
	const symbol = "HRC20"
	const decimals = 18
	const rate = 1000
	const saleAmount = web3.utils.toWei('1000000', 'ether')
	const minterTokens = web3.utils.toWei('0', 'ether')

	deployer.then(function () {
		return deployer.deploy(HarmonyERC20, name, symbol, decimals, minterTokens).then(function (token) {
			return deployer.deploy(HRC20Crowdsale, rate, accounts[0], token.address, saleAmount).then(function (sale) {
				return token.addMinter(sale.address).then((res) => {
					console.log(res.logs)
					return res
				})
			})
		});
	});
};