import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, MapPin, 
  Lock, Eye, EyeOff, ArrowRight, 
  ChevronLeft, CheckCircle2, ShieldCheck,
  Building2, Smartphone
} from 'lucide-react';

export default function Signup() {
  const [role, setRole] = useState<'worker' | 'admin'>('worker');
  const [platform, setPlatform] = useState<'zomato' | 'swiggy' | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 animate-bounce">
           <CheckCircle2 className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-4xl font-black tracking-tighter mb-4">Account Created!</h2>
        <p className="text-white/60 mb-8 max-w-sm">Welcome to GigShield. Preparing your personalized protection dashboard...</p>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
           <div className="h-full bg-white animate-progress-fast"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black pb-20">
      
      {/* Header Navigation */}
      <nav className="p-8 lg:px-16 flex justify-between items-center sticky top-0 bg-[#000000]/80 backdrop-blur-md z-50 border-b border-white/5">
        <Link to="/onboarding" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
           <ChevronLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <h1 className="text-xl font-black tracking-tighter">GigShield</h1>
        <div className="w-24"></div> {/* Spacer */}
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-12">
        <div className="flex flex-col gap-10">
          
          <div className="flex flex-col gap-3">
             <h2 className="text-5xl font-black tracking-tighter leading-none">Join the shield.</h2>
             <p className="text-lg opacity-40">Create your account to start your parametric coverage.</p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-12">
            
            {/* 1. Role Selection */}
            <section className="flex flex-col gap-6">
               <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-20">
                  <span className="w-8 h-px bg-white/20"></span>
                  01. Choose your role
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setRole('worker')}
                    className={`p-6 rounded-2xl border flex flex-col gap-4 transition-all text-left
                      ${role === 'worker' ? 'bg-white text-black border-white shadow-2xl shadow-white/10' : 'bg-white/5 border-white/10 opacity-40 hover:opacity-100'}`}
                  >
                     <Smartphone className={`w-6 h-6 ${role === 'worker' ? 'text-black' : 'text-white'}`} />
                     <div>
                        <span className="block font-black text-lg tracking-tight leading-none">Delivery Partner</span>
                        <span className="text-[10px] opacity-60 uppercase font-black tracking-widest mt-1 block">Zomato / Swiggy</span>
                     </div>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`p-6 rounded-2xl border flex flex-col gap-4 transition-all text-left
                      ${role === 'admin' ? 'bg-white text-black border-white shadow-2xl shadow-white/10' : 'bg-white/5 border-white/10 opacity-40 hover:opacity-100'}`}
                  >
                     <ShieldCheck className={`w-6 h-6 ${role === 'admin' ? 'text-black' : 'text-white'}`} />
                     <div>
                        <span className="block font-black text-lg tracking-tight leading-none">Admin / Ops</span>
                        <span className="text-[10px] opacity-60 uppercase font-black tracking-widest mt-1 block">System Controls</span>
                     </div>
                  </button>
               </div>
            </section>

            {/* 2. Basic Info */}
            <section className="flex flex-col gap-6">
               <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-20">
                  <span className="w-8 h-px bg-white/20"></span>
                  02. Personal details
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                     <input required placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                  </div>
                  <div className="relative group">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                     <input required placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                  </div>
                  <div className="relative group">
                     <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                     <input required type="tel" placeholder="Mobile Number" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                  </div>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                     <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                  </div>
               </div>
            </section>

            {/* 3. Platform Details (Only for Workers) */}
            {role === 'worker' && (
              <section className="flex flex-col gap-6 animate-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-20">
                  <span className="w-8 h-px bg-white/20"></span>
                  03. Platform connection
               </div>
               
               <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setPlatform('zomato')}
                    className={`flex-1 py-4 border rounded-2xl text-xs font-black transition-all
                      ${platform === 'zomato' ? 'bg-[#E23744] border-[#E23744] text-white' : 'bg-white/5 border-white/10 opacity-40'}`}
                  >
                     ZOMATO
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPlatform('swiggy')}
                    className={`flex-1 py-4 border rounded-2xl text-xs font-black transition-all
                      ${platform === 'swiggy' ? 'bg-[#FC8019] border-[#FC8019] text-white' : 'bg-white/5 border-white/10 opacity-40'}`}
                  >
                     SWIGGY
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                     <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                     <input required placeholder="Partner ID" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                  </div>
                  <div className="relative group">
                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                     <input required placeholder="City / Zone" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                  </div>
               </div>
              </section>
            )}

            {/* 4. Security */}
            <section className="flex flex-col gap-6">
               <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-20">
                  <span className="w-8 h-px bg-white/20"></span>
                  {role === 'worker' ? '04' : '03'}. Security setup
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                     <input required type={showPin ? "text" : "password"} placeholder="Create 6-digit PIN" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                     <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100">
                        {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                  </div>
                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                     <input required type={showPin ? "text" : "password"} placeholder="Confirm 6-digit PIN" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                  </div>
               </div>
            </section>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group p-4 border border-white/10 rounded-2xl bg-white/[0.02]">
               <input required type="checkbox" className="mt-1 accent-white" />
               <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  I agree to the GigShield Terms of Service and Privacy Policy. I authorize GigShield to verify my platform partner status for automated coverage.
               </span>
            </label>

            <button 
              disabled={isLoading}
              className="w-full bg-white text-black py-5 rounded-2xl font-black text-base hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] shadow-2xl shadow-white/5"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>Complete Account Setup <ArrowRight className="w-5 h-5" /></>
              )}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
