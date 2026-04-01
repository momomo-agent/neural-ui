// Demo schemas - 不同场景验证 Neural UI
export const demoSchemas = {
  stocks: {
    name: "股票筛选",
    schema: {
      elements: [
        { id: "e1", type: "DatePicker", props: { label: "时间范围", value: "2024-03-01" } },
        { id: "e2", type: "Slider", props: { label: "涨幅", min: 0, max: 100, value: 10 } },
        { id: "e3", type: "MultiSelect", props: { label: "行业", options: ["科技", "医疗", "金融", "消费"], selected: ["科技"] } },
        { id: "e4", type: "ResultList", props: { data: ["腾讯控股 +12.3%", "阿里巴巴 +15.7%", "美团 +11.2%"] } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "below", spacing: 16 },
        { from: "e2", to: "e3", type: "below", spacing: 16 },
        { from: "e3", to: "e4", type: "below", spacing: 24 }
      ]
    }
  },
  
  login: {
    name: "登录表单",
    schema: {
      elements: [
        { id: "e1", type: "TextInput", props: { label: "用户名", placeholder: "请输入用户名" } },
        { id: "e2", type: "TextInput", props: { label: "密码", placeholder: "请输入密码" } },
        { id: "e3", type: "Button", props: { label: "登录", variant: "primary" } },
        { id: "e4", type: "Button", props: { label: "注册", variant: "secondary" } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "below", spacing: 12 },
        { from: "e2", to: "e3", type: "below", spacing: 20 },
        { from: "e3", to: "e4", type: "right_of", spacing: 12 }
      ]
    }
  },
  
  search: {
    name: "搜索界面",
    schema: {
      elements: [
        { id: "e1", type: "TextInput", props: { label: "搜索", placeholder: "输入关键词..." } },
        { id: "e2", type: "Button", props: { label: "搜索", variant: "primary" } },
        { id: "e3", type: "MultiSelect", props: { label: "筛选", options: ["最新", "最热", "最相关"], selected: ["最相关"] } },
        { id: "e4", type: "ResultList", props: { data: ["结果 1", "结果 2", "结果 3"] } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "right_of", spacing: 12 },
        { from: "e1", to: "e3", type: "below", spacing: 16 },
        { from: "e3", to: "e4", type: "below", spacing: 16 }
      ]
    }
  },
  
  premium: {
    name: "高级界面",
    schema: {
      elements: [
        { id: "e1", type: "GlassInput", props: { label: "搜索", placeholder: "输入关键词..." } },
        { id: "e2", type: "ModernSlider", props: { label: "预算", min: 0, max: 10000, value: 5000 } },
        { id: "e3", type: "ModernSlider", props: { label: "优先级", min: 0, max: 10, value: 7 } },
        { id: "e4", type: "GradientButton", props: { label: "开始搜索" } },
        { id: "e5", type: "ResultList", props: { data: ["结果 1", "结果 2", "结果 3"] } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "below", spacing: 20 },
        { from: "e2", to: "e3", type: "right_of", spacing: 16 },
        { from: "e2", to: "e4", type: "below", spacing: 24 },
        { from: "e4", to: "e5", type: "below", spacing: 20 }
      ]
    }
  },
  
  dashboard: {
    name: "数据仪表盘",
    schema: {
      elements: [
        { id: "e1", type: "StatCard", props: { title: "总销售额", value: "¥128,450", trend: "↑ 12.5%" } },
        { id: "e2", type: "StatCard", props: { title: "新用户", value: "2,847", trend: "↑ 8.2%" } },
        { id: "e3", type: "ProgressBar", props: { label: "目标完成度", value: 75, max: 100 } },
        { id: "e4", type: "TagGroup", props: { label: "快速筛选", tags: ["今日", "本周", "本月", "本年"], selected: ["本周"] } },
        { id: "e5", type: "ResultList", props: { data: ["订单 #1234", "订单 #1235", "订单 #1236"] } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "right_of", spacing: 16 },
        { from: "e1", to: "e3", type: "below", spacing: 24 },
        { from: "e3", to: "e4", type: "below", spacing: 20 },
        { from: "e4", to: "e5", type: "below", spacing: 16 }
      ]
    }
  },
  
  ecommerce: {
    name: "电商筛选",
    schema: {
      elements: [
        { id: "e1", type: "GlassInput", props: { label: "商品搜索", placeholder: "搜索商品..." } },
        { id: "e2", type: "ModernSlider", props: { label: "价格", min: 0, max: 5000, value: 2000 } },
        { id: "e3", type: "ModernSlider", props: { label: "评分", min: 0, max: 5, value: 4 } },
        { id: "e4", type: "TagGroup", props: { label: "分类", tags: ["电子", "服装", "食品", "图书"], selected: ["电子"] } },
        { id: "e5", type: "ProgressBar", props: { label: "库存", value: 68, max: 100 } },
        { id: "e6", type: "GradientButton", props: { label: "搜索" } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "below", spacing: 20 },
        { from: "e2", to: "e3", type: "right_of", spacing: 16 },
        { from: "e2", to: "e4", type: "below", spacing: 20 },
        { from: "e4", to: "e5", type: "below", spacing: 16 },
        { from: "e5", to: "e6", type: "below", spacing: 24 }
      ]
    }
  },
  
  analytics: {
    name: "数据分析",
    schema: {
      elements: [
        { id: "e1", type: "StatCard", props: { title: "访问量", value: "45.2K", trend: "↑ 18%" } },
        { id: "e2", type: "StatCard", props: { title: "转化率", value: "3.8%", trend: "↑ 2.1%" } },
        { id: "e3", type: "StatCard", props: { title: "收入", value: "¥89K", trend: "↑ 24%" } },
        { id: "e4", type: "ProgressBar", props: { label: "月度目标", value: 82, max: 100 } },
        { id: "e5", type: "TagGroup", props: { label: "时间范围", tags: ["今日", "本周", "本月", "本季度"], selected: ["本月"] } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "right_of", spacing: 16 },
        { from: "e2", to: "e3", type: "right_of", spacing: 16 },
        { from: "e1", to: "e4", type: "below", spacing: 24 },
        { from: "e4", to: "e5", type: "below", spacing: 20 }
      ]
    }
  },
  
  social: {
    name: "社交动态",
    schema: {
      elements: [
        { id: "e1", type: "UserAvatar", props: { name: "张三", role: "产品经理", online: true } },
        { id: "e2", type: "PostCard", props: { content: "刚完成了新功能的设计，大家来看看！", likes: 24, comments: 8 } },
        { id: "e3", type: "PostCard", props: { content: "周末去爬山了，风景超美 🏔️", likes: 156, comments: 23 } },
        { id: "e4", type: "GradientButton", props: { label: "发布动态" } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "below", spacing: 16 },
        { from: "e2", to: "e3", type: "below", spacing: 12 },
        { from: "e3", to: "e4", type: "below", spacing: 20 }
      ]
    }
  },
  
  gallery: {
    name: "图片画廊",
    schema: {
      elements: [
        { id: "e1", type: "ImageCard", props: { title: "旅行回忆", subtitle: "2024 春季" } },
        { id: "e2", type: "ImageCard", props: { title: "美食记录", subtitle: "本周精选" } },
        { id: "e3", type: "MediaGrid", props: { items: [{}, {}, {}, {}, {}, {}] } },
        { id: "e4", type: "TagGroup", props: { label: "分类", tags: ["全部", "旅行", "美食", "日常"], selected: ["全部"] } }
      ],
      relations: [
        { from: "e1", to: "e2", type: "right_of", spacing: 16 },
        { from: "e1", to: "e3", type: "below", spacing: 20 },
        { from: "e3", to: "e4", type: "below", spacing: 16 }
      ]
    }
  }
};
