// 固化机制 - 保存和复用映射
export class SchemaLibrary {
  constructor() {
    this.key = 'neural_ui_library';
  }

  save(intent, schema) {
    const library = this.load();
    library[intent] = {
      schema,
      timestamp: Date.now(),
      useCount: (library[intent]?.useCount || 0) + 1
    };
    localStorage.setItem(this.key, JSON.stringify(library));
  }

  load() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : {};
  }

  search(intent) {
    const library = this.load();
    // 精确匹配
    if (library[intent]) {
      return library[intent].schema;
    }
    // 模糊匹配
    const keys = Object.keys(library);
    const match = keys.find(k => 
      k.includes(intent) || intent.includes(k)
    );
    return match ? library[match].schema : null;
  }

  list() {
    const library = this.load();
    return Object.entries(library)
      .sort((a, b) => b[1].useCount - a[1].useCount)
      .map(([intent, data]) => ({
        intent,
        useCount: data.useCount,
        timestamp: data.timestamp
      }));
  }

  delete(intent) {
    const library = this.load();
    delete library[intent];
    localStorage.setItem(this.key, JSON.stringify(library));
  }
}
