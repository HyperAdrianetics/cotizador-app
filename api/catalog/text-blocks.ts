import type { VercelRequest, VercelResponse } from '@vercel/node';
import { route } from '../_lib/http.js';
import { prismaRepositories as repos } from '../_lib/repositories/prisma.js';
import { listTextBlocks, createTextBlock } from '../_lib/services/catalog.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return route(req, res, {
    GET: () => listTextBlocks(repos, req.query.type),
    POST: () => createTextBlock(repos, req.body),
  });
}
