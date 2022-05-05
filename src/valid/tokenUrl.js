//需要携带token的请求路径
export const tokenUrl = [
	// 最新日报列表
	'stories/latest',
	// 历史日报列表
	'stories/before/:date',
  '/like',
  '/notlike',
  '/findlike',
  '/shopcartCount',
  '/addShopcart',
  '/findAllShopcart',
  '/modifyShopcartCount',
  '/deleteShopcart',
  '/addAddress',
  '/findAddress',
  '/commitShopcart',
  '/pay',
  '/findAddressByAid',
  '/editAddress',
  '/deleteAddress'
];