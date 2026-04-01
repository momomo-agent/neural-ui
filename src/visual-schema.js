// Neural UI v2 - 纯视觉描述，不用组件
export const visualSchema = {
  login: {
    name: "登录界面 v2",
    elements: [
      {
        id: "e1",
        visual: {
          type: "text-input",
          width: "100%",
          height: 48,
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 12,
          fontSize: 14,
          placeholder: "用户名"
        }
      },
      {
        id: "e2",
        visual: {
          type: "text-input",
          width: "100%",
          height: 48,
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 12,
          fontSize: 14,
          placeholder: "密码",
          inputType: "password"
        }
      },
      {
        id: "e3",
        visual: {
          type: "button",
          width: 120,
          height: 40,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          text: "登录"
        }
      }
    ],
    relations: [
      { from: "e1", to: "e2", type: "below", spacing: 12 },
      { from: "e2", to: "e3", type: "below", spacing: 20 }
    ]
  },
  
  search: {
    name: "搜索界面 v2",
    elements: [
      {
        id: "e1",
        visual: {
          type: "text-input",
          width: "70%",
          height: 48,
          background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,255,0.9) 100%)",
          border: "2px solid #e0e0ff",
          borderRadius: 24,
          padding: 16,
          fontSize: 15,
          placeholder: "搜索..."
        }
      },
      {
        id: "e2",
        visual: {
          type: "button",
          width: 100,
          height: 48,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 24,
          fontSize: 15,
          fontWeight: 600,
          text: "搜索"
        }
      }
    ],
    relations: [
      { from: "e1", to: "e2", type: "right_of", spacing: 12 }
    ]
  },
  
  card: {
    name: "卡片界面 v2",
    elements: [
      {
        id: "e1",
        visual: {
          type: "box",
          width: "48%",
          height: 120,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
          content: "总销售额 ¥128,450"
        }
      },
      {
        id: "e2",
        visual: {
          type: "box",
          width: "48%",
          height: 120,
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 8px 32px rgba(240, 147, 251, 0.3)",
          content: "新用户 2,847"
        }
      }
    ],
    relations: [
      { from: "e1", to: "e2", type: "right_of", spacing: 16 }
    ]
  },
  
  pricing: {
    name: "价格卡片 v2",
    elements: [
      {
        id: "e1",
        visual: {
          type: "box",
          width: "30%",
          height: 200,
          background: "white",
          border: "2px solid #e5e7eb",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          content: "基础版 ¥99/月"
        }
      },
      {
        id: "e2",
        visual: {
          type: "box",
          width: "30%",
          height: 200,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
          content: "专业版 ¥299/月"
        }
      },
      {
        id: "e3",
        visual: {
          type: "box",
          width: "30%",
          height: 200,
          background: "white",
          border: "2px solid #e5e7eb",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          content: "企业版 ¥999/月"
        }
      }
    ],
    relations: [
      { from: "e1", to: "e2", type: "right_of", spacing: 16 },
      { from: "e2", to: "e3", type: "right_of", spacing: 16 }
    ]
  },
  
  form: {
    name: "表单 v2",
    elements: [
      {
        id: "e1",
        visual: {
          type: "text-input",
          width: "100%",
          height: 40,
          background: "#f9fafb",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          padding: 10,
          fontSize: 14,
          placeholder: "姓名"
        }
      },
      {
        id: "e2",
        visual: {
          type: "text-input",
          width: "100%",
          height: 40,
          background: "#f9fafb",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          padding: 10,
          fontSize: 14,
          placeholder: "邮箱"
        }
      },
      {
        id: "e3",
        visual: {
          type: "text-input",
          width: "100%",
          height: 80,
          background: "#f9fafb",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          padding: 10,
          fontSize: 14,
          placeholder: "留言"
        }
      },
      {
        id: "e4",
        visual: {
          type: "button",
          width: "100%",
          height: 44,
          background: "#3b82f6",
          color: "white",
          borderRadius: 6,
          fontSize: 15,
          fontWeight: 600,
          text: "提交"
        }
      }
    ],
    relations: [
      { from: "e1", to: "e2", type: "below", spacing: 12 },
      { from: "e2", to: "e3", type: "below", spacing: 12 },
      { from: "e3", to: "e4", type: "below", spacing: 16 }
    ]
  }
};
