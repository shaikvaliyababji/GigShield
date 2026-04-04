import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, 
  MapPin, CheckCircle2, ChevronRight,
  CreditCard, Smartphone, Building2,
  Lock, Receipt, ChevronLeft
} from 'lucide-react';

type Step = 'zone' | 'payment' | 'success';

export default function PaymentProfile() {
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState<Step>('zone');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [riskTier, setRiskTier] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'net'>('upi');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/onboarding');
      return;
    }
    const userData = JSON.parse(savedUser);
    setUser(userData);
    
    // If payment is pending, jump directly to payment step
    if (userData.paymentStatus === 'PENDING') {
      setStep('payment');
      setRiskTier(userData.tier || 1);
    }
  }, [navigate]);

  const handleNext = async () => {
    setIsLoading(true);
    
    if (step === 'payment') {
      // Perform actual payment update on backend
      try {
        const resp = await fetch(`http://localhost:8080/workers/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentStatus: 'PAID',
            lastPaymentDate: new Date().toISOString()
          })
        });

        if (resp.ok) {
          const updatedUser = await resp.json();
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setStep('success');
        }
      } catch (e) {
        console.error("Payment failed", e);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Simulate zone calculation
      setTimeout(() => {
        setIsLoading(false);
        setStep('payment');
      }, 1200);
    }
  };

  const renderZoneStep = () => (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-3">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">Your zone & premium</h2>
        <p className="text-lg opacity-40">AI assigns your risk tier and weekly premium based on real-time data.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
           <div className="flex flex-col gap-4">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Delivery Location</label>
              <div className="grid grid-cols-2 gap-4">
                 <select 
                   value={city} 
                   onChange={(e) => setCity(e.target.value)}
                   className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-white/40 appearance-none text-white lg:hover:bg-white/10 transition-colors"
                 >
                    <option value="" className="bg-black text-white">Select City</option>
                    <option value="chennai" className="bg-black text-white">Chennai</option>
                    <option value="mumbai" className="bg-black text-white">Mumbai</option>
                    <option value="delhi" className="bg-black text-white">Delhi</option>
                    <option value="bangalore" className="bg-black text-white">Bangalore</option>
                 </select>
                 <div className="relative group">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                    <input 
                      placeholder="6-digit pincode" 
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-white/40" 
                    />
                 </div>
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">AI Risk Tier Assigned</label>
              <div className="grid grid-cols-5 gap-2">
                 {[1, 2, 3, 4, 5].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setRiskTier(t)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all
                        ${riskTier === t ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 opacity-40 hover:opacity-100'}`}
                    >
                       <span className="text-xl font-black tracking-tighter leading-none">{t}</span>
                       <span className="text-[9px] font-bold uppercase tracking-widest">
                          {t === 1 ? 'Low' : t === 2 ? 'Mild' : t === 3 ? 'Med' : t === 4 ? 'High' : 'Ext'}
                       </span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 text-sm font-mono">
              <div className="flex justify-between items-center opacity-40">
                 <span>Base platform fee</span>
                 <span>₹10.00</span>
              </div>
              <div className="flex justify-between items-center opacity-40">
                 <span>Zone risk component</span>
                 <span>₹{riskTier * 5}.00</span>
              </div>
              <div className="flex justify-between items-center opacity-40">
                 <span>AI seasonal multiplier</span>
                 <span>×1.0</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center font-sans tracking-tight">
                 <span className="font-bold opacity-80 uppercase tracking-widest text-[10px]">Weekly Total</span>
                 <span className="text-3xl font-black">₹{10 + (riskTier * 5)}</span>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-10">
           <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-8 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                 <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                 <h4 className="text-xl font-bold tracking-tight mb-2 uppercase">Safety Valve Active</h4>
                 <p className="text-sm opacity-60 leading-relaxed">
                    Declare your weekly earnings to enable the safety valve. If you earn less than ₹2000 per week, your premium is automatically waived.
                 </p>
              </div>
              <div className="relative">
                 <input 
                    placeholder="Weekly expected earnings (e.g. 4200)"
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-white/40"
                 />
              </div>
           </div>

           <button 
             onClick={handleNext}
             disabled={isLoading || !city || !pincode}
             className="w-full bg-white text-black py-5 rounded-2xl font-black text-base hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-30 active:scale-[0.98]"
           >
             {isLoading ? "CALCULATING..." : <>Continue to Payment <ChevronRight className="w-5 h-5" /></>}
           </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">Payment details</h2>
        <p className="text-lg opacity-40">Complete your activation deposit to start coverage.</p>
      </div>

      <div className="flex flex-col gap-6">
         <div className="grid grid-cols-1 gap-4">
            {[
              { id: 'upi', name: 'UPI', sub: 'Google Pay, PhonePe, Paytm', icon: Smartphone },
              { id: 'card', name: 'Debit / Credit Card', sub: 'Visa, Mastercard, RuPay', icon: CreditCard },
              { id: 'net', name: 'Net Banking', sub: 'All Indian Banks Supported', icon: Building2 }
            ].map((p: any) => (
              <button 
                key={p.id}
                onClick={() => setPaymentMethod(p.id)}
                className={`p-6 rounded-2xl border flex items-center justify-between transition-all
                  ${paymentMethod === p.id ? 'bg-white/[0.04] border-white shadow-2xl' : 'bg-white/[0.02] border-white/10 opacity-40 hover:opacity-100'}`}
              >
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                       <p.icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                       <span className="block font-black text-lg">{p.name}</span>
                       <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest">{p.sub}</span>
                    </div>
                 </div>
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === p.id ? 'border-white' : 'border-white/20'}`}>
                    {paymentMethod === p.id && <div className="w-3 h-3 bg-white rounded-full"></div>}
                 </div>
              </button>
            ))}
         </div>

         {paymentMethod === 'upi' && (
           <div className="flex flex-col gap-4 animate-in slide-in-from-top-4 duration-500">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Enter UPI ID</label>
              <input 
                required 
                placeholder="yourname@upi" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-lg tracking-tight focus:outline-none focus:border-white/40 font-mono" 
              />
           </div>
         )}

         <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-30 mt-4">
            <Lock className="w-3 h-3" /> Powered by Razorpay · Encrypted
         </div>

         <button 
           onClick={handleNext}
           disabled={isLoading}
           className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-30 active:scale-[0.98] shadow-2xl shadow-white/5"
         >
           {isLoading ? "PROCESSING..." : <>Activate Shield — ₹{user?.premium || (10 + (riskTier * 5))} <ArrowRight className="w-5 h-5" /></>}
         </button>

         {user?.paymentStatus !== 'PENDING' && (
            <button onClick={() => setStep('zone')} className="text-sm font-bold opacity-40 hover:opacity-100 flex items-center gap-2 justify-center py-2 transition-all">
               <ChevronLeft className="w-4 h-4" /> Go back to zone selection
            </button>
         )}
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="max-w-2xl mx-auto w-full animate-in fade-in zoom-in duration-500 flex flex-col gap-12 text-center items-center pb-20">
       <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-black" />
       </div>
       
       <div className="flex flex-col gap-3">
          <h2 className="text-5xl font-black tracking-tighter">Payment Successful</h2>
          <p className="text-lg opacity-40 uppercase tracking-widest font-black">Shield Activated</p>
       </div>

       <div className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col gap-6 text-sm text-left">
          <div className="flex items-center gap-3 text-xs font-bold opacity-40 uppercase tracking-widest border-b border-white/5 pb-4">
             <Receipt className="w-4 h-4" /> Transaction Summary
          </div>
          <div className="grid grid-cols-2 gap-y-4">
             <span className="opacity-40">Partner Name</span>
             <span className="font-bold text-right uppercase">{user.name} {user.lastName}</span>
             
             <span className="opacity-40">Transaction ID</span>
             <span className="font-bold text-right font-mono">TXN_{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
             
             <span className="opacity-40">Platform / Zone</span>
             <span className="font-bold text-right uppercase">{user.platform || 'Partner'} / {user.city}</span>
             
             <span className="opacity-40">Coverage Tier</span>
             <span className="font-bold text-right text-blue-400 font-black">TIER {user.tier} ACTIVATED</span>
             
             <span className="opacity-40">Payment Method</span>
             <span className="font-bold text-right uppercase">{paymentMethod}</span>
             
             <div className="col-span-2 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="font-black text-xl uppercase tracking-tighter">Amount Paid</span>
                <span className="text-3xl font-black font-mono">₹{user.premium}</span>
             </div>
          </div>
       </div>

       <div className="flex flex-col gap-4 w-full">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3"
          >
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-[#000000] p-6 lg:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        <header className="flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Exit Setup
          </Link>
          <h1 className="text-2xl font-black tracking-tighter uppercase">GigShield</h1>
        </header>

        {step === 'zone' && renderZoneStep()}
        {step === 'payment' && renderPaymentStep()}
        {step === 'success' && renderSuccessStep()}

      </div>
    </div>
  );
}
