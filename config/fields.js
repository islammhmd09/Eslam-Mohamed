const IMAGE = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const VIDEO = ['video/mp4', 'video/webm', 'video/quicktime'];
const FILE = ['application/pdf', 'application/zip', 'text/plain', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

/** Field types that hold an uploaded file. */
export const UPLOAD_TYPES = {
  image: { accept: 'image/*', mime: IMAGE },
  video: { accept: 'video/*', mime: VIDEO },
  media: { accept: 'image/*,video/*', mime: [...IMAGE, ...VIDEO] },
  file: { accept: '.pdf,.zip,.txt,.doc,.docx', mime: FILE },
};
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
export const isUpload = (type) => type in UPLOAD_TYPES;
export const uploadFields = (section) => section.fields.filter((f) => isUpload(f.type));
