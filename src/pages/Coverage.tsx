import { Link } from 'react-router-dom';
import { ArrowLeft, CloudRain, Sun, Wind, Car, Lock, Waves, Check, X, Info } from 'lucide-react';

export default function Coverage() {
  const disruptions = [
    {
      id: 'rain',
      name: 'Heavy rain',
      trigger: '> 40 mm rainfall',
      payout: '₹200 – ₹700',
      source: 'OpenWeatherMap',
      verified: 'Barometer + GPS',
      time: '< 5 min',
      plans: ['Lite', 'Plus', 'Pro', 'Max', 'Family', 'Fleet'],
      icon: <CloudRain className="w-6 h-6" />
    },
    {
      id: 'heat',
      name: 'Heatwave',
      trigger: 'temp > 42 °C',
      payout: '₹200 – ₹700',
      source: 'OpenWeatherMap',
      verified: 'Weather station',
      time: '< 5 min',
      plans: ['Lite', 'Plus', 'Pro', 'Max', 'Family', 'Fleet'],
      icon: <Sun className="w-6 h-6" />
    },
    {
      id: 'pollution',
      name: 'Air pollution',
      trigger: 'AQI > 350',
      payout: '₹350 – ₹700',
      source: 'AQI API',
      verified: 'Zone air sensor',
      time: '< 5 min',
      plans: ['Plus', 'Pro', 'Max', 'Family', 'Fleet'],
      icon: <Wind className="w-6 h-6" />
    },
    {
      id: 'traffic',
      name: 'Severe traffic',
      trigger: 'speed < 10 km/h',
      payout: '₹350 – ₹700',
      source: 'Google Maps API',
      verified: 'GPS + accelerometer',
      time: '< 5 min',
      plans: ['Plus', 'Pro', 'Max', 'Family', 'Fleet'],
      icon: <Car className="w-6 h-6" />
    },
    {
      id: 'curfew',
      name: 'Curfew / shutdown',
      trigger: 'zone restriction alert',
      payout: '₹500 – ₹700',
      source: 'Govt. alert API',
      verified: 'Zone geo-fence',
      time: '< 5 min',
      plans: ['Pro', 'Max', 'Family', 'Fleet'],
      icon: <Lock className="w-6 h-6" />
    },
    {
      id: 'flood',
      name: 'Flash flood',
      trigger: 'flood zone alert',
      payout: '₹700 only',
      source: 'IMD / flood API',
      verified: 'Multi-layer check',
      time: '< 5 min',
      plans: ['Max'],
      icon: <Waves className="w-6 h-6" />
    }
  ];

  const matrix = [
    { name: 'Heavy rain (>40mm)', lite: true, plus: true, pro: true, max: true, family: true, fleet: true },
    { name: 'Heatwave (>42°C)', lite: true, plus: true, pro: true, max: true, family: true, fleet: true },
    { name: 'Air pollution (AQI>350)', lite: false, plus: true, pro: true, max: true, family: true, fleet: true },
    { name: 'Severe traffic (<10km/h)', lite: false, plus: true, pro: true, max: true, family: true, fleet: true },
    { name: 'Curfew / local shutdown', lite: false, plus: false, pro: true, max: true, family: true, fleet: true },
    { name: 'Flash flood', lite: false, plus: false, pro: false, max: true, family: false, fleet: false },
    { name: 'Dependent buffer (+₹200)', lite: false, plus: false, pro: false, max: false, family: true, fleet: false }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-[#000000] p-6 lg:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <header className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div />
        </header>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter">Coverage Options</h1>
        </div>

        {/* Disruption Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disruptions.map((d) => (
            <div key={d.id} className="border border-white/25 rounded-2xl p-6 bg-white/[0.02] flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  {d.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <p className="text-xs font-mono opacity-50">Trigger: {d.trigger}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-50">Payout range</span>
                  <span className="font-bold">₹{d.payout.replace('₹', '')}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-50">Data source</span>
                  <span className="font-bold">{d.source}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-50">Verified by</span>
                  <span className="font-bold">{d.verified}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-50">Detection time</span>
                  <span className="font-bold">{d.time}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {d.plans.map(p => (
                  <span key={p} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/5 opacity-80">
                    {p === 'Max' ? 'Max only' : p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coverage Matrix */}
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold tracking-tight border-b border-white/25 pb-4">Coverage Matrix — Which Plan Covers What</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/40">
                  <th className="py-4 font-bold opacity-60">Disruption</th>
                  <th className="py-4 font-bold opacity-60 text-center">Lite</th>
                  <th className="py-4 font-bold opacity-60 text-center">Plus</th>
                  <th className="py-4 font-bold opacity-60 text-center">Pro</th>
                  <th className="py-4 font-bold opacity-60 text-center">Max</th>
                  <th className="py-4 font-bold opacity-60 text-center">Family</th>
                  <th className="py-4 font-bold opacity-60 text-center">Fleet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {matrix.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-medium opacity-90">{row.name}</td>
                    {[row.lite, row.plus, row.pro, row.max, row.family, row.fleet].map((val, idx) => (
                      <td key={idx} className="py-4 text-center">
                        {val ? <Check className="w-5 h-5 mx-auto text-white" /> : <span className="opacity-20">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Covered / Not Covered */}
        <div className="grid lg:grid-cols-2 gap-12 py-12 border-t border-white/25">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold opacity-60">Covered (income loss due to)</h3>
            <ul className="flex flex-col gap-3">
              {[
                'Weather disruptions',
                'Extreme heat / heatwave',
                'Hazardous air quality',
                'Severe traffic congestion',
                'Government-imposed curfews',
                'Flash floods (Max plan)'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm opacity-90 border-b border-white/10 pb-2">
                  <Check className="w-4 h-4 text-white shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold opacity-60">Not covered (by design)</h3>
            <ul className="flex flex-col gap-3 text-white/50">
              {[
                'Health or medical expenses',
                'Life insurance',
                'Accident or injury claims',
                'Vehicle or bike repairs',
                'Phone or device damage',
                'Self-reported downtime'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm border-b border-white/10 pb-2">
                  <X className="w-4 h-4 text-white/30 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Descriptive Text */}
        <div className="flex flex-col gap-8 max-w-4xl pb-12 mx-auto">
          <div className="flex items-start gap-4 px-6">
            <Info className="w-6 h-6 shrink-0 opacity-40 mt-1" />
            <div className="flex flex-col gap-6 text-sm leading-relaxed opacity-70">
              <p>Heavy rain and heatwave are the universal baseline — every plan from Lite to Fleet covers these because they are the most common and easily verifiable disruptions across all Indian cities.</p>
              <p>Pollution and traffic are excluded from ShieldLite deliberately. These are harder to attribute to income loss for a new worker with no trust history, and keeping Lite lean reduces the fraud surface for first-time users.</p>
              <p>Curfew coverage starts at Pro because government shutdown events are infrequent but high-value payouts — they're better suited to workers who've already built a trust score with the system.</p>
              <p>Flash flood is ShieldMax-exclusive because it requires the most complex multi-layer verification (barometric, acoustic, GPS cross-check) and carries the highest payout per trigger at ₹700.</p>
              <p>The "not covered" list is a deliberate product boundary — GigShield AI is purely an income protection product, not a general welfare scheme. This keeps the loss ratio predictable and the premiums affordable.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tighter">GigShield</h1>
            <p className="text-sm opacity-40 italic">Smart Parametric Coverage</p>
        </footer>
      </div>
    </div>
  );
}
