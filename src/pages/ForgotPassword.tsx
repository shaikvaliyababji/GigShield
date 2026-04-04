import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Smartphone, Mail, 
  ChevronLeft, ArrowRight, CheckCircle2,
  Lock, Eye, EyeOff, Timer
} from 'lucide-react';

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3);
      else {
        setIsSuccess(true);
        setTimeout(() => navigate('/onboarding'), 2000);
      }
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8 animate-pulse">
           <CheckCircle2 className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-4xl font-black tracking-tighter mb-4">PIN Reset Successful</h2>
        <p className="text-white/60 mb-8 max-w-sm">Your Security PIN has been updated. Redirecting you to sign in...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black flex flex-col">
      
      {/* Header Navigation */}
      <nav className="p-8 lg:px-16 flex justify-between items-center bg-[#000000]">
        <Link to="/onboarding" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
           <ChevronLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <h1 className="text-xl font-black tracking-tighter uppercase">GigShield</h1>
        <div className="w-24"></div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md flex flex-col gap-10">
          
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                <ShieldCheck className="w-3 h-3" /> Step 0{step} of 03
             </div>
             <h2 className="text-5xl font-black tracking-tighter leading-none">
                {step === 1 && "Identity."}
                {step === 2 && "Verify."}
                {step === 3 && "Reset."}
             </h2>
             <p className="text-lg opacity-40">
                {step === 1 && "Enter your registered details to receive an OTP."}
                {step === 2 && "We've sent a 6-digit code to your mobile number."}
                {step === 3 && "Create a new 6-digit security PIN for your account."}
             </p>
          </div>

          <form onSubmit={handleNext} className="flex flex-col gap-8">
            
            {step === 1 && (
              <div className="space-y-4">
                <div className="relative group">
                   <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                   <input required type="tel" placeholder="Mobile Number" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                </div>
                <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                   <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex gap-2 justify-between">
                   {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input 
                        key={i} 
                        required 
                        maxLength={1} 
                        className="w-12 h-16 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-bold focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" 
                      />
                   ))}
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs opacity-40 flex items-center gap-2">
                      <Timer className="w-3 h-3" /> Resend in 0:54
                   </span>
                   <button type="button" className="text-xs font-bold text-blue-400 hover:underline">Resend OTP</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="relative group">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                   <input required type={showPin ? "text" : "password"} placeholder="New 6-digit PIN" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                   <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100">
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   </button>
                </div>
                <div className="relative group">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100" />
                   <input required type={showPin ? "text" : "password"} placeholder="Confirm New PIN" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:bg-white/[0.08]" />
                </div>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] shadow-2xl shadow-white/5"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>
                  {step === 1 && "Send Verification Link"}
                  {step === 2 && "Confirm Verification"}
                  {step === 3 && "Update Security PIN"}
                  {step < 3 && <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>

          </form>

          {step === 1 && (
            <div className="p-6 border border-white/5 rounded-3xl bg-white/[0.01] flex flex-col gap-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                 <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xs opacity-40 leading-relaxed">
                For your security, we'll verify your identity through your registered mobile and email before allowing a PIN reset.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
