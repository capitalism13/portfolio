'use client'

import { RefreshRouteOnSave as PayloadRefresh } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'

/** Mounted only inside the Payload Live Preview iframe — refreshes the
 *  server-rendered route whenever the document is (auto)saved. */
export default function RefreshOnSave() {
  const router = useRouter()
  return <PayloadRefresh refresh={() => router.refresh()} serverURL={serverURL} />
}
