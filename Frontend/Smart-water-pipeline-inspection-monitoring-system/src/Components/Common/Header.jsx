import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Menu, X, ChevronDown, User, LogOut, ClipboardList, MessageSquareWarning } from 'lucide-react';
import Container from './Container';
import Button from './Button';
import { useAppContext } from '../../Context';
const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "#contact" },
];

const COMPLAINT_HREF = "/report-issue";
const PROFILE_HREF = "/citizen/profile";
const MY_COMPLAINTS_HREF = "/citizen/complaints";

// Fallback so the header works even if no `user` prop is passed:
// reads the object saved at login (localStorage "user"). Returns null when not logged in.
function getStoredUser() {
    try {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function getDisplayName(user) {
    return user?.name || user?.fullName || user?.username || user?.email || "My Account";
}

function Header({ user: userProp }) {
    // user === null  -> not logged in
    // user !== null  -> logged in
      const {user,setUser}= useAppContext();
    const userName = user ? getDisplayName(user) : "";
    const initial = userName.charAt(0).toUpperCase();

    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // Close the profile dropdown on outside click or Escape
    useEffect(() => {
        function handleClick(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        }
        function handleKey(e) {
            if (e.key === "Escape") setProfileOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, []);
    
    function handleLogout() {
        setProfileOpen(false);
        setOpen(false);
        setUser(null);
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <header className="sticky top-0 z-5000 border-b border-slate-100 bg-white/90 backdrop-blur">
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

                    {/* Desktop right side */}
                    <div className="hidden items-center gap-3 md:flex">
                        {user ? (
                            <>
                                <Button href={COMPLAINT_HREF} className="py-2">
                                    <span className="inline-flex items-center gap-2">
                                        <MessageSquareWarning className="h-4 w-4" aria-hidden="true" />
                                        Complaint
                                    </span>
                                </Button>

                                <div className="relative" ref={profileRef}>
                                    <button
                                        type="button"
                                        onClick={() => setProfileOpen((v) => !v)}
                                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                        aria-haspopup="menu"
                                        aria-expanded={profileOpen}
                                        aria-label="Open profile menu"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                                            {initial}
                                        </span>
                                        <span className="max-w-36 truncate">{userName}</span>
                                        <ChevronDown
                                            className={`h-4 w-4 text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                                            aria-hidden="true"
                                        />
                                    </button>

                                    {profileOpen && (
                                        <div
                                            role="menu"
                                            className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
                                        >
                                            <div className="border-b border-slate-100 px-4 py-3">
                                                <p className="truncate text-sm font-semibold text-slate-900">{userName}</p>
                                                {user.email && (
                                                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                                                )}
                                            </div>
                                            <a
                                                href={PROFILE_HREF}
                                                role="menuitem"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <User className="h-4 w-4" aria-hidden="true" /> My Profile
                                            </a>
                                            <a
                                                href={MY_COMPLAINTS_HREF}
                                                role="menuitem"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                <ClipboardList className="h-4 w-4" aria-hidden="true" /> My Complaints
                                            </a>
                                            <button
                                                type="button"
                                                role="menuitem"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="h-4 w-4" aria-hidden="true" /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" href="/login" className="py-2">
                                    Login
                                </Button>
                                <Button href="/register" className="py-2">
                                    Register
                                </Button>
                            </>
                        )}
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

                {/* Mobile menu */}
                <div
                    id="mobile-menu"
                    className={`grid overflow-hidden transition-all duration-300 md:hidden ${open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                        }`}
                >
                    <div className="min-h-0">
                        {user && (
                            <div className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                                    {initial}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-slate-900">{userName}</p>
                                    {user.email && <p className="truncate text-xs text-slate-500">{user.email}</p>}
                                </div>
                            </div>
                        )}

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
                            {user && (
                                <>
                                    <li>
                                        <a
                                            href={PROFILE_HREF}
                                            onClick={() => setOpen(false)}
                                            className="block rounded-lg px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={MY_COMPLAINTS_HREF}
                                            onClick={() => setOpen(false)}
                                            className="block rounded-lg px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            My Complaints
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>

                        {user ? (
                            <div className="mt-3 grid grid-cols-2 gap-3 px-1">
                                <Button href={COMPLAINT_HREF}>Complaint</Button>
                                <Button variant="secondary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="mt-3 grid grid-cols-2 gap-3 px-1">
                                <Button variant="secondary" href="/login">
                                    Login
                                </Button>
                                <Button href="/register">Register</Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;