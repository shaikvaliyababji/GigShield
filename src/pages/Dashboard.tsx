import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, AlertTriangle,
  CloudRain, Car, Sun, Wind, ShieldCheck,
  History, TrendingUp, Activity,
  ChevronRight, Sparkles, CreditCard,
  CreditCard as PaymentIcon
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/onboarding');
      return;
    }
    const userData = JSON.parse(savedUser);
    setUser(userData);
    fetchPayouts(userData.id);
  }, [navigate]);

  const fetchPayouts = async (userId: string) => {
    setIsLoadingHistory(true);
    try {
      const resp = await fetch(`http://localhost:8080/claims?worker_id=${userId}`);
      if (resp.ok) {
        const data = await resp.json();
        setPayouts(data);
      }
    } catch (e) { 
      console.error("History fetch failed", e); 
      setPayouts([]);
    }
    finally { setIsLoadingHistory(false); }
  };

  if (!user) return null;

  // Derive dynamic stats from user object
  const earningsData = [
    { week: 'W1', value: Math.floor((user.weeklyEarnings || 2000) * 0.7), percentage: 40 },
    { week: 'W2', value: Math.floor((user.weeklyEarnings || 2000) * 0.85), percentage: 65 },
    { week: 'W3', value: Math.floor((user.weeklyEarnings || 2000) * 0.9), percentage: 75 },
    { week: 'W4', value: Math.floor(user.weeklyEarnings || 2000), percentage: 90 }
  ];

  const coverage = [
    { name: 'Heavy rain', status: 'Active', color: 'text-green-400' },
    { name: 'Heatwave', status: 'Active', color: 'text-green-400' },
    { name: 'Pollution (AQI)', status: 'Active', color: 'text-green-400' },
    { name: 'Traffic jam', status: 'Active', color: 'text-green-400' },
    { name: 'Curfew / shutdown', status: (user.tier && user.tier > 2) ? 'Active' : 'Upgrade to Pro', color: (user.tier && user.tier > 2) ? 'text-green-400' : 'text-white/30' },
    { name: 'Flash flood', status: (user.tier && user.tier > 4) ? 'Active' : 'Max only', color: (user.tier && user.tier > 4) ? 'text-green-400' : 'text-white/30' }
  ];

  const getPayoutIcon = (title: string = '') => {
     const t = title.toLowerCase();
     if (t.includes('rain')) return <CloudRain className="w-5 h-5 text-blue-400" />;
     if (t.includes('traffic')) return <Car className="w-5 h-5 text-amber-400" />;
     if (t.includes('heat')) return <Sun className="w-5 h-5 text-orange-400" />;
     if (t.includes('pollution') || t.includes('wind')) return <Wind className="w-5 h-5 text-emerald-400" />;
     return <Activity className="w-5 h-5 text-white/40" />;
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-[#000000] pt-2 px-4 pb-12 lg:pt-4 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-2">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-4">
          </div>
        </header>

        {/* Top Profile Bar */}
        <header className="flex flex-wrap justify-between items-center bg-white/[0.03] border border-white/25 rounded-2xl p-4 lg:p-6 gap-4 relative overflow-hidden">
          {user.paymentStatus === 'PENDING' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/20">
              <div className="h-full bg-amber-500 animate-[shimmer_2s_infinite]" style={{ width: '40%' }} />
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xl uppercase">
              {user.name?.[0]}{user.lastName?.[0]}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight uppercase">{user.name} {user.lastName}</h1>
                <div className={`w-1.5 h-1.5 rounded-full ${user.paymentStatus === 'PAID' ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`}></div>
              </div>
              <p className="text-sm opacity-50 capitalize">{user.platform || 'Partner'} · {user.city || 'Bangalore'} · Member · {user.pincode}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {user.paymentStatus === 'PENDING' && (
              <Link to="/payment-profile" className="flex items-center gap-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all">
                <PaymentIcon className="w-3 h-3" /> PENDING: ₹{user.premium}
              </Link>
            )}
            <Link to="/payment-profile" className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all">
               Payment Profile
            </Link>
            <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
               {user.role === 'ADMIN' ? 'ADMIN OPS' : 
                (user.tier <= 1 ? 'SHIELDLITE' : 
                 user.tier <= 3 ? 'SHIELDPLUS' : 
                 user.tier === 4 ? 'SHIELDPRO' : 'SHIELDMAX')}
            </div>
          </div>
        </header>

        {/* New User Call to Action */}
        {(user.tier === 1 && !user.premium) && (
          <Link to="/plans" className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 flex justify-between items-center group hover:scale-[1.01] transition-all cursor-pointer border border-white/10 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold tracking-tight">Activate Full Coverage</h2>
                <p className="text-sm opacity-80">Pick a plan to start receiving automated payouts for disruptions.</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
          </Link>
        )}

        {/* Alert Banner */}
        <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-5 flex gap-4 items-start relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-amber-500 tracking-tight">
               Sensor monitoring active — {user.city}
            </h3>
            <p className="text-sm opacity-80 leading-relaxed text-amber-200/70">
              GigShield is tracking triggers in your area. Low visibility and rain thresholds are currently at yellow alert.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'THIS WEEK\'S EARNINGS', value: `₹${(user.weeklyEarnings || 0).toLocaleString()}`, sub: 'Verified payout stream', color: 'text-white' },
            { label: 'PAYOUTS RECOVERED', value: `₹${(payouts.length * 350).toLocaleString()}`, sub: `${payouts.length} community triggers`, color: 'text-green-400' },
            { label: 'REPUTATION', value: user.trustScore || '85', sub: 'Calculated by AI', color: 'text-blue-400' },
            { label: 'PREMIUM STATUS', value: user.paymentStatus === 'PAID' ? `₹${user.premium}` : (user.paymentStatus === 'PENDING' ? 'ACTION REQ' : 'NO PLAN'), sub: user.paymentStatus === 'PAID' ? 'Coverage active' : 'Payment pending', color: user.paymentStatus === 'PAID' ? 'text-amber-400' : 'text-red-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/25 rounded-2xl p-5 flex flex-col gap-2 relative group md:hover:bg-white/[0.05] transition-all">
               <span className="text-[9px] font-bold opacity-40 tracking-widest uppercase">{stat.label}</span>
               <div className="flex items-center justify-between">
                 <span className={`text-2xl font-black tracking-tight ${stat.color}`}>{stat.value}</span>
               </div>
               <span className="text-[10px] opacity-40 font-mono">{stat.sub}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white/[0.03] border border-white/25 rounded-3xl p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm tracking-widest opacity-40 uppercase">EARNINGS STABILITY</h3>
            </div>
            <div className="flex flex-col gap-5">
              {earningsData.map((d) => (
                <div key={d.week} className="flex items-center gap-4 group">
                  <span className="text-xs font-mono opacity-40 w-6">{d.week}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500/40 group-last:bg-blue-500 group-last:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-1000" 
                      style={{ width: `${d.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono opacity-80 w-12 text-right">₹{d.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white/[0.03] border border-white/25 rounded-3xl p-8 flex flex-col gap-6">
              <h3 className="font-bold text-sm tracking-widest opacity-40 uppercase">COVERAGE ACTIVE</h3>
              <div className="flex flex-col gap-4">
                {coverage.map((item) => (
                  <div key={item.name} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'Active' ? 'bg-green-500' : 'bg-white/20'}`}></div>
                      <span className={`text-sm ${item.status === 'Active' ? '' : 'opacity-40'}`}>{item.name}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${item.color}`}>
                      {item.status === 'Active' ? '✓ Active' : item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* History Tabs */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
           
           {/* Payout History */}
           <div className="bg-white/[0.03] border border-white/25 rounded-3xl p-8 flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm tracking-widest opacity-40 uppercase">RECENT PROTECTIONS</h3>
                {isLoadingHistory ? <Activity className="w-4 h-4 animate-spin opacity-40" /> : <TrendingUp className="w-4 h-4 text-green-400 opacity-40" />}
              </div>
              <div className="flex flex-col gap-6">
                 {payouts.length > 0 ? payouts.map((p: any, i: number) => (
                    <div key={p.id || i} className="flex justify-between items-center group cursor-pointer hover:bg-white/[0.02] p-4 -m-4 rounded-2xl transition-all border-b border-white/[0.02] last:border-0">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center opacity-80">
                          {getPayoutIcon(p.type || p.title)}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <h4 className="font-bold text-lg">{p.title || (p.type + ' trigger')}</h4>
                          <p className="text-xs opacity-40 font-mono">
                            {p.timestamp ? new Date(p.timestamp).toLocaleDateString() : 'Recent'}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-green-400 font-black text-xl tracking-tight">+₹{p.amount || 350}</span>
                      </div>
                    </div>
                 )) : (
                   <div className="py-12 flex flex-col items-center gap-3 opacity-20 text-center">
                     <History className="w-12 h-12" />
                     <p className="text-xs font-bold uppercase tracking-widest font-mono">No recent triggers</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Billing History */}
           <div className="bg-white/[0.03] border border-white/25 rounded-3xl p-8 flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm tracking-widest opacity-40 uppercase">BILLING & DEPOSITS</h3>
                <CreditCard className="w-4 h-4 opacity-40 text-blue-400" />
              </div>
              <div className="flex flex-col gap-6">
                 {user.premium > 0 ? (
                    <div className="flex justify-between items-center group cursor-pointer hover:bg-white/[0.02] p-4 -m-4 rounded-2xl transition-all relative overflow-hidden">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-xl ${user.paymentStatus === 'PAID' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-amber-500/10 border-amber-500/20'} border flex items-center justify-center`}>
                          <ShieldCheck className={`w-5 h-5 ${user.paymentStatus === 'PAID' ? 'text-blue-400' : 'text-amber-400'}`} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <h4 className="font-bold text-lg">SHIELD ACTIVATION</h4>
                          <p className="text-xs opacity-40 font-mono">
                            {user.paymentStatus === 'PAID' ? `Paid on ${new Date(user.lastPaymentDate).toLocaleDateString()}` : 'Payment Required to Activate'}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-white font-black text-xl tracking-tight">₹{user.premium}</span>
                        {user.paymentStatus === 'PAID' ? (
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                            SUCCESS
                          </span>
                        ) : (
                          <button 
                            onClick={() => navigate('/payment-profile')}
                            className="bg-amber-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                          >
                            PAY NOW
                          </button>
                        )}
                      </div>
                    </div>
                 ) : (
                    <div className="py-12 flex flex-col items-center gap-3 opacity-20 text-center">
                      <History className="w-12 h-12" />
                      <p className="text-xs font-bold uppercase tracking-widest font-mono">No billing history</p>
                    </div>
                 )}
              </div>
           </div>

        </div>

        <footer className="py-12 flex justify-between items-center border-t border-white/5">
            <div />
            <h1 className="text-2xl font-bold tracking-tighter">GigShield</h1>
        </footer>
      </div>
    </div>
  );
}
