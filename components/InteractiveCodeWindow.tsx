
import React from 'react';

type Pillar = 'speed' | 'reliability' | 'design';

interface InteractiveCodeWindowProps {
  activePillar: Pillar | null;
}

// Animated Line Component to simulate typing
const TypewriterLine: React.FC<{ children: React.ReactNode; indent?: number; delay?: number; className?: string }> = ({ children, indent = 0, delay = 0, className = '' }) => {
    return (
        <div 
            className={`flex items-center opacity-0 animate-code-line-anim ${className}`} 
            style={{ 
                marginLeft: `${indent * 1.5}rem`,
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards'
            }}
        >
            {children}
        </div>
    );
};

const DefaultCode: React.FC = () => (
    <>
        <TypewriterLine delay={0}><span className="text-purple-400">async</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">fetchData</span>(<span className="text-orange-400">url</span>) {'{'}</TypewriterLine>
        <TypewriterLine indent={1} delay={100}><span className="text-purple-400">try</span> {'{'}</TypewriterLine>
        <TypewriterLine indent={2} delay={200}><span className="text-blue-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-yellow-400">fetch</span>(url);</TypewriterLine>
        <TypewriterLine indent={2} delay={300}><span className="text-blue-400">const</span> data = <span className="text-purple-400">await</span> response.<span className="text-yellow-400">json</span>();</TypewriterLine>
        <TypewriterLine indent={2} delay={400}><span className="text-purple-400">return</span> data;</TypewriterLine>
        <TypewriterLine indent={1} delay={500}>{'}'} <span className="text-purple-400">catch</span> (error) {'{'}</TypewriterLine>
        <TypewriterLine indent={2} delay={600}>console.<span className="text-yellow-400">error</span>(<span className="text-green-400">'Failed to fetch:'</span>, error);</TypewriterLine>
        <TypewriterLine indent={1} delay={700}>{'}'}</TypewriterLine>
        <TypewriterLine delay={800}>{'}'}</TypewriterLine>
    </>
);

const SpeedCode: React.FC = () => (
     <div className="transition-all duration-300">
        <TypewriterLine delay={0}><span className="text-gray-400"># Before Platypus:</span></TypewriterLine>
        <TypewriterLine delay={100} className="opacity-50"><span className="text-blue-400">const</span> <span className="text-cyan-400">squares</span> = [];</TypewriterLine>
        <TypewriterLine delay={200} className="opacity-50"><span className="text-purple-400">for</span> (<span className="text-blue-400">let</span> i = <span className="text-red-400">0</span>; i &lt; <span className="text-red-400">10</span>; i++) {'{'}</TypewriterLine>
        <TypewriterLine indent={1} delay={300} className="opacity-50">squares.<span className="text-yellow-400">push</span>(i * i);</TypewriterLine>
        <TypewriterLine delay={400} className="opacity-50">{'}'}</TypewriterLine>
        <br/>
        <TypewriterLine delay={600}><span className="text-gray-400"># After Platypus (instant):</span></TypewriterLine>
        <TypewriterLine delay={800}><span className="text-blue-400">const</span> <span className="text-cyan-400">squares</span> = Array.<span className="text-yellow-400">from</span>({'{'}length: <span className="text-red-400">10</span>{'}'}, <span className="text-orange-400">(_, i)</span> => i * i); <span className="w-2 h-4 bg-white inline-block animate-code-blink ml-1"></span></TypewriterLine>
     </div>
);

const ReliabilityCode: React.FC = () => (
    <>
        <TypewriterLine delay={0}><span className="text-purple-400">for</span> (<span className="text-blue-400">let</span> i = <span className="text-red-400">0</span>; i &lt;= items.<span className="text-cyan-400">length</span>; i++) {'{'}</TypewriterLine>
        <div className="animate-highlight-fix [animation-delay:1s] rounded">
            <TypewriterLine indent={1} delay={200}>
                <span className="text-gray-400">// Off-by-one error detected</span>
            </TypewriterLine>
        </div>
        <TypewriterLine indent={1} delay={300}><span className="text-yellow-400">processItem</span>(items[i]);</TypewriterLine>
        <TypewriterLine delay={400}>{'}'}</TypewriterLine>
        <br/>
        <TypewriterLine delay={1000}><span className="text-green-400 font-bold">✓ Platypus fix:</span> Changed <span className="text-red-400 font-mono">{'<='}</span> to <span className="text-green-400 font-mono">{'<'}</span></TypewriterLine>
    </>
);

const DesignCode: React.FC = () => (
    <>
        <TypewriterLine delay={0}><span className="text-blue-400">const</span> settings = {'{'}</TypewriterLine>
        <TypewriterLine indent={1} delay={100}><span className="text-cyan-400">timeout</span>: <span className="text-red-400">5000</span>,</TypewriterLine>
        <TypewriterLine indent={1} delay={200}><span className="text-cyan-400">retries</span>: <span className="text-red-400">3</span>,</TypewriterLine>
        <TypewriterLine delay={300}>{'}'};</TypewriterLine>
        <br/>
        <div className="flex items-center">
            <TypewriterLine delay={500}>
                <span className="text-yellow-400">createClient</span>(settings);
            </TypewriterLine>
            <div className="opacity-0 animate-suggestion-slide-in ml-2 p-2 bg-gray-700/80 rounded-md text-xs text-gray-200 border border-gray-600 [animation-delay:0.8s]">
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
        <div className="bg-[#0c0c0c] rounded-lg shadow-2xl border border-gray-800 overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:scale-[1.01]">
            <div className="h-10 bg-[#1F1F1F] flex items-center px-4 flex-shrink-0 justify-between border-b border-gray-800">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[#FF5F56] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#27C93F] rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono">
                    {activePillar ? `${activePillar}.ts` : 'platypus.ts'}
                </div>
            </div>
            <div className="p-6 text-sm md:text-base text-left font-mono text-gray-200 flex-grow relative bg-[#0c0c0c]">
                <div key={activePillar || 'default'}>
                    <pre className="whitespace-pre-wrap">
                        <code>
                            {renderContent()}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default InteractiveCodeWindow;
