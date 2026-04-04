import { Link, useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';

export default function Landing() {
  const [user, setUser] = useState<any>(null);
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] flex flex-col font-sans overflow-hidden text-white selection:bg-white selection:text-[#000000]">
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 pt-2 pb-6 z-10 w-full shrink-0">
        <div className="flex items-center gap-4 min-w-[200px]">
           {user && (
             <span className="text-sm font-semibold tracking-wide uppercase hover:opacity-80 transition-opacity cursor-pointer">
                {user.name}
             </span>
           )}
        </div>
        
        <div className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide">
          <Link to="/coverage" className="cursor-pointer flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            Coverage Options
          </Link>
          <Link to="/plans" className="cursor-pointer flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            Plans
          </Link>
          <span className="cursor-pointer flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            Customer Service
          </span>
          {user?.role !== 'ADMIN' && (
            <Link to="/dashboard" className="cursor-pointer hover:opacity-80 transition-opacity">
              Dashboard
            </Link>
          )}
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="cursor-pointer hover:opacity-80 transition-opacity">
              Admin Portal
            </Link>
          )}
        </div>
        
        {user ? (
          <button 
            onClick={handleLogout}
            onMouseEnter={() => setIsHoveringLogout(true)}
            onMouseLeave={() => setIsHoveringLogout(false)}
            className={`min-w-[160px] ${isHoveringLogout ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]'} text-white font-black text-xs px-8 py-3 rounded uppercase tracking-widest transition-all duration-300 active:scale-95`}
          >
            {isHoveringLogout ? 'Logout' : 'Covered'}
          </button>
        ) : (
          <Link 
            to="/onboarding" 
            className="bg-white text-black font-semibold text-sm px-6 py-2.5 rounded hover:bg-gray-100 transition-colors"
          >
            Activate Coverage
          </Link>
        )}
      </nav>

      {/* Main Graphic Layer */}
      <main className="flex-1 w-full relative flex items-center justify-center py-2 px-8 lg:px-16 shrink-0 z-0">
        
        <div className="w-full h-[65vh] xl:h-[75vh] max-w-[1400px] mx-auto relative rounded-3xl overflow-hidden">
            {/* Interactive Spline 3D Integration */}
         <div className="w-full h-full relative spline-container pointer-events-none">
           {/* Hiding the spline logo/watermark overlay */}
           <style>{`
             .spline-container a { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
             /* Hack to visually crush the exported orange background into black while keeping the coin bright */
             .spline-container canvas { filter: grayscale(1) contrast(2.5) brightness(0.4); }
           `}</style>
           <Spline scene="https://prod.spline.design/Cj0g56C3a624cvuV/scene.splinecode" />
         </div>
        </div>

      </main>

      {/* Footer Text */}
      <footer className="w-full flex justify-between items-end px-6 pb-6 pt-4 shrink-0 relative z-10">
        <h1 className="text-3xl font-bold tracking-tighter leading-none select-none flex items-center gap-2">
           GigShield
        </h1>
        <p className="text-xl md:text-2xl font-serif tracking-tight select-none opacity-90">
          Smart Parametric Coverage
        </p>
      </footer>
    </div>
  );
}
