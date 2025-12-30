export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Sanity Studio has its own UI, just render children without any wrapper
  return <>{children}</>
}
