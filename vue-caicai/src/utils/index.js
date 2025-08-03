
// 日期格式化函数 2025-07-30 20:00:00
function formatDate(date,type) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  if(type === 'yyyy-MM-dd'){
    return `${year}-${month}-${day}`;
  }
  if(type === 'yyyy-MM-dd HH:mm:ss'){
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return `${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`;
}



export {
  formatDate
}
