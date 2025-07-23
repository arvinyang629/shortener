module.exports = function handler(req, res) {
  const { shortCode } = req.query;
  
  if (!shortCode) {
    return res.status(404).json({ error: '短链接不存在' });
  }

  try {
    // 解码短码获取原始URL
    let encodedUrl = shortCode;
    
    // 还原 Base64 字符
    encodedUrl = encodedUrl.replace(/[-_]/g, (match) => {
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
    
    // 验证解码后的URL
    new URL(originalUrl);
    
    // 重定向到原始URL
    res.redirect(302, originalUrl);
  } catch (error) {
    return res.status(404).json({ error: '无效的短链接' });
  }
};