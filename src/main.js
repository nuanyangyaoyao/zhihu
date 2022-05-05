import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import {
	tokenUrl
} from './valid/tokenUrl'


//导入flexible.js设置rem的基准值
import 'lib-flexible/flexible'

import {
	Tabbar,
	TabbarItem,
	Search,
	Sidebar,
	Skeleton,
	SidebarItem,
	Lazyload,
	List,
	Toast,
	Tag,
	Overlay,
	NavBar,
	Stepper,
	GoodsAction,
	GoodsActionIcon,
	GoodsActionButton,
	Form,
	Field,
	Button,
	Popup,
	Checkbox,
	SwipeCell,
	SubmitBar,
	Empty,
	Icon,
	AddressList,
	AddressEdit,
	Badge,
	PullRefresh,
	Swipe,
	SwipeItem,
	Cell,
	CellGroup,
	Switch,
	SwitchCell,
	ShareSheet
} from 'vant';

//注册组件
Vue.use(Overlay)
	.use(Badge)
	.use(ShareSheet)
	.use(Switch)
	.use(SwitchCell)
	.use(Cell)
	.use(CellGroup)
	.use(List)
	.use(PullRefresh)
	.use(Skeleton)
	.use(Tabbar)
	.use(TabbarItem)
	.use(Search)
	.use(Sidebar)
	.use(SidebarItem)
	.use(Toast)
	.use(Lazyload)
	.use(Tag)
	.use(NavBar)
	.use(Stepper)
	.use(GoodsAction)
	.use(GoodsActionIcon)
	.use(GoodsActionButton)
	.use(Form)
	.use(Field)
	.use(Button)
	.use(Popup)
	.use(Checkbox)
	.use(SwipeCell)
	.use(SubmitBar)
	.use(Empty)
	.use(Icon)
	.use(AddressList)
	.use(AddressEdit)
	.use(Swipe)
	.use(SwipeItem)

//设置请求基础路径
// axios.defaults.baseURL = 'https://apis.netstart.cn/zhihudaily/';


Vue.use(VueAxios, axios)

// 定义格式化时间过滤器
Vue.filter('formatDate', (v, format) => {
	// v: 日期对象 || 日期字符串		format: 格式 ==> yyyy年mm月dd日
	if (Object.prototype.toString.call(v) !== ['object Date']) {
		v = new Date(v);
	}
	// 获取年份
	let yearReg = /(y+)/;
	if (yearReg.test(format)) {
		// 获取匹配组内容
		let yearContent = RegExp.$1;
		let year = v.getFullYear().toString();
		let yearText = year.slice(4 - yearContent.length);
		format = format.replace(yearContent, yearText);
	}
	let dateObject = {
		M: v.getMonth() + 1,
		d: v.getDate(),
		h: v.getHours(),
		m: v.getMinutes(),
		s: v.getSeconds()
	};
	// 遍历dateObject替换format
	for (let key in dateObject) {
		// 动态创建正则表达式
		let reg = new RegExp(`(${key}+)`);
		if (reg.test(format)) {
			let content = RegExp.$1;
			format = format.replace(content, content.length === 1 ? dateObject[key] : dateObject[key] >= 10 ? dateObject[key] : `0${dateObject[key]}`);
		}
	}
	return format;
})

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
