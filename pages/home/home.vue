<template>
	<view>
		<nav-bar backState="2000" type="transparentFixed" bgColor="#fff" transparentFixedFontColor="#333" :titleCenter="true" title="清道夫"></nav-bar>
		<view class="top">
		</view>
		<view class="content">
			home
		</view>
		<u-icon name="photo"></u-icon>
		<tabbar currentTab='home' />
	</view>
</template>

<script>
	import tabbar from "@/components/tabbar.vue"
	import {index1Api1} from '@/utils/api';
	export default {
		components: {
			tabbar,
		},
		data() {
			return {

			}
		},
		created() {
			// let params = {sign: 'admin_login_captcha'};
			// index1Api1({params}).then(res => {
			// 	console.log(res);
			// });
		},
		methods: {

		}

	}
</script>

<style lang="scss" scoped>
	.top{
		width: 750rpx;
		height: 588rpx;
		background: linear-gradient(360deg, #3D85EA 0%, #354ABF 100%);
		backdrop-filter: blur(10px);
	}
	.content{
		height: 2000rpx;
	}
</style>