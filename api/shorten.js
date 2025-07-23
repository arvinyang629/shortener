const crypto = require('crypto');

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

    // 生成短码：使用 URL 的哈希值
    const hash = crypto.createHash('md5').update(url).digest('hex');
    const shortCode = hash.substring(0, 6);
    
    // 将 URL 编码并作为查询参数
    const encodedUrl = Buffer.from(url).toString('base64')
      .replace(/[+/=]/g, (match) => {
        switch (match) {
          case '+': return '-';
          case '/': return '_';
          case '=': return '';
          default: return match;
        }
      });
    
    const shortUrl = `${req.headers.host}/${shortCode}?d=${encodedUrl}`;
    
    return res.json({
      shortUrl: `https://${shortUrl}`,
      shortCode,
      originalUrl: url
    });
  }

  return res.status(405).json({ error: '方法不允许' });
};