import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()
  const onArchive = pathname.startsWith('/archive')

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: '#f5ede8', paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-serif font-medium text-xl tracking-tight">
          Improv
        </Link>
        <Link
          to="/archive"
          className={onArchive ? 'text-sm font-medium tracking-wide' : 'nav-link'}
          style={
            onArchive
              ? {
                  textDecoration: 'underline',
                  textDecorationStyle: 'wavy',
                  textDecorationColor: 'black',
                  textDecorationThickness: '1.5px',
                  textUnderlineOffset: '4px',
                }
              : undefined
          }
        >
          Archive
        </Link>
      </div>
    </header>
  )
}
