<template>
	<view>
		<u-tabbar
			:value="currentTab"
			activeColor="#3D85EA"
			inactiveColor="#bac3d3"
		>
			<u-tabbar-item 
				v-for="(item,i) in tabList" 
				:key="item.name"
				:text="item.text"
				:badge="item.badge"
				:name="item.name"
				@click="handTab(item)"
			>
				<image class="bar_img" slot='active-icon' :src="item.selectedIconPath"></image>
				<image class="bar_img" slot='inactive-icon' :src="item.iconPath"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>
 
<script>
	export default {
		name:"TabBar",
		props: {
			currentTab: {
				type: String,
				default: 'home'
			}
		},
		created() {
			uni.hideTabBar()
		},
		data() {
			return {
				tabList: [
					{
						"pagePath": "/pages/home/home",
						"iconPath": "/static/home.png",
						"selectedIconPath": "/static/home_sec.png",
						"text": "搜盗版",
						"name": 'home',
						"badge": '0',
					},
					{
						"pagePath": "/pages/clean/clean",
						"iconPath": "/static/clean.png",
						"selectedIconPath": "/static/clean_sec.png",
						"text": "清盗版",
						"name": 'clean',
						"badge": '30',
					},
					{
						"pagePath": "/pages/user/user",
						"iconPath": "/static/user.png",
						"selectedIconPath": "/static/user_sec.png",
						"text": "我的",
						"name": "user",
						"badge": '0',
					}
				]
			}
		},
		methods: {
			handTab(row) {
				uni.switchTab({
					url: row.pagePath
				})
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.bar_img{
		width: 54rpx;
		height: 54rpx;
	}
</style>