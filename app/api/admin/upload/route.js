import { route, body } from '@/lib/http';
import { createUpload } from '@/lib/storage';
export const POST = route(async (req) => createUpload(await body(req)));
