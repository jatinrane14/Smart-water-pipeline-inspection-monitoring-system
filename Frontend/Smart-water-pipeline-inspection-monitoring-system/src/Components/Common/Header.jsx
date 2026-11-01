import React, {useState} from 'react';
import { Rocket,Menu } from 'lucide-react';
import Container from './Container';
import Button from './Button';

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
            <Container>
                <nav
                    className="flex h-16 items-center justify-between"
                    aria-label="Main navigation"
                >
                    <a
                        href="#home"
                        className="flex items-center gap-2 text-xl font-bold text-slate-900"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <Rocket className="h-5 w-5" aria-hidden="true" />
                        </span>
                        AquaSentry
                    </a>

                    <ul className="hidden items-center gap-1 md:flex">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden items-center gap-3 md:flex">
                        <Button variant="ghost" href="/login" className="py-2">
                            Login
                        </Button>
                        <Button href="/register" className="py-2">
                            Register
                        </Button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                    >
                        {open ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </nav>

                <div
                    id="mobile-menu"
                    className={`grid overflow-hidden transition-all duration-300 md:hidden ${open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                        }`}
                >
                    <div className="min-h-0">
                        <ul className="flex flex-col gap-1">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="block rounded-lg px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3 grid grid-cols-2 gap-3 px-1">
                            <Button variant="secondary" href="#">
                                Login
                            </Button>
                            <Button href="#">Register</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;