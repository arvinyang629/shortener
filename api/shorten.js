const { nanoid } = require('nanoid');

// 使用全局变量模拟简单存储
global.urlDatabase = global.urlDatabase || new Map();

module.exports = function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: '请提供URL' });
    }

    // 验证URL格式
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: '无效的URL格式' });
    }

    // 生成短码
    const shortCode = nanoid(6);
    global.urlDatabase.set(shortCode, url);

    const shortUrl = `${req.headers.host}/${shortCode}`;
    
    return res.json({
      shortUrl: `https://${shortUrl}`,
      shortCode,
      originalUrl: url
    });
  }

  return res.status(405).json({ error: '方法不允许' });
};