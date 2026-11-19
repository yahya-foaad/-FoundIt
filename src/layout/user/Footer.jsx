import { Link } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const quickLinks = [
    { to: "/", label: "الرئيسية" },
    { to: "/items", label: "المفقودات والمعثرات" },
    { to: "/report", label: "إبلاغ جديد" },
    { to: "/profile/settings", label: "حسابك" },
  ];

  const socials = [
    { href: "#", icon: FaFacebookF, label: "Facebook" },
    { href: "#", icon: FaXTwitter, label: "X" },
    { href: "#", icon: FaInstagram, label: "Instagram" },
    { href: "#", icon: FaLinkedinIn, label: "LinkedIn" },
  ];
  return (
    <footer dir="rtl" className="bg-neutral text-neutral-content">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* الشعار والوصف (يمين) */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold">FoundIt</span>
              <HiLocationMarker className="text-4xl text-primary" />
            </div>
            <p className="mt-1 text-sm font-bold text-primary">
              مفقودات ومقتنيات الجامعة
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-content/80">
              منصتك الجامعية الأولى للبحث عن المفقودات وإعادة المقتنيات
              لأصحابها. معاً لنبسط استرجاع ما فُقد.
            </p>

            <div className="mt-5 flex gap-4">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-2xl text-neutral-content transition hover:text-primary">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* روابط سريعة (شمال) */}
          <div className="md:justify-self-end">
            <h3 className="mb-4 text-xl font-extrabold">روابط سريعة</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-neutral-content/80 transition hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* الخط وحقوق النشر */}
        <div className="mt-10 border-t border-neutral-content/20 pt-5 text-center text-sm text-neutral-content/70">
          جميع الحقوق محفوظة © 2026 - FoundIt مفقودات ومقتنيات الجامعة
        </div>
      </div>
    </footer>
  );
};

export default Footer;
