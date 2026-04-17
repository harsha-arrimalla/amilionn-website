import { useEffect, useState, useRef, useCallback } from 'react';
import { MILESTONES } from '../data/content';

// IDs of states where Amilionn operates
const ACTIVE_STATE_IDS = new Set([
  'ap', // Andhra Pradesh
  'ar', // Arunachal Pradesh
  'br', // Bihar
  'ct', // Chhattisgarh
  'hp', // Himachal Pradesh
  'jh', // Jharkhand
  'rj', // Rajasthan
  'tg', // Telangana
  'up', // Uttar Pradesh
  'wb', // West Bengal
]);

// Map state names to svg-map IDs
const NAME_TO_ID = {
  'Andhra Pradesh': 'ap',
  'Arunachal Pradesh': 'ar',
  'Bihar': 'br',
  'Chhattisgarh': 'ct',
  'Himachal Pradesh': 'hp',
  'Jharkhand': 'jh',
  'Rajasthan': 'rj',
  'Telangana': 'tg',
  'Uttar Pradesh': 'up',
  'West Bengal': 'wb',
};

// Pre-compute projects per state
const PROJECTS_BY_STATE = {};
MILESTONES.forEach(m => {
  const id = NAME_TO_ID[m.state];
  if (!id) return;
  if (!PROJECTS_BY_STATE[id]) PROJECTS_BY_STATE[id] = [];
  PROJECTS_BY_STATE[id].push(m);
});

const CATEGORY_COLORS = {
  eGovernance: '#3b82f6',
  GIS: '#10b981',
  'Land Records': '#f59e0b',
  Telecom: '#8b5cf6',
  WIA: '#06b6d4',
  Education: '#f43f5e',
};

export default function IndiaMapSVG({ isInView = false }) {
  const [mapData, setMapData] = useState(null);
  const [hovered, setHovered] = useState(null); // { id, name, x, y }
  const containerRef = useRef(null);

  useEffect(() => {
    import('@svg-maps/india').then(m => setMapData(m.default));
  }, []);

  const handleMouseEnter = useCallback((e, loc) => {
    if (!ACTIVE_STATE_IDS.has(loc.id)) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHovered({ id: loc.id, name: loc.name, x, y });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!hovered) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setHovered(prev => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
  }, [hovered]);

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
  }, []);

  if (!mapData) return <div className="w-full aspect-[612/696]" />;

  const projects = hovered ? PROJECTS_BY_STATE[hovered.id] || [] : [];

  // Tooltip positioning: keep it within bounds
  const tooltipStyle = hovered ? {
    left: `${Math.min(hovered.x + 16, (containerRef.current?.clientWidth || 400) - 240)}px`,
    top: `${Math.max(hovered.y - 20, 0)}px`,
  } : {};

  return (
    <div ref={containerRef} className="relative w-full aspect-[612/696]" onMouseMove={handleMouseMove}>
      <svg
        viewBox={mapData.viewBox}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={mapData.label}
      >
        <defs>
          <filter id="activeShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#2563eb" floodOpacity="0.25" />
          </filter>
          <filter id="hoverGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Render all states */}
        {mapData.locations.map((loc, i) => {
          const isActive = ACTIVE_STATE_IDS.has(loc.id);
          const isHovered = hovered?.id === loc.id;

          return (
            <g key={loc.id}>
              <path
                d={loc.path}
                fill={isHovered ? '#bfdbfe' : isActive ? '#dbeafe' : '#f1f5f9'}
                stroke={isHovered ? '#1d4ed8' : isActive ? '#2563eb' : '#cbd5e1'}
                strokeWidth={isHovered ? '1.8' : isActive ? '1.2' : '0.5'}
                filter={isHovered ? 'url(#hoverGlow)' : isActive ? 'url(#activeShadow)' : undefined}
                className={`transition-all duration-300 ${isActive ? 'cursor-pointer' : ''}`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'scale(1)' : 'scale(0.98)',
                  transformOrigin: 'center',
                  transition: `opacity 0.5s ${0.1 + i * 0.04}s, transform 0.6s ${0.1 + i * 0.04}s, fill 0.2s, stroke 0.2s, stroke-width 0.2s`,
                }}
                onMouseEnter={(e) => handleMouseEnter(e, loc)}
                onMouseLeave={handleMouseLeave}
              />

              {/* Pulsing dot for active states */}
              {isActive && loc.path && (() => {
                const match = loc.path.match(/[Mm]\s*([\d.]+)[,\s]+([\d.]+)/);
                if (!match) return null;
                const x = parseFloat(match[1]);
                const y = parseFloat(match[2]);
                return (
                  <g
                    className="pointer-events-none"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.5s ${0.6 + i * 0.05}s`,
                    }}
                  >
                    {isInView && (
                      <circle cx={x + 8} cy={y + 8} r="3" fill="none" stroke="#2563eb" strokeWidth="0.8" opacity="0">
                        <animate attributeName="r" from="3" to="14" dur="2.5s" begin={`${1 + i * 0.2}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" begin={`${1 + i * 0.2}s`} repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={x + 8}
                      cy={y + 8}
                      r={isHovered ? '4' : '3'}
                      fill={isHovered ? '#1d4ed8' : '#2563eb'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })()}
            </g>
          );
        })}
      </svg>

      {/* HTML Tooltip overlay */}
      {hovered && projects.length > 0 && (
        <div
          className="absolute z-30 pointer-events-none animate-in fade-in duration-150"
          style={tooltipStyle}
        >
          <div className="bg-neutral-900 text-white rounded-xl shadow-2xl shadow-black/30 py-3 px-4 min-w-[220px] max-w-[280px]">
            {/* State name header */}
            <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="font-heading font-bold text-[13px] text-white">{hovered.name}</span>
              <span className="ml-auto text-[10px] font-mono text-neutral-400">{projects.length} project{projects.length > 1 ? 's' : ''}</span>
            </div>

            {/* Project list */}
            <div className="flex flex-col gap-2">
              {projects.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {/* Category dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[p.category] || '#94a3b8' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-white/90 font-medium leading-snug">{p.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-neutral-400 font-mono">{p.year}</span>
                      <span className="text-[10px] text-neutral-500">&middot;</span>
                      <span className="text-[10px] font-medium" style={{ color: CATEGORY_COLORS[p.category] || '#94a3b8' }}>
                        {p.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="absolute -left-1.5 top-5 w-3 h-3 bg-neutral-900 rotate-45" />
        </div>
      )}
    </div>
  );
}
