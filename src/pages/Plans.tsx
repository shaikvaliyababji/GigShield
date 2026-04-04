import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Check, X, ShieldCheck, 
  ArrowRight, Activity, Shield as ShieldIcon, Lock as LockIcon,
  ChevronRight
} from 'lucide-react';

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const plans = [
    {
      id: 'lite',
      tier: 1,
      name: 'ShieldLite',
      badge: 'Lite',
      badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
      description: 'New workers · low-risk zones',
      price: 15,
      priceUnit: '/ week',
      stats: [
        { label: 'MAX PAYOUT', value: '₹500' },
        { label: 'PER TRIGGER', value: '₹200' },
        { label: 'MAX TRIGGERS', value: '2/week' },
        { label: 'ZONE TIER', value: '1 – 2' }
      ],
      features: [
        { text: 'Heavy rain coverage', included: true },
        { text: 'Heatwave coverage', included: true },
        { text: 'Safety valve (₹0 if <₹2000)', included: true },
        { text: 'Trust fast-track · 4 weeks', included: true },
        { text: 'Pollution & traffic cover', included: false },
        { text: 'Curfew & flash flood', included: false }
      ],
      whoItsFor: [
        'New delivery workers with no claims history',
        'Workers in low-risk Tier 1–2 zones',
        'Part-time or weekend gig workers'
      ],
      reasoning: "ShieldLite is the entry point — designed for workers who are just starting out or working in relatively safe zones. At ₹15/week it removes the cost barrier entirely, letting workers experience automatic payouts and build a trust score over 4 weeks."
    },
    {
      id: 'plus',
      tier: 2,
      name: 'ShieldPlus',
      badge: 'Plus',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      isPopular: true,
      description: 'Regular workers · medium-risk zones',
      price: 25,
      priceUnit: '/ week',
      stats: [
        { label: 'MAX PAYOUT', value: '₹1200' },
        { label: 'PER TRIGGER', value: '₹350' },
        { label: 'MAX TRIGGERS', value: '3/week' },
        { label: 'ZONE TIER', value: '2 – 3' }
      ],
      features: [
        { text: 'Heavy rain + heatwave', included: true },
        { text: 'Pollution cover (AQI > 350)', included: true },
        { text: 'Traffic congestion cover', included: true },
        { text: 'Safety valve (50% off <₹2000)', included: true },
        { text: 'AI zone upgrade · monsoon', included: true },
        { text: 'Trust fast-track · 3 weeks', included: true }
      ],
      whoItsFor: [
        'Regular full-day Zomato / Swiggy workers',
        'Workers in urban Tier 2–3 zones with traffic exposure',
        'Workers who\'ve completed 3+ weeks on the platform'
      ],
      reasoning: "ShieldPlus is the sweet spot for most gig workers. It covers all 4 primary triggers — rain, heatwave, pollution, and traffic — which together account for the vast majority of income disruptions in Indian metros."
    },
    {
      id: 'pro',
      tier: 4,
      name: 'ShieldPro',
      badge: 'Pro',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      description: 'Full-time workers · high-risk zones',
      price: 35,
      priceUnit: '/ week',
      stats: [
        { label: 'MAX PAYOUT', value: '₹2000' },
        { label: 'PER TRIGGER', value: '₹500' },
        { label: 'MAX TRIGGERS', value: '4/week' },
        { label: 'ZONE TIER', value: '3 – 4' }
      ],
      features: [
        { text: 'All Plus coverage', included: true },
        { text: 'Curfew / shutdown cover', included: true },
        { text: 'Safety valve (₹0 if <₹2000)', included: true },
        { text: 'Trust fast-track · 2 weeks', included: true },
        { text: 'Priority fraud review', included: true },
        { text: 'Flash flood coverage', included: false }
      ],
      whoItsFor: [
        'Full-time workers doing 8-10 hour daily shifts',
        'Workers in dense urban Tier 3–4 zones (Mumbai, Chennai, Hyderabad)',
        'Workers with dependents but not yet on ShieldFamily'
      ],
      reasoning: "ShieldPro is built for workers whose income is genuinely load-bearing. The addition of curfew and local shutdown coverage matters enormously in urban environments."
    },
    {
      id: 'max',
      tier: 5,
      name: 'ShieldMax',
      badge: 'Max',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
      description: 'Extreme-risk · monsoon season',
      price: 50,
      priceUnit: '/ week',
      stats: [
        { label: 'MAX PAYOUT', value: '₹3500' },
        { label: 'PER TRIGGER', value: '₹700' },
        { label: 'MAX TRIGGERS', value: '5/week' },
        { label: 'ZONE TIER', value: '4 – 5' }
      ],
      features: [
        { text: 'All Pro coverage', included: true },
        { text: 'Flash flood coverage', included: true },
        { text: 'Instant payout (high trust)', included: true },
        { text: 'Safety valve (50% off <₹2000)', included: true },
        { text: 'Multi-layer fraud shield', included: true },
        { text: 'IMD + weather station sync', included: true }
      ],
      whoItsFor: [
        'Workers in Tier 4–5 flood-prone zones (Chennai, Mumbai, Patna)',
        'Seasonal workers active during monsoon peak',
        'High-trust verified workers wanting instant payout'
      ],
      reasoning: "ShieldMax is the top-tier plan for workers operating in the highest-risk conditions in India. Flash flood is its exclusive 6th trigger."
    }
  ];

  const handleConfirmPlan = async () => {
    if (!user || !selectedPlan) return;
    setIsUpdating(true);
    try {
      const resp = await fetch(`http://localhost:8080/workers/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedPlan.tier,
          premium: selectedPlan.price,
          paymentStatus: 'PENDING'
        })
      });
      if (resp.ok) {
        const updatedUser = await resp.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.removeItem('is_new_user');
        navigate('/dashboard');
      }
    } catch (e) {
      console.error("Plan update failed", e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-[#000000] pt-4 px-6 pb-12 lg:pt-6 lg:px-12 relative overflow-x-hidden">
      
      {/* Selection Overlay */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl animate-in fade-in duration-500 flex items-center justify-center p-4">
           <div className="max-w-xl w-full bg-[#0a0a0a] border border-white/20 rounded-[3rem] p-8 lg:p-12 flex flex-col gap-8 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={() => setSelectedPlan(null)} className="p-2 opacity-40 hover:opacity-100 transition-opacity"><X className="w-6 h-6" /></button>
              </div>
              
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${selectedPlan.badgeColor}`}>Selected</span>
                    {selectedPlan.isPopular && <span className="bg-blue-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Most Popular</span>}
                 </div>
                 <h2 className="text-5xl font-black tracking-tighter uppercase">{selectedPlan.name}</h2>
                 <p className="text-lg opacity-40 leading-tight">Review your parametric coverage perks before we activate your shield.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1">
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Initial Premium</span>
                    <span className="text-3xl font-black tracking-tight text-green-400">₹{selectedPlan.price}</span>
                    <span className="text-[10px] opacity-40 font-mono italic">per week</span>
                 </div>
                 <div className="p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1">
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Trigger Cap</span>
                    <span className="text-3xl font-black tracking-tight text-blue-400">{selectedPlan.stats[2].value}</span>
                    <span className="text-[10px] opacity-40 font-mono italic">parametric events</span>
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <h4 className="text-[10px] font-black tracking-widest opacity-40 uppercase">Included Perks</h4>
                 <div className="grid gap-3">
                    {selectedPlan.features.filter((f: any) => f.included).slice(0, 4).map((f: any, i: number) => (
                       <div key={i} className="flex items-center gap-4 group">
                          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                             <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">{f.text}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                 <button 
                  onClick={handleConfirmPlan}
                  disabled={isUpdating}
                  className="w-full bg-white text-black py-5 rounded-[2rem] font-black text-lg hover:bg-gray-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    {isUpdating ? <Activity className="w-5 h-5 animate-spin" /> : "ACTIVATE SHIELD"}
                    {!isUpdating && <ArrowRight className="w-5 h-5" />}
                 </button>
                 <p className="text-center text-[10px] opacity-30 font-bold uppercase tracking-[0.2em]">Next cycle starts Sunday · No lock-in period</p>
              </div>
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <header className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold tracking-[0.2em] opacity-30 uppercase">Step 2 of 2 · Plan selection</span>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]">Choose Your <br /> <span className="opacity-20 text-white select-none">Coverage.</span></h1>
          <p className="text-xl opacity-40 max-w-2xl leading-tight">AI-optimized parametric protection starting from ₹15/week. Secure your income against India's most common gig disruptions.</p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className={`group relative border rounded-[3rem] p-6 xl:p-8 bg-white/[0.01] flex flex-col gap-8 transition-all hover:bg-white/[0.03] hover:border-white/50 hover:-translate-y-2
              ${plan.isPopular ? 'border-blue-500/40 shadow-[0_30px_60px_rgba(59,130,246,0.1)]' : 'border-white/20'}`}>
              
              {plan.isPopular && (
                <div className="absolute top-8 right-8 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                  Most popular
                </div>
              )}

              <div className="flex flex-col gap-4">
                <span className={`w-fit text-[10px] uppercase tracking-[0.2em] font-black px-4 py-1.5 rounded-full border shadow-sm ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
                <div className="flex flex-col gap-1 mt-2">
                  <h2 className="text-4xl font-black tracking-tight uppercase leading-none">{plan.name}</h2>
                  <p className="text-sm opacity-40 leading-snug">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-6xl font-black text-white leading-none">₹{plan.price}</span>
                  <span className="text-xs font-bold opacity-30 uppercase tracking-widest">{plan.priceUnit}</span>
                </div>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-2 gap-3">
                {plan.stats.map((stat, i) => (
                  <div key={i} className="bg-white/[0.05] rounded-3xl p-4 flex flex-col gap-0.5 border border-white/[0.05]">
                    <span className="text-[8px] font-black opacity-30 tracking-widest uppercase">{stat.label}</span>
                    <span className="text-md font-black tracking-tight">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="flex flex-col gap-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className={`flex items-center gap-4 text-xs font-bold ${feature.included ? 'opacity-80' : 'opacity-10'}`}>
                    {feature.included ? (
                      <Check className="w-4 h-4 shrink-0 text-white" />
                    ) : (
                      <X className="w-4 h-4 shrink-0" />
                    )}
                    <span className="tracking-tight">{feature.text}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedPlan(plan)}
                className="w-full py-5 rounded-[2rem] bg-white text-black font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-auto">
                GET STARTED <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Detailed Insights Section */}
        <div className="flex flex-col gap-12 mt-32 pt-24 border-t border-white/5">
           <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-black tracking-tighter uppercase">Plan Intelligence</h2>
              <p className="text-sm opacity-40 font-mono tracking-widest">DEEP DIVE INTO PARAMETRIC LOGIC</p>
           </div>
           
           <div className="grid lg:grid-cols-2 gap-12">
              {plans.map((plan) => (
                <div key={plan.id + '-info'} className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-8">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner ${plan.badgeColor}`}>
                         <ShieldIcon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">{plan.badge} CORE</span>
                         <h3 className="text-2xl font-black uppercase tracking-tight">{plan.name} Logic</h3>
                      </div>
                   </div>

                   <div className="flex flex-col gap-4 bg-white/5 p-6 rounded-3xl border border-white/5">
                      <h4 className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Why this plan?</h4>
                      <p className="text-[13px] leading-relaxed opacity-60 italic font-medium">
                        "{plan.reasoning}"
                      </p>
                   </div>

                   <div className="flex flex-col gap-4">
                      <h4 className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Optimized For</h4>
                      <div className="flex flex-wrap gap-2">
                        {plan.whoItsFor.map((w, i) => (
                           <span key={i} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-bold opacity-60">
                              {w}
                           </span>
                        ))}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Trust Footer */}
        <footer className="py-24 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">GigShield</h1>
                <p className="text-sm opacity-40 font-mono tracking-widest">PROVISIONING SMART GIG-RESILIENCE</p>
            </div>
            <div className="flex gap-12">
               <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Protocol</span>
                  <p className="text-xs font-bold opacity-60">Parametric v2.1</p>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Security</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-green-400">
                     <LockIcon className="w-3.5 h-3.5" /> 256-bit Encrypted
                  </div>
               </div>
            </div>
        </footer>
      </div>
    </div>
  );
}
