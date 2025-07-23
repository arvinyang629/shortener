// 使用全局变量存储映射（简单方案）
global.urlDatabase = global.urlDatabase || new Map();

module.exports = function handler(req, res) {
  const { shortCode } = req.query;
  
  if (!shortCode) {
    return res.status(404).json({ error: '短链接不存在' });
  }

  // 从存储中获取原始URL
  const originalUrl = global.urlDatabase.get(shortCode);
  
  if (!originalUrl) {
    return res.status(404).json({ error: '短链接不存在或已过期' });
  }

  try {
    // 验证URL格式
    new URL(originalUrl);
    
    // 重定向到原始URL
    res.redirect(302, originalUrl);
  } catch (error) {
    return res.status(404).json({ error: '无效的短链接' });
  }
};