'use client'
 
import { useSelectedLayoutSegments } from 'next/navigation'
 
export default function BreadCrumbs() {
  const segments = useSelectedLayoutSegments()
 
  return (
    <ul className="flex gap-2 p-2">
      {segments.map((segment: string, index: string) => {
        if(!segment.startsWith("(")) {
          return <li key={index} className="bc_items">{segment}</li>
        }
      })}
    </ul>
  )
}