import { route, body } from '@/lib/http';
import { deleteEntry, saveEntry } from '@/lib/content-service';
export const PUT = route(async (req, { params }) => saveEntry(params.section, await body(req), params.id));
export const DELETE = route((_, { params }) => deleteEntry(params.section, params.id));
