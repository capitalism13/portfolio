import { getPayload } from 'payload'
import config from '@payload-config'
import { seedData } from '@/seed/run'
import { guardMaintenanceRoute } from '@/lib/devGuard'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const blocked = guardMaintenanceRoute(req)
  if (blocked) return blocked
  try {
    const payload = await getPayload({ config })
    const result = await seedData(payload)
    return Response.json(result)
  } catch (e) {
    const err = e as Error
    return Response.json({ ok: false, error: err.message, stack: err.stack }, { status: 500 })
  }
}
