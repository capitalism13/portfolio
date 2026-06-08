/** Allow maintenance routes (/seed, /importmap) only in dev, or in
 *  production when ?secret=<SEED_SECRET> matches. Otherwise 404. */
export function guardMaintenanceRoute(req: Request): Response | null {
  if (process.env.NODE_ENV !== 'production') return null
  const secret = process.env.SEED_SECRET
  const provided = new URL(req.url).searchParams.get('secret')
  if (secret && provided === secret) return null
  return Response.json({ error: 'Not found' }, { status: 404 })
}
