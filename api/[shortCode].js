const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const { shortCode } = req.query;
  
  if (!shortCode) {
    return res.status(404).json({ error: '短链接不存在' });
  }

  try {
    // 读取数据文件
    const dataPath = path.join(process.cwd(), 'data', 'urls.json');
    
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ error: '短链接不存在' });
    }
    
    const data = fs.readFileSync(dataPath, 'utf8');
    const urlDatabase = JSON.parse(data);
    
    const originalUrl = urlDatabase[shortCode];
    
    if (!originalUrl) {
      return res.status(404).json({ error: '短链接不存在' });
    }
    
    // 验证URL格式
    new URL(originalUrl);
    
    // 重定向到原始URL
    res.redirect(302, originalUrl);
  } catch (error) {
    return res.status(404).json({ error: '无效的短链接' });
  }
};