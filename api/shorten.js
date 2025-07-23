const { nanoid } = require('nanoid');
const fs = require('fs');
const path = require('path');

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
    
    try {
      // 读取现有数据
      const dataPath = path.join(process.cwd(), 'data', 'urls.json');
      let urlDatabase = {};
      
      if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, 'utf8');
        urlDatabase = JSON.parse(data);
      }
      
      // 存储新的映射
      urlDatabase[shortCode] = url;
      
      // 写回文件
      fs.writeFileSync(dataPath, JSON.stringify(urlDatabase, null, 2));
      
      const shortUrl = `${req.headers.host}/${shortCode}`;
      
      return res.json({
        shortUrl: `https://${shortUrl}`,
        shortCode,
        originalUrl: url
      });
    } catch (error) {
      return res.status(500).json({ error: '服务器错误' });
    }
  }

  return res.status(405).json({ error: '方法不允许' });
};