export const ExternalLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer">{children}</a>
  )
}
