import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Wallet, ShieldAlert, Map, Settings, 
  Search, Filter, ArrowLeft, TrendingUp,
  AlertTriangle, MoreVertical, LayoutDashboard,
  Zap, Users2, Thermometer, CloudRain,
  Wind, Navigation, Globe, Activity,
  MapPin
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type Tab = 'overview' | 'workers' | 'payouts' | 'plans' | 'fraud' | 'zones' | 'fleet' | 'settings';

const API_URL = "http://localhost:8080";

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/onboarding');
      return;
    }
    const userData = JSON.parse(savedUser);
    if (userData.role !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }
    setUser(userData);
  }, [navigate]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'workers', label: 'Workers', icon: <Users className="w-4 h-4" /> },
    { id: 'payouts', label: 'Payouts', icon: <Wallet className="w-4 h-4" /> },
    { id: 'plans', label: 'Plans', icon: <Zap className="w-4 h-4" /> },
    { id: 'fraud', label: 'Fraud Detection', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'zones', label: 'Zones & Risk', icon: <Map className="w-4 h-4" /> },
    { id: 'fleet', label: 'Fleet / B2B', icon: <Users2 className="w-4 h-4" /> },
    { id: 'settings', label: 'AI Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-[#000000] flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 flex flex-col gap-8 p-6 sticky top-0 h-screen bg-[#000000]">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black tracking-tighter uppercase">GigShield <span className="text-[10px] text-white/40 border border-white/20 px-2 py-0.5 rounded-full lowercase ml-1">Admin</span></h1>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                ${activeTab === tab.id ? 'bg-white/[0.08] text-white border border-white/10' : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity p-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
             <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">System Status</p>
             <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Healthy · All Nodes Online
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black tracking-tight capitalize">{activeTab}</h2>
            <p className="text-sm opacity-40">System Control Center · Real-time monitoring</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-30" />
              <input 
                type="text" 
                placeholder="Search workers, claims, zones..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-white/30 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
               <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-[10px] text-blue-400">
                  {user.name?.[0]}
               </div>
               <span className="text-[10px] font-bold uppercase opacity-60">{user.name}</span>
            </div>
          </div>
        </header>

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'workers' && <WorkersTab />}
        {activeTab === 'payouts' && <PayoutsTab />}
        {activeTab === 'plans' && <PlansTab />}
        {activeTab === 'fraud' && <FraudTab />}
        {activeTab === 'zones' && <ZonesTab />}
        {activeTab === 'fleet' && <FleetTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
}

function OverviewTab() {
  const [stats, setStats] = useState({ workers: 0, payouts: 0, activeClaims: 0, riskZones: 3 });

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const [wRes, cRes] = await Promise.all([
          fetch(`${API_URL}/workers`),
          fetch(`${API_URL}/claims`)
        ]);
        const workers = await wRes.json();
        const claims = await cRes.json();
        setStats({
          workers: workers.length,
          payouts: claims.reduce((acc: number, c: any) => acc + (c.amount || 350), 0),
          activeClaims: claims.filter((c: any) => c.status === 'PAID').length,
          riskZones: 3
        });
      } catch (e) { console.error(e); }
    };
    fetchOverview();
  }, []);

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL PARTNERS', value: stats.workers, sub: '↑ 12% vs last mo', color: 'text-white' },
          { label: 'TOTAL RECOVERY', value: `₹${stats.payouts.toLocaleString()}`, sub: 'Claims distributed', color: 'text-green-400' },
          { label: 'ACTIVE PROTECTIONS', value: stats.activeClaims, sub: 'Real-time triggers', color: 'text-blue-400' },
          { label: 'HIGH RISK ZONES', value: stats.riskZones, sub: 'Alert level: Amber', color: 'text-amber-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/25 rounded-2xl p-5 flex flex-col gap-1">
             <span className="text-[9px] font-bold opacity-40 tracking-widest uppercase">{stat.label}</span>
             <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
             <span className="text-[10px] opacity-40 font-mono italic">{stat.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
           <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold opacity-40 tracking-widest uppercase">Platform distribution</h3>
              <TrendingUp className="w-4 h-4 text-green-400 opacity-60" />
           </div>
           <div className="flex flex-col gap-4">
              {[
                { name: 'ZOMATO', percentage: 48, count: Math.floor(stats.workers * 0.48), color: 'bg-[#E23744]' },
                { name: 'SWIGGY', percentage: 32, count: Math.floor(stats.workers * 0.32), color: 'bg-[#FC8019]' },
                { name: 'PORTER', percentage: 12, count: Math.floor(stats.workers * 0.12), color: 'bg-blue-500' },
                { name: 'DUNZO', percentage: 8, count: Math.floor(stats.workers * 0.08), color: 'bg-emerald-500' },
              ].map((p) => (
                <div key={p.name} className="flex flex-col gap-2">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="opacity-60">{p.name}</span>
                      <span>{p.percentage}% ({p.count})</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${p.color}`} style={{ width: `${p.percentage}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function WorkersTab() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/workers`)
      .then(r => r.json())
      .then(d => setWorkers(d))
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
       <div className="flex flex-wrap gap-4 items-center bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-bold opacity-40 px-2 min-w-[100px]">
             <Filter className="w-3.5 h-3.5" /> Filter by
          </div>
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-white/30 text-white">
            <option className="bg-black">All Plans</option>
            <option className="bg-black">ShieldLite</option>
            <option className="bg-black">ShieldPlus</option>
          </select>
       </div>

       <div className="bg-white/[0.03] border border-white/25 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                <th className="px-8 py-6">ID / Name</th>
                <th className="px-8 py-6">Platform / City</th>
                <th className="px-8 py-6">Trust Score</th>
                <th className="px-8 py-6">Weekly Earnings</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
               {isLoading ? (
                 <tr><td colSpan={5} className="px-8 py-12 text-center opacity-40 font-mono">Loading partner data...</td></tr>
               ) : workers.map((worker) => (
                 <tr key={worker.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                   <td className="px-8 py-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold uppercase">{worker.name} {worker.lastName}</span>
                        <span className="text-xs opacity-40 font-mono tracking-tighter">{worker.id}</span>
                      </div>
                   </td>
                   <td className="px-8 py-6">
                      <div className="flex flex-col gap-0.5">
                         <span className="capitalize font-bold">{worker.platform}</span>
                         <span className="text-[10px] opacity-40">{worker.city} · {worker.pincode}</span>
                      </div>
                   </td>
                   <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          (worker.tier || 1) <= 1 ? 'bg-green-400' : 
                          (worker.tier || 1) <= 3 ? 'bg-blue-400' : 
                          (worker.tier || 1) === 4 ? 'bg-amber-400' : 'bg-red-400'
                        }`}></div>
                        <span className="font-bold">
                           {(worker.tier || 1) <= 1 ? 'ShieldLite' : 
                            (worker.tier || 1) <= 3 ? 'ShieldPlus' : 
                            (worker.tier || 1) === 4 ? 'ShieldPro' : 'ShieldMax'}
                        </span>
                      </div>
                   </td>
                   <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         <div className="w-10 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: `${worker.trustScore || 85}%` }}></div>
                         </div>
                         <span className="font-mono font-bold text-green-400">{worker.trustScore || 85}</span>
                      </div>
                   </td>
                   <td className="px-8 py-6">
                      <span className="font-mono font-bold text-white/80">₹{(worker.weeklyEarnings || 0).toLocaleString()}</span>
                   </td>
                   <td className="px-8 py-6 text-right">
                      <button className="p-2 opacity-40 hover:opacity-100 transition-opacity">
                         <MoreVertical className="w-4 h-4" />
                      </button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
       </div>
    </div>
  );
}

function PayoutsTab() {
  const [claims, setClaims] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/claims`)
      .then(r => r.json())
      .then(d => setClaims(d))
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
       <div className="bg-white/[0.03] border border-white/25 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-sm font-bold opacity-40 tracking-widest uppercase">Live Trigger Panel</h3>
             <div className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                AI Verification Stream Active
             </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
             {[
               { icon: <CloudRain className="w-5 h-5 text-blue-400" />, name: 'Rain', count: claims.length, amount: `₹${claims.length * 350}`, status: 'Auto' },
               { icon: <Thermometer className="w-5 h-5" />, name: 'Heatwave', count: 0, amount: '₹0', status: 'Idle' },
               { icon: <Wind className="w-5 h-5 text-emerald-400" />, name: 'Pollution', count: 0, amount: '₹0', status: 'Idle' },
               { icon: <Navigation className="w-5 h-5 text-blue-400" />, name: 'Traffic', count: 0, amount: '₹0', status: 'Idle' },
               { icon: <AlertTriangle className="w-5 h-5 text-red-500" />, name: 'Flash Flood', count: 0, amount: '₹0', status: 'Idle' },
               { icon: <Activity className="w-5 h-5" />, name: 'Others', count: 0, amount: '₹0', status: 'Idle' },
             ].map((trigger, i) => (
               <div key={i} className={`flex flex-col gap-4 p-5 rounded-2xl border transition-all
                 ${trigger.count > 0 ? 'bg-white/[0.08] border-white/40' : 'bg-white/[0.02] border-white/10 opacity-20'}`}>
                  <div className="flex justify-between items-start">
                    {trigger.icon}
                    <span className="text-[8px] font-mono font-bold opacity-40 uppercase">{trigger.status}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold opacity-60 uppercase">{trigger.name}</span>
                    <span className="text-xl font-black">{trigger.count}</span>
                    <span className="text-[10px] text-green-400/80 font-bold">{trigger.amount}</span>
                  </div>
               </div>
             ))}
          </div>
       </div>

       <div className="bg-white/[0.03] border border-white/25 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                <th className="px-8 py-6">Claim Reference</th>
                <th className="px-8 py-6">Partner ID</th>
                <th className="px-8 py-6">Event Type</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
               {isLoading ? (
                 <tr><td colSpan={5} className="px-8 py-12 text-center opacity-40 font-mono">Loading payout history...</td></tr>
               ) : claims.length > 0 ? claims.map((claim) => (
                 <tr key={claim.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                    <td className="px-8 py-6">
                       <span className="font-mono text-xs opacity-60">{claim.id.split('-')[0]}...</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className="font-bold text-xs uppercase tracking-tighter">{claim.workerId}</span>
                    </td>
                    <td className="px-8 py-6 uppercase font-bold text-[10px] tracking-widest">
                       {claim.type || 'RAIN TRIGGER'}
                    </td>
                    <td className="px-8 py-6 font-black text-green-400">
                       ₹{claim.amount || 350}
                    </td>
                    <td className="px-8 py-6 text-right">
                       <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {claim.status}
                       </span>
                    </td>
                 </tr>
               )) : (
                 <tr><td colSpan={5} className="px-8 py-24 text-center opacity-20 font-bold uppercase tracking-[0.2em]">No automated payouts yet</td></tr>
               )}
            </tbody>
          </table>
       </div>
    </div>
  );
}

function PlansTab() {
  const plans = [
    { name: 'ShieldLite', premium: '15', payout: '500', cap: '2/wk', color: 'text-green-400' },
    { name: 'ShieldPlus', premium: '25', payout: '1200', cap: '3/wk', color: 'text-blue-400' },
    { name: 'ShieldPro', premium: '35', payout: '2000', cap: '4/wk', color: 'text-amber-400' },
    { name: 'ShieldMax', premium: '50', payout: '3500', cap: '5/wk', color: 'text-red-400' },
    { name: 'ShieldFamily', premium: '45', payout: '2500', cap: '4/wk', color: 'text-orange-400' },
    { name: 'ShieldFleet', premium: '18', payout: '1500', cap: '3/wk', color: 'text-purple-400' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
       <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white/[0.03] border border-white/25 rounded-3xl p-8 flex flex-col gap-6">
               <div className="flex justify-between items-start">
                  <h3 className={`text-xl font-black ${plan.color}`}>{plan.name}</h3>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Premium</span>
                    <span className="font-bold text-lg">₹{plan.premium}/wk</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Max Payout</span>
                    <span className="font-bold text-lg">₹{plan.payout}</span>
                  </div>
               </div>
               <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-2">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <span className="text-xs font-bold opacity-60">Status: Active</span>
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

function FraudTab() { return <div className="p-24 text-center opacity-20 font-bold uppercase tracking-[0.2em] animate-pulse">Monitoring Real-time Fraud Vectors...</div>; }
function MapReloader({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

function ZonesTab() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.3850, 78.4867]); // Hyderabad


  useEffect(() => {
    const autoPopulateZones = async () => {
      setLoading(true);
      try {
        const resp = await fetch(`${API_URL}/workers`);
        const workers = await resp.json();
        
        // Extract unique cities from workers
        const uniqueCities = Array.from(new Set(workers.map((w: any) => w.city).filter(Boolean)));
        
        const autoZones: any[] = [];
        
        for (const city of uniqueCities) {
          try {
            // 1. Geocode location via Nominatim
            const geoResp = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city as string)}&format=json&limit=1`);
            const geoData = await geoResp.json();
            if (!geoData.length) continue;
            
            const { lat, lon, display_name } = geoData[0];
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lon);

            // 2. Fetch live weather via Open-Meteo
            const weatherResp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code`);
            const weatherData = await weatherResp.json();
            
            const weather = {
              temperature: weatherData.current.temperature_2m,
              humidity: weatherData.current.relative_humidity_2m,
              precipitation: weatherData.current.precipitation,
              wind_speed: weatherData.current.wind_speed_10m,
              weather_code: weatherData.current.weather_code
            };

            const risk = calculateRisk(weather);

            autoZones.push({
              id: Math.random().toString(36).substr(2, 9),
              name: `${city} Node`,
              location: city,
              type: 'Logistics',
              coords: [latitude, longitude],
              weather,
              risk,
              full_address: display_name,
              timestamp: new Date().toLocaleTimeString()
            });

            // Compliance with Nominatim rate limits (1 req/sec)
            await new Promise(r => setTimeout(r, 1000));
          } catch (err) {
            console.error(`Failed to process city: ${city}`, err);
          }
        }

        if (autoZones.length > 0) {
          setZones(autoZones);
          setMapCenter(autoZones[0].coords);
        }
      } catch (e) {
        console.error("Auto-population failed", e);
      } finally {
        setLoading(false);
      }
    };

    autoPopulateZones();
  }, []);

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-500/20';
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-500/20';
      default: return 'text-green-400 bg-green-400/10 border-green-500/20';
    }
  };

  const calculateRisk = (weather: any) => {
    const temp = weather.temperature;
    const rain = weather.precipitation;
    const wind = weather.wind_speed;

    if (rain > 5 || temp > 40 || wind > 25) return 'High';
    if (rain > 1 || temp > 35 || wind > 15) return 'Medium';
    return 'Low';
  };


  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-20">



      <div className="grid lg:grid-cols-12 gap-8 min-h-[600px]">
         {/* Live Map Panel */}
         <div className="lg:col-span-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2 pointer-events-none">
               <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex items-center gap-4">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black opacity-40 uppercase tracking-widest">Map Source</span>
                     <span className="text-[11px] font-bold">OSM · Open-Meteo Integration</span>
                  </div>
                  <div className="h-6 w-px bg-white/10"></div>
                  <div className="flex items-center gap-2">
                     <Activity className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                     <span className="text-[11px] font-mono opacity-60">SYST_ACTIVE</span>
                  </div>
               </div>
            </div>

            <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%', background: '#0a0a0a' }} zoomControl={false}>
               <TileLayer
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                 url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
               />
               {zones.map((zone) => (
                 <Marker key={zone.id} position={zone.coords}>
                    <Popup className="dark-popup">
                       <div className="p-3 flex flex-col gap-3 min-w-[200px]">
                          <div className="flex justify-between items-start">
                             <span className="font-black text-xs uppercase tracking-tight">{zone.name}</span>
                             <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getRiskColor(zone.risk)}`}>{zone.risk}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                             <div className="bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col gap-0.5">
                                <span className="text-[8px] opacity-40 uppercase font-bold">Temp</span>
                                <span className="font-black text-sm">{zone.weather.temperature}°C</span>
                             </div>
                             <div className="bg-white/5 p-2 rounded-xl border border-white/5 flex flex-col gap-0.5">
                                <span className="text-[8px] opacity-40 uppercase font-bold">Rain</span>
                                <span className="font-black text-sm">{zone.weather.precipitation}mm</span>
                             </div>
                          </div>
                          <p className="text-[9px] opacity-40 leading-snug">{zone.full_address}</p>
                       </div>
                    </Popup>
                 </Marker>
               ))}
               <MapReloader center={mapCenter} />
            </MapContainer>
         </div>

         {/* Zone Feed Panel */}
         <div className="lg:col-span-4 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex justify-between items-center px-2">
               <h4 className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Active Intelligence Feed</h4>
               {loading && (
                 <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-blue-400 animate-ping"></div>
                    <span className="text-[9px] font-black text-blue-400/60 uppercase">Syncing...</span>
                 </div>
               )}
            </div>
            {zones.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-3xl p-12 text-center">
                 <Globe className="w-12 h-12 opacity-10 mb-4" />
                 <p className="text-sm opacity-20 font-bold uppercase tracking-widest">No zones registered.<br />Add a zone to monitor risk.</p>
              </div>
            ) : zones.map((zone) => (
              <div key={zone.id} onClick={() => setMapCenter(zone.coords)} className="group cursor-pointer bg-white/[0.03] border border-white/10 hover:border-white/30 p-5 rounded-[2rem] flex flex-col gap-4 transition-all">
                 <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0.5">
                       <span className="text-[10px] opacity-30 font-bold uppercase tracking-widest">{zone.type}</span>
                       <h5 className="text-xl font-black uppercase tracking-tight">{zone.name}</h5>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getRiskColor(zone.risk)} shadow-inner`}>
                       {zone.risk} Risk
                    </div>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                       <Thermometer className="w-4 h-4 opacity-30" />
                       <span className="text-sm font-black">{zone.weather.temperature}°</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-400">
                       <CloudRain className="w-4 h-4 opacity-60" />
                       <span className="text-sm font-black">{zone.weather.precipitation}mm</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-40 italic">
                       <Wind className="w-4 h-4" />
                       <span className="text-[10px] font-bold">{zone.weather.wind_speed}km/h</span>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2 opacity-30">
                       <MapPin className="w-3 h-3" />
                       <span className="text-[9px] font-mono uppercase truncate max-w-[120px]">{zone.location}</span>
                    </div>
                    <span className="text-[9px] font-bold opacity-30 font-mono italic">{zone.timestamp}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
function FleetTab() { return <div className="p-24 text-center opacity-20 font-bold uppercase tracking-[0.2em]">B2B Logistics Interface</div>; }
function SettingsTab() { return <div className="p-24 text-center opacity-20 font-bold uppercase tracking-[0.2em]">Core Algorithm Weights</div>; }
