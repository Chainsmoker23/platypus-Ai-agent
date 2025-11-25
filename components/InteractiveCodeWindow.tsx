import React from 'react';

type Pillar = 'speed' | 'reliability' | 'design';

interface InteractiveCodeWindowProps {
  activePillar: Pillar | null;
}

const CodeLine: React.FC<{ children: React.ReactNode; indent?: number; className?: string }> = ({ children, indent = 0, className = '' }) => {
    return <div className={className} style={{ marginLeft: `${indent * 1.5}rem` }}>{children}</div>;
};

const DefaultCode: React.FC = () => (
    <>
        <CodeLine><span className="text-purple-400">async</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">fetchData</span>(<span className="text-orange-400">url</span>) {'{'}</CodeLine>
        <CodeLine indent={1}><span className="text-purple-400">try</span> {'{'}</CodeLine>
        <CodeLine indent={2}><span className="text-blue-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-yellow-400">fetch</span>(url);</CodeLine>
        <CodeLine indent={2}><span className="text-blue-400">const</span> data = <span className="text-purple-400">await</span> response.<span className="text-yellow-400">json</span>();</CodeLine>
        <CodeLine indent={2}><span className="text-purple-400">return</span> data;</CodeLine>
        <CodeLine indent={1}>{'}'} <span className="text-purple-400">catch</span> (error) {'{'}</CodeLine>
        <CodeLine indent={2}>console.<span className="text-yellow-400">error</span>(<span className="text-green-400">'Failed to fetch:'</span>, error);</CodeLine>
        <CodeLine indent={1}>{'}'}</CodeLine>
        <CodeLine>{'}'}</CodeLine>
    </>
);

const SpeedCode: React.FC = () => (
     <div className="transition-all duration-300">
        <CodeLine><span className="text-gray-500"># Before Platypus:</span></CodeLine>
        <CodeLine className="opacity-50"><span className="text-blue-400">const</span> <span className="text-cyan-400">squares</span> = [];</CodeLine>
        <CodeLine className="opacity-50"><span className="text-purple-400">for</span> (<span className="text-blue-400">let</span> i = <span className="text-red-400">0</span>; i &lt; <span className="text-red-400">10</span>; i++) {'{'}</CodeLine>
        <CodeLine indent={1} className="opacity-50">squares.<span className="text-yellow-400">push</span>(i * i);</CodeLine>
        <CodeLine className="opacity-50">{'}'}</CodeLine>
        <br/>
        <CodeLine><span className="text-gray-500"># After Platypus (instant):</span></CodeLine>
        <CodeLine className="animate-code-flicker"><span className="text-blue-400">const</span> <span className="text-cyan-400">squares</span> = Array.<span className="text-yellow-400">from</span>({'{'}length: <span className="text-red-400">10</span>{'}'}, <span className="text-orange-400">(_, i)</span> => i * i);</CodeLine>
     </div>
);

const ReliabilityCode: React.FC = () => (
    <>
        <CodeLine><span className="text-purple-400">for</span> (<span className="text-blue-400">let</span> i = <span className="text-red-400">0</span>; i &lt;= items.<span className="text-cyan-400">length</span>; i++) {'{'}</CodeLine>
        <CodeLine indent={1} className="rounded animate-highlight-fix">
            <span className="text-gray-500">// Off-by-one error causes a crash!</span>
        </CodeLine>
        <CodeLine indent={1}><span className="text-yellow-400">processItem</span>(items[i]);</CodeLine>
        <CodeLine>{'}'}</CodeLine>
        <br/>
        <CodeLine className="opacity-0 animate-fade-in-up [animation-delay:1.5s]"><span className="text-green-400 font-bold">✓ Platypus fix:</span> Changed <span className="text-red-400 font-mono">{'<='}</span> to <span className="text-green-400 font-mono">{'<'}</span></CodeLine>
    </>
);

const DesignCode: React.FC = () => (
    <>
        <CodeLine><span className="text-blue-400">const</span> settings = {'{'}</CodeLine>
        <CodeLine indent={1}><span className="text-cyan-400">timeout</span>: <span className="text-red-400">5000</span>,</CodeLine>
        <CodeLine indent={1}><span className="text-cyan-400">retries</span>: <span className="text-red-400">3</span>,</CodeLine>
        <CodeLine>{'}'};</CodeLine>
        <br/>
        <div className="flex items-center">
            <CodeLine>
                <span className="text-yellow-400">createClient</span>(settings);
            </CodeLine>
            <div className="opacity-0 animate-suggestion-slide-in ml-2 p-2 bg-gray-600 rounded-md text-xs text-gray-300 border border-gray-500">
                <p><span className="font-mono font-bold text-cyan-400">settings</span>: {'{ timeout: number, retries: number }'}</p>
            </div>
        </div>
    </>
);

const InteractiveCodeWindow: React.FC<InteractiveCodeWindowProps> = ({ activePillar }) => {
    
    const renderContent = () => {
        switch (activePillar) {
            case 'speed': return <SpeedCode />;
            case 'reliability': return <ReliabilityCode />;
            case 'design': return <DesignCode />;
            default: return <DefaultCode />;
        }
    }

    return (
        <div className="bg-[#282c34] rounded-xl shadow-2xl overflow-hidden h-full flex flex-col transition-all duration-300">
            <div className="h-8 bg-gray-700 flex items-center px-4 flex-shrink-0">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
            </div>
            <div className="p-6 text-sm md:text-base text-left font-mono text-white flex-grow">
                <pre className="whitespace-pre-wrap">
                    <code>
                        {renderContent()}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default InteractiveCodeWindow;