<template>
	<div class="tool w1200">
		<div>
			<h6 class="title font18 fW600">文档</h6>
			<ul class="dapp-list">
				<li @click="toUrl('https://docs.nuls.io/zh/Guide/','',1)">
					<img src="@/assets/logo.png">
					<b class="font12">NULS 使用指南<br />普通用户使用指南</b>
				</li>
				<li @click="toUrl('https://docs.nuls.io/zh/Docs/','',1)">
					<img src="@/assets/logo.png">
					<b class="font12">NULS 开发者文档<br />开发者使用指南</b>
				</li>
			</ul>
		</div>
		<div class="cb">
			<h6 class="title font18 fW600">工具</h6>
			<ul class="dapp-list">
				<li @click="toUrl('http://des.mimieye.net:81/','',1)">
					<img src="@/assets/logo.png">
					<b class="font12">反序列<br />交易data反序列化</b>
				</li>
				<li @click="toUrl('https://www.npmjs.com/package/nuls-sdk-js','',1)">
					<img src="@/assets/logo.png">
					<b class="font12">nuls-js-sdk<br />js交易签名</b>
				</li>
			</ul>
		</div>
		<div class="cb">
			<h6 class="title font18 fW600">交流</h6>
			<ul class="dapp-list">
				<li>
					<img src="@/assets/logo.png">
					<b class="font12">NULS 粉丝群<br />{{$t('tips.tips2')}}</b>
				</li>
				<li>
					<img src="@/assets/logo.png">
					<b class="font12">开发者微信群<br />{{$t('tips.tips2')}}</b>
				</li>
				<li>
					<img src="@/assets/logo.png">
					<b class="font12">商务合作<br />{{$t('tips.tips2')}}</b>
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

<style scoped>

</style>
