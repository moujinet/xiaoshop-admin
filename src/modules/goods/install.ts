export default defineAdminModule({
  id: 'goods',
  space: 'shop',
  name: '商品',
  icon: 'ph:shopping-bag-open',
  desc: '商品管理',
  version: '1.0.0',
  sort: 1,
  menus: [
    {
      id: 'manage',
      type: 'group',
      name: '商品管理',
      icon: 'ph:shopping-bag',
      children: [
        { id: 'list', name: '商品列表' },
        { id: 'category', name: '商品分类' },
        { id: 'brands', name: '商品品牌' },
        { id: 'tags', name: '商品标签' },
        { id: 'templates', name: '商品参数' },
        { id: 'price', name: '商品价格' },
      ],
    },
    {
      id: 'assets',
      type: 'group',
      name: '资源管理',
      icon: 'ph:mountains',
      children: [
        { id: 'images', name: '图片资源' },
        { id: 'videos', name: '视频资源' },
      ],
    },
    {
      id: 'tools',
      type: 'group',
      name: '商品工具',
      icon: 'ph:wrench',
      children: [
        { id: 'import', name: '批量导入' },
        { id: 'crawler', name: '商品采集' },
      ],
    },
  ],
})
