import { NextResponse } from 'next/server'
import config from '@payload-config'
import { generateImportMap } from 'payload'
import { guardMaintenanceRoute } from '@/lib/devGuard'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const blocked = guardMaintenanceRoute(req)
  if (blocked) return blocked
  try {
    const resolved = await config
    await generateImportMap(resolved, { log: true, force: true })
    return NextResponse.json({ ok: true, note: 'importMap regenerated' })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
