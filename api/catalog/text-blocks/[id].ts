import type { VercelRequest, VercelResponse } from '@vercel/node';
import { route } from '../../_lib/http.js';
import { prismaRepositories as repos } from '../../_lib/repositories/prisma.js';
import { updateTextBlock, removeTextBlock } from '../../_lib/services/catalog.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id);
  return route(req, res, {
    PATCH: () => updateTextBlock(repos, id, req.body),
    DELETE: () => removeTextBlock(repos, id),
  });
}
