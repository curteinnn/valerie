const links = [
  ["ABOUT", "#about"],
  ["MUSIC", "#music"],
  ["GALLERY", "#gallery"],
  ["SHOWS", "#shows"],
  ["MEMBERS", "#members"],
  ["CONTACT", "#contact"],
];

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="nav-mark" href="#home" aria-label="VALERIE, home">
        V.
      </a>
      <div className="nav-links">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </div>
      <span className="nav-status">
        <i /> INDEPENDENT MUSIC
      </span>
    </nav>
  );
}
