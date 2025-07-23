module.exports = function handler(req, res) {
  const { shortCode, d } = req.query;
  
  if (!shortCode) {
    return res.status(404).json({ error: '短链接不存在' });
  }

  try {
    // 如果有编码数据参数，直接解码
    if (d) {
      // 还原 Base64 字符
      let encodedUrl = d.replace(/[-_]/g, (match) => {
        switch (match) {
          case '-': return '+';
          case '_': return '/';
          default: return match;
        }
      });
      
      // 补充可能缺失的 padding
      while (encodedUrl.length % 4) {
        encodedUrl += '=';
      }
      
      const originalUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');
      
      // 验证URL格式
      new URL(originalUrl);
      
      // 重定向到原始URL
      return res.redirect(302, originalUrl);
    }
    
    // 如果没有数据参数，返回错误
    return res.status(404).json({ error: '短链接不存在或已过期' });
    
  } catch (error) {
    return res.status(404).json({ error: '无效的短链接' });
  }
};