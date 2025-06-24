import path from 'path';
import fs from 'fs';

const allowedMimeTypes = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
  'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo'
];

export async function uploadFile(ctx) {
  const file = ctx.request.files?.file;

  if (!file) {
    ctx.status = 400;
    ctx.body = { error: '未上传任何文件' };
    return;
  }

  // ✅ 校验文件类型
  const mimeType = file.mimetype || file.type; // koa-body 会提供这两个之一
  if (!allowedMimeTypes.includes(mimeType)) {
    // 删除非法文件
    fs.unlink(file.filepath, () => {});
    ctx.status = 400;
    ctx.body = { error: '只允许上传图片或视频文件' };
    return;
  }

  const fileName = path.basename(file.filepath);
  const fileUrl = `${ctx.protocol}://${ctx.host}/${fileName}`;

  ctx.body = {
    message: '上传成功',
    fileName,
    fileUrl
  };
}
