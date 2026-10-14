import { route, body } from '@/lib/http';
import { listEntries, saveEntry } from '@/lib/content-service';
export const GET = route((_, { params }) => listEntries(params.section));
export const POST = route(async (req, { params }) => saveEntry(params.section, await body(req)));
