import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, User, 
  ArrowRight, ShieldAlert,
  ChevronLeft, CheckCircle2, Timer,
  ArrowLeft
} from 'lucide-react';

type AuthView = 'login' | 'signup' | 'forgot' | 'success';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const adminLogins = ['admin@gigshield.ai', 'ops@gigshield.ai', 'abhi@gigshield.ai', 'adminx'];

export default function Onboarding() {
  const [view, setView] = useState<AuthView>('login');
  const [platform, setPlatform] = useState<'zomato' | 'swiggy' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const navigate = useNavigate();

  // Unified Form State
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    pin: '',
    city: '',
    pincode: '',
    platform: 'zomato'
  });

  const currentRole = adminLogins.includes(formData.phone.toLowerCase()) ? 'admin' : 'worker';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const isAdminLogin = adminLogins.includes(formData.phone.toLowerCase());

      if (view === 'login' && isAdminLogin && formData.pin === '1691') {
        const adminUser = {
          id: 'admin_1',
          name: isAdminLogin ? (formData.phone.split('@')[0].toUpperCase() + ' ADMIN') : 'System Admin',
          role: 'ADMIN',
          platform: 'INTERNAL'
        };
        localStorage.setItem('user', JSON.stringify(adminUser));
        navigate('/admin');
        setIsLoading(false);
        return;
      }

      if (view === 'forgot') {
        // Handle forgot password steps locally for now or add API
        if (forgotStep < 3) {
          setForgotStep((prev) => (prev + 1) as 1 | 2 | 3);
          setIsLoading(false);
          return;
        }
        setView('success');
        setTimeout(() => setView('login'), 2000);
        setIsLoading(false);
        return;
      }

      const endpoint = view === 'login' ? "/auth/login" : "/auth/signup";
      const payload = view === 'login' ? {
        phone: formData.phone,
        pin: formData.pin,
        role: currentRole.toUpperCase()
      } : {
        ...formData,
        role: currentRole.toUpperCase(),
        platform: platform || 'zomato',
        tier: 1,
        trustScore: 85,
        premium: 15,
        safetyValveActive: true
      };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed");

      localStorage.setItem('user', JSON.stringify(data));
      
      if (view === 'signup') {
        localStorage.setItem('is_new_user', 'true');
        setView('success');
        setTimeout(() => navigate('/plans'), 2000);
      } else {
        navigate(currentRole === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <div className="w-full flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold tracking-tight">Welcome back</h3>
        <p className="text-sm opacity-40">Access your GigShield portal and active coverage.</p>
      </div>

      <form onSubmit={handleAction} className="flex flex-col gap-6">
        {error && (
           <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
              {error}
           </div>
        )}
        {/* Toggle removed as requested */}

        <div className="flex flex-col gap-4">
           <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
              <input 
                required 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="text" 
                placeholder="Phone or Identity ID" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" 
              />
           </div>
           <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
              <input 
                required 
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"} 
                placeholder="Security PIN" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100">
                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
           </div>
        </div>

        <div className="flex justify-end">
           <button type="button" onClick={() => setView('forgot')} className="text-xs font-bold text-blue-400 hover:underline">Forgot password?</button>
        </div>

        <button disabled={isLoading} className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-30">
          {isLoading ? <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div> : <>Sign In to GigShield <ArrowRight className="w-4 h-4" /></>}
        </button>

        <p className="text-center text-xs opacity-40">New to GigShield? <button type="button" onClick={() => { setView('signup'); setError(null); }} className="font-bold text-white hover:underline">Create account</button></p>
      </form>
    </div>
  );

  const renderSignupForm = () => (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500 overflow-hidden">
      <button onClick={() => { setView('login'); setError(null); }} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"><ChevronLeft className="w-3 h-3" /> Back to Sign In</button>
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold tracking-tight">Create Account</h3>
        <p className="text-sm opacity-40">Join the parametric shield for gig workers.</p>
      </div>

      <form onSubmit={handleAction} className="flex flex-col gap-6 pb-4">
        {error && (
           <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
              {error}
           </div>
        )}
        {/* Admin signup restricted */}

        <div className="grid grid-cols-2 gap-4">
           <input required name="name" value={formData.name} onChange={handleInputChange} placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-white/40" />
           <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-white/40" />
        </div>

        <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Mobile Number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-white/40" />

        {currentRole === 'worker' && (
          <div className="flex flex-col gap-4 pt-2">
             <div className="flex gap-2">
                <button type="button" onClick={() => setPlatform('zomato')} className={`flex-1 py-3 rounded-xl border text-[10px] font-black ${platform === 'zomato' ? 'bg-[#E23744] border-[#E23744] text-white' : 'bg-white/5 border-white/10 opacity-40'}`}>ZOMATO</button>
                <button type="button" onClick={() => setPlatform('swiggy')} className={`flex-1 py-3 rounded-xl border text-[10px] font-black ${platform === 'swiggy' ? 'bg-[#FC8019] border-[#FC8019] text-white' : 'bg-white/5 border-white/10 opacity-40'}`}>SWIGGY</button>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-white/40" />
                <input required name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pin Code" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-white/40" />
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
           <input required name="pin" value={formData.pin} onChange={handleInputChange} type="password" placeholder="Create 4-digit PIN" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-white/40" />
        </div>

        <div className="flex items-start gap-3 px-2">
           <input required type="checkbox" className="mt-1 w-3 h-3 rounded border-white/20 bg-white/5 accent-white shrink-0" />
           <p className="text-[9px] opacity-30 leading-tight uppercase tracking-wider font-bold">I agree to the parametric payout terms and automated fraud monitoring system.</p>
        </div>

        <button disabled={isLoading || (currentRole === 'worker' && !platform)} className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm hover:opacity-90 flex items-center justify-center gap-2 mt-2 disabled:opacity-30">
           {isLoading ? "PROCESSSING..." : "CREATE ACCOUNT"}
        </button>
        <p className="text-center text-xs opacity-30">Existing member? <button type="button" onClick={() => setView('login')} className="font-bold text-white hover:underline">Sign in</button></p>
      </form>
    </div>
  );

  const renderForgotForm = () => (
    <div className="w-full flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <button onClick={() => { setView('login'); setForgotStep(1); }} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"><ChevronLeft className="w-3 h-3" /> Back to Sign In</button>
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold tracking-tight">Recovery</h3>
        <p className="text-sm opacity-40">
           {forgotStep === 1 && "Identity verification."}
           {forgotStep === 2 && "Enter verification code."}
           {forgotStep === 3 && "Secure new PIN setup."}
        </p>
      </div>

      <form onSubmit={handleAction} className="flex flex-col gap-6">
        {forgotStep === 1 && (
           <div className="flex flex-col gap-4">
              <input required type="tel" placeholder="Registered Mobile" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:border-white/40" />
           </div>
        )}
        {forgotStep === 2 && (
           <div className="flex flex-col gap-6">
              <div className="flex justify-between gap-2">
                 {[1,2,3,4,5,6].map(i => <input key={i} required maxLength={1} className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-bold focus:border-white/40" />)}
              </div>
              <div className="flex justify-between text-[10px] font-bold opacity-40">
                 <span><Timer className="inline w-3 h-3 mr-1" /> RESEND IN 0:54</span>
                 <button type="button" className="text-blue-400">RESEND NOW</button>
              </div>
           </div>
        )}
        {forgotStep === 3 && (
           <div className="flex flex-col gap-4">
              <input required type="password" placeholder="New 6-digit PIN" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:border-white/40" />
              <input required type="password" placeholder="Confirm New PIN" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:border-white/40" />
           </div>
        )}

        <button disabled={isLoading} className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm hover:opacity-90 flex items-center justify-center gap-2">
           {isLoading ? "VERIFYING..." : (forgotStep === 3 ? "RESET PIN" : "CONTINUE")}
        </button>
      </form>
    </div>
  );

  const renderSuccess = () => (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-12 animate-in fade-in zoom-in duration-500">
       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-black" />
       </div>
       <div className="text-center">
          <h3 className="text-2xl font-bold tracking-tight">Operation Successful</h3>
          <p className="text-sm opacity-40 mt-1">Redirecting you to the portal...</p>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans flex flex-col lg:flex-row selection:bg-white selection:text-[#000000]">
      {/* Left Panel: Brand Identity (Unchanged) */}
      <div className="lg:w-1/2 p-8 lg:p-24 flex flex-col relative overflow-hidden bg-white/[0.01]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.05] rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Top Header Section */}
        <div className="relative z-10 flex items-center gap-8 mb-32">
           <h1 className="text-4xl font-black tracking-tighter text-white">GigShield</h1>
           <Link to="/" className="flex items-center gap-3 text-sm font-semibold opacity-40 hover:opacity-100 transition-opacity border-l border-white/10 pl-8 h-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
           </Link>
        </div>

        {/* Main Content Section */}
        <div className="relative z-10 flex flex-col gap-8">
           <h2 className="text-6xl lg:text-[100px] font-black tracking-tighter leading-[0.85]">
             Income protection <br /> <span className="opacity-30">for every delivery.</span>
           </h2>
           <p className="text-2xl lg:text-3xl font-bold tracking-tight opacity-60 max-w-2xl leading-tight">
             "Architecting financial resilience for the gig economy through AI-driven parametric protection and instant digital security."
           </p>
        </div>
      </div>

      {/* Right Panel: Auth Hub */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center relative">
        <div className="w-full max-w-md">
          {view === 'login' && renderLoginForm()}
          {view === 'signup' && renderSignupForm()}
          {view === 'forgot' && renderForgotForm()}
          {view === 'success' && renderSuccess()}

          {view === 'login' && (
            <div className="mt-8 flex items-center justify-center gap-4 py-4 border-t border-white/10">
               <div className="flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <ShieldAlert className="w-3 h-3" /> 10-layer fraud protection
               </div>
               <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest italic">Instant payout eligible</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
