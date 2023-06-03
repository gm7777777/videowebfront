<template>

	<div class="footer">
		<div style="background-color:#383d61" class="footer--bg"></div>
		<div class="footer--inner">
			<div class="am-g">
				<div class="am-u-md-3 ">
					<div class="footer_main--column">
						<strong class="footer_main--column_title">产品中心</strong>
						<ul class="footer_navigation">
							<li class="footer_navigation--item"><router-link to="/introduction" class="footer_navigation--link">作品介绍</router-link></li>
							<li class="footer_navigation--item"><router-link to="/onlinebooks" class="footer_navigation--link">在线图书</router-link></li>
							<li class="footer_navigation--item"><router-link to="/askanswer" class="footer_navigation--link">知识问答</router-link></li>
						</ul>
					</div>
				</div>
				<div class="am-u-md-6 ">
					<div class="footer_main--column">
						<strong class="footer_main--column_title">关于我们</strong>
						<div class="footer_about">
							<p class="footer_about--text">
								以个人之力，提供力所能及的帮助
							</p>
						</div>
					</div>
				</div>
				<div class="am-u-md-3 ">
					<div class="footer_main--column">
						<strong class="footer_main--column_title">联系详情</strong>
						<ul class="footer_contact_info">
							<li class="footer_contact_info--item"><i class="am-icon-phone"></i><span>服务邮箱：elec_stack@126.com</span></li>
							<li class="footer_contact_info--item"><i class="am-icon-map-marker"></i><span>陕西省西安市</span></li>
							<li class="footer_contact_info--item"><i class="am-icon-clock-o"></i><span>周一 ~ 周日, 8:00 - 23:00 </span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FooterView"
}
</script>

<style scoped>

</style>
