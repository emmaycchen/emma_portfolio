/** Every link used by Navbar / Footer / Hero lives here. */

/**
 * Social / contact links. `external: true` opens in a new tab (target="_blank" + rel);
 * mailto: stays in the same window.
 */
export const socialLinks = [
  { label: "Email", href: "mailto:emma.chen@emmaycchen.com", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/emma-chen-a98157/", external: true },
  { label: "GitHub", href: "https://github.com/orgs/emmaycchen/", external: true },
  { label: "WhatsApp", href: "https://wa.me/886966931845", external: true },
] as const;

/** Internal pages (shared by Navbar, Footer and Hero). */
export const pageLinks = [
  { label: "About Me", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Blog", href: "/blog" },
] as const;

export const worksHref = "/works";
export const contactHref = "/contact";
export const homeHref = "/";
