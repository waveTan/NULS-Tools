<template>
	<div class="home cb w1200">
		<div class="cb">
			<h6 class="title font18 fW600">NULS </h6>
			<ul class="dapp-list">
				<li @click="toUrl('https://wallet.nuls.io/','',1)">
					<img src="./../assets/logo.png">
					<b class="font12">NULS Web钱包<br />资产、共识、合约</b>
				</li>
				<li @click="toUrl('https://nulscan.io/','',1)">
					<img src="./../assets/logo.png">
					<b class="font12">NULS 浏览器<br />账户、节点、合约、轮次查询</b>
				<li @click="toUrl('http://nabox.io/','',1)">
					<img src="./../assets/logo.png">
					<b class="font12">Nabox<br />NULS APP</b>
				</li>
				<li @click="toUrl('https://github.com/nuls-io','',1)">
					<img src="./../assets/logo.png">
					<b class="font12">Githup<br />NULS 开源代码</b>
				</li>
			</ul>
		</div>
		<div class="cb">
			<h6 class="title font18 fW600">生态</h6>
			<ul class="dapp-list">
				<li @click="toUrl('https://pocm.nuls.io/','',1)">
					<img src="./../assets/logo.png">
					<b class="font12">pcom<br />NULS SCO平台</b>
				<li @click="toUrl('https://usdi.co/','',1)">
					<img src="./../assets/logo.png">
					<b class="font12">usdi<br />持有USDI，享有5.2%的理财和NULS收益</b>
				</li>
				<li @click="toUrl('https://factory.nuls.io/','',1)">
					<img src="./../assets/logo.png">
					<b class="font12">链工厂<br />一键式搭建区块链</b>
				</li>
			</ul>
		</div>
		<div class="cb">
			<h6 class="title font18 fW600">娱乐</h6>
			<ul class="dapp-list">
				<li>
					<img src="./../assets/logo.png">
					<b class="font12">大转盘<br />{{$t('tips.tips2')}}</b>
				<li>
					<img src="./../assets/logo.png">
					<b class="font12">快乐翻牌<br />{{$t('tips.tips2')}}</b>
				</li>
				<li>
					<img src="./../assets/logo.png">
					<b class="font12">数字华容道<br />{{$t('tips.tips2')}}</b>
				</li>
				<li>
					<img src="./../assets/logo.png">
					<b class="font12">猜数字<br />{{$t('tips.tips2')}}</b>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {

			/** 连接跳转
			 * @param urlName
			 * @param parameter
			 * @param type  0:路由跳转 1：外部链接
			 */
			toUrl(urlName, parameter, type) {
				if (type === 0) {
					this.$router.push({
						name: urlName
					})
				} else {
					window.open(urlName)
				}
			},
		
		}
	}
</script>
<style lang="less">
	@import "./../assets/css/style";

	.home {
		min-height: 800px;
	}
</style>
