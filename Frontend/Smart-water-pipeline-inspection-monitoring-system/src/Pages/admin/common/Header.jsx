import React,{useState} from 'react'
import { Menu,Bell,User,ChevronDown,LogOut  } from 'lucide-react';
function Header({ onMenuClick, onLogoutRequest }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-gray-500" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div>
          <p className="text-sm font-semibold text-gray-800 leading-none">AQUA-SENTRY</p>
          <p className="text-[11px] text-gray-400">Water Pipeline Inspection &amp; Monitoring</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <span className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center">
              <User size={14} />
            </span>
            <span className="hidden sm:block text-left">
              <span className="block leading-none text-gray-800 font-medium">Admin User</span>
              <span className="block text-[11px] text-gray-400">System Administrator</span>
            </span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg py-1 text-sm">
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50">My Profile</button>
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50">Account Settings</button>
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  setProfileOpen(false);
                  onLogoutRequest();
                }}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header
