import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Terminal, Network, Cpu, Sun, Moon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Navbar Morphing
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
          className: 'scrolled-nav',
          targets: '#island-nav'
        }
      });

      // 2. Hero Animation
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // 3. Manifesto Reveal
      gsap.from('.manifesto-text', {
        scrollTrigger: {
          trigger: '#manifesto',
          start: 'top 70%'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });


      // 4. Stacking Protocol Archive
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i !== cards.length - 1) { // Apply to all but the last
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.5,
            filter: 'blur(5px)',
            scrollTrigger: {
              trigger: card,
              start: 'top top+=80',
              end: () => `+=${card.offsetHeight}`,
              scrub: true,
              pin: true,
              pinSpacing: false
            }
          });
        } else {
           ScrollTrigger.create({
              trigger: card,
              start: 'top top+=80',
              end: () => `+=${card.offsetHeight}`,
              pin: true,
              pinSpacing: false
            });
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background font-heading text-foreground">
      <div className="noise-overlay"></div>

      {/* NAVBAR */}
      <nav id="island-nav" className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-5xl rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between z-50 transition-all duration-500 bg-transparent border border-transparent [&.scrolled-nav]:bg-surface/80 [&.scrolled-nav]:backdrop-blur-xl [&.scrolled-nav]:border-slate/50 [&.scrolled-nav]:shadow-glow">
        <div className="font-heading font-bold text-[0.7rem] sm:text-sm md:text-xl tracking-normal text-foreground flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
            Logic Lane Automation. <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase font-bold text-foreground/80">
          <a href="#features" className="hover:text-accent transition-colors hover:-translate-y-px transform block">Capabilities</a>
          <a href="#protocol" className="hover:text-accent transition-colors hover:-translate-y-px transform block">Protocol</a>
          <a href="#portfolio" className="hover:text-accent transition-colors hover:-translate-y-px transform block">Portfolio</a>
          <a href="#pricing" className="hover:text-accent transition-colors hover:-translate-y-px transform block">Connect</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLightMode(prev => !prev)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border border-slate/50 text-foreground/60 hover:text-accent hover:border-accent/50 transition-all text-xs font-mono"
            aria-label="Toggle theme"
          >
            {isLightMode ? <Moon size={14} /> : <Sun size={14} />}
            <span className="hidden md:inline">{isLightMode ? 'Dark' : 'Light'}</span>
          </button>
        <button className="btn-sliding overflow-hidden rounded-full font-heading font-semibold text-xs md:text-sm px-4 md:px-6 py-2 md:py-2.5 bg-foreground text-background flex items-center gap-2 transition-transform hover:scale-[1.03] active:scale-95 shadow-sm">
          <span className="slide-bg bg-accent"></span>
          <span className="content flex items-center gap-2">Book a call <ArrowRight size={16} /></span>
        </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[100dvh] w-full flex items-end pb-16 md:pb-24 px-6 md:px-16 overflow-hidden bg-background">
        {/* Abstract Glowing Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#38BDF8]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50 z-10"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundSize: '60px 60px', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)' }}></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-4">
          <div className="hero-reveal font-mono text-accent text-sm md:text-md uppercase tracking-[0.2em] font-bold mb-4 bg-accent/10 w-fit px-4 py-2 rounded-full border border-accent/30 flex items-center gap-3">
             <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span> Signal: Online
          </div>
          <h1 className="hero-reveal font-heading font-black tracking-tight text-3xl sm:text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.1] text-foreground">
            AUTOMATE WORKFLOWS.
          </h1>
          <h2 className="hero-reveal font-drama italic text-4xl sm:text-6xl md:text-[7rem] lg:text-[8.5rem] leading-[0.9] text-foreground mt-2 tracking-tighter flex flex-wrap items-end pb-6">
            scale <span className="text-accent inline-block ml-2 md:ml-4 font-mono font-bold not-italic tracking-tight typing-efficiency whitespace-nowrap border-r-4 border-accent uppercase">efficiency.</span>
          </h2>
          <div className="hero-reveal mt-8 md:mt-12 flex items-center gap-4 md:gap-6">
            <button className="btn-sliding overflow-hidden rounded-full font-heading font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-accent text-foreground flex items-center gap-3 transition-transform hover:scale-[1.03] active:scale-95 shadow-glow">
              <span className="slide-bg bg-foreground"></span>
              <span className="content flex items-center gap-3 text-background">Initialize System <ArrowRight size={20} /></span>
            </button>
            <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 hidden md:block max-w-[200px] leading-relaxed">
              &gt; Handing off manual logic to algorithmic control loops.
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-16 md:py-32 px-6 md:px-8 w-full max-w-7xl mx-auto bg-background relative z-20">
        <div className="font-mono text-foreground/50 font-bold text-xs mb-16 tracking-widest uppercase border-l-2 border-accent pl-4">System Capabilities //</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Diagnostic Shuffler */}
          <div className="bg-surface border border-slate/50 rounded-[2rem] p-8 flex flex-col h-[400px] relative overflow-hidden group shadow-lg transition-transform hover:-translate-y-2">
            <div className="relative z-10">
              <Cpu className="text-accent mb-6 bg-accent/10 p-2 rounded-xl border border-accent/20" size={48} />
              <h3 className="font-heading font-bold text-2xl mb-2 text-foreground tracking-tight">Flawless Web Experiences</h3>
              <p className="font-mono text-sm text-foreground/60 leading-relaxed">
                Websites that feel alive. We build lightning-fast, premium web experiences that turn your visitors into clients.
              </p>
            </div>
            {/* Shuffler UI */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[200px] flex flex-col gap-3 opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
               <div className="bg-background border border-slate/50 p-4 rounded-xl flex items-center gap-4 translate-y-8 group-hover:-translate-y-4 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">React 19 Protocol</span>
               </div>
               <div className="bg-background border border-slate/50 p-4 rounded-xl flex items-center gap-4 translate-y-16 group-hover:-translate-y-8 transition-transform duration-700 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-foreground/50"></div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">GSAP Animation Layer</span>
               </div>
               <div className="bg-background border border-slate/50 p-4 rounded-xl flex items-center gap-4 translate-y-24 group-hover:-translate-y-12 transition-transform duration-700 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-slate/50"></div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">Tailwind Compiler</span>
               </div>
            </div>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="bg-surface border border-slate/50 rounded-[2rem] p-8 flex flex-col h-[400px] shadow-lg relative overflow-hidden transition-transform hover:-translate-y-2">
            <Network className="text-accent mb-6 bg-accent/10 p-2 rounded-xl border border-accent/20" size={48} />
            <h3 className="font-heading font-bold text-2xl mb-2 text-foreground tracking-tight">Velocity Automations</h3>
            <p className="font-mono text-sm text-foreground/60 leading-relaxed mb-auto">
              Event-driven pipelines connecting APIs before human friction blocks the data flow.
            </p>
            <div className="bg-background border border-slate/50 rounded-xl p-5 mt-8 font-mono text-[10px] text-foreground h-[120px] relative overflow-hidden shadow-inner">
              <div className="absolute top-3 right-4 flex items-center gap-2 text-[10px] text-foreground/40 font-bold uppercase tracking-widest border-b border-foreground/10 pb-1">
                <span className="w-1.5 h-1.5 bg-accent rounded-full pulse-dot"></span> Live Feed
              </div>
              <div className="mt-6 flex flex-col gap-1.5 w-[200%] text-foreground/80">
                <div className="typewriter-text whitespace-nowrap overflow-hidden border-r-2 border-accent text-accent">
                  &gt; Initializing webhook stream...
                </div>
                <div className="text-foreground/50 opacity-0" style={{ animation: 'fadeIn 0.1s forwards 2.2s' }}>
                  &gt; Parsing JSON payload: [200 OK]
                </div>
                <div className="text-foreground/50 opacity-0" style={{ animation: 'fadeIn 0.1s forwards 3s' }}>
                  &gt; Executing system trigger
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Cursor Protocol Scheduler */}
          <div className="bg-surface border border-slate/50 rounded-[2rem] p-8 flex flex-col h-[400px] shadow-lg relative overflow-hidden group transition-transform hover:-translate-y-2">
            <Terminal className="text-accent mb-6 bg-accent/10 p-2 rounded-xl border border-accent/20" size={48} />
            <h3 className="font-heading font-bold text-2xl mb-2 text-foreground tracking-tight">Autonomous AI Agents</h3>
            <p className="font-mono text-sm text-foreground/60 leading-relaxed">
              Self-correcting intelligence executing logic endlessly across all raw data layers.
            </p>
            <div className="mt-auto pt-6 border-t border-slate/50 relative">
               <div className="grid grid-cols-7 gap-1 font-mono text-[10px] text-center opacity-40 group-hover:opacity-100 transition-opacity font-bold">
                 {['S','M','T','W','T','F','S'].map((day, i) => (
                   <div key={i} className={`p-2 rounded flex items-center justify-center border ${i === 3 ? 'bg-accent border-accent text-background scale-110 shadow-glow' : 'bg-background border-slate/30 text-foreground/50'}`}>
                     {day}
                   </div>
                 ))}
               </div>
               <div className="flex justify-between items-center mt-6 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                 <span className="font-mono text-[10px] text-foreground/60 uppercase tracking-widest bg-foreground/5 px-2 py-1 rounded">Sys Update</span>
                 <div className="bg-accent text-background font-mono font-bold text-[10px] px-3 py-1 rounded uppercase tracking-widest shadow-glow">Active</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY (The Manifesto) */}
      <section id="manifesto" className="relative w-full py-24 md:py-48 flex items-center justify-center text-center overflow-hidden border-y border-slate/50 bg-[#060608]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundSize: '100px 100px', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 1) 2px, transparent 2px)' }}></div>
        </div>
        <div className="relative z-10 max-w-5xl px-6 md:px-8 flex flex-col gap-8 md:gap-12">
          <p id="manifesto-agency" className="manifesto-text font-heading text-base md:text-xl font-medium tracking-wide border border-black/10 w-fit mx-auto px-5 md:px-8 py-3 md:py-4 rounded-full bg-white cursor-default shadow-md" style={{color: 'rgb(15 23 42)'}}>
            Most agencies focus on: <br/><span className="font-bold" style={{color: 'rgb(15 23 42)'}}>rigid templates and manual copying.</span>
          </p>
          <p className="manifesto-text font-heading font-black text-3xl md:text-5xl text-foreground leading-tight mt-4 md:mt-8 tracking-tight">
            <span className="text-accent">We focus on:</span> <br/>
            <span className="font-mono font-black tracking-normal text-3xl md:text-[5rem] lg:text-[7rem] mt-4 md:mt-8 flex flex-col items-center uppercase scale-y-[1.05] leading-[1.1]">
              <span className="text-foreground hover:text-accent transition-colors duration-500 cursor-default mb-2">PURE</span>
              <span className="text-accent underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8 decoration-accent/30 pointer-events-none">AUTOMATION.</span>
            </span>
          </p>
        </div>
      </section>

      {/* PROTOCOL - STICKY STACKING ARCHIVE */}
      <section id="protocol" className="relative w-full py-32 bg-background flex flex-col">
        <div className="max-w-7xl mx-auto px-8 w-full mb-16">
           <div className="font-mono text-foreground/50 font-bold text-xs tracking-widest uppercase border-l-2 border-accent pl-4">Deployment Protocol //</div>
        </div>

        <div className="protocol-wrapper relative h-[300vh] w-full max-w-7xl mx-auto px-8">
          
          {/* Card 1: Audit */}
          <div className="protocol-card sticky top-20 md:top-32 w-full h-[65vh] md:h-[70vh] rounded-[2rem] md:rounded-[3rem] bg-surface border border-slate/50 p-6 md:p-12 flex flex-col justify-between shadow-xl overflow-hidden mb-24 z-10">
            <div className="relative z-10">
              <div className="font-mono text-4xl md:text-6xl font-black text-foreground/10 mb-4 md:mb-6 drop-shadow-sm">01</div>
              <h2 className="font-heading font-bold tracking-tight uppercase text-3xl md:text-5xl mb-3 md:mb-4 text-foreground max-w-lg leading-none">Architecture Audit</h2>
              <p className="font-mono text-xs md:text-sm text-foreground/60 max-w-md leading-relaxed">
                We dissect your digital infrastructure to locate raw bottlenecks. Finding prime targets where algorithmic automation replaces manual labor entirely.
              </p>
            </div>
            {/* Spinning Geometric Motif */}
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] opacity-10 border border-foreground rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center pointer-events-none mix-blend-screen">
                <div className="w-[300px] h-[300px] border border-foreground border-dashed rounded-full animate-[spin_15s_linear_reverse_infinite] flex items-center justify-center">
                   <div className="w-[100px] h-[100px] bg-foreground/20 rounded-full blur-xl"></div>
                </div>
            </div>
          </div>

          {/* Card 2: Architect */}
          <div className="protocol-card sticky top-20 md:top-32 w-full h-[65vh] md:h-[70vh] rounded-[2rem] md:rounded-[3rem] bg-surface border border-slate/50 p-6 md:p-12 flex flex-col justify-between shadow-xl overflow-hidden mb-24 z-20">
            <div className="relative z-10">
              <div className="font-mono text-4xl md:text-6xl font-black text-foreground/10 mb-4 md:mb-6 drop-shadow-sm">02</div>
              <h2 className="font-heading font-bold tracking-tight uppercase text-3xl md:text-5xl mb-3 md:mb-4 text-foreground max-w-lg leading-none">Precision Engineering</h2>
              <p className="font-mono text-xs md:text-sm text-foreground/60 max-w-md leading-relaxed">
                We construct flawless React web applications embedded with intelligent agents. A unified ecosystem that scales without human input.
              </p>
            </div>
             {/* Scanning Laser Grid */}
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(rgba(248, 250, 252, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(248, 250, 252, 0.4) 1px, transparent 1px)' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-glow animate-[scan_4s_ease-in-out_infinite]"></div>
             </div>
          </div>

          {/* Card 3: Deploy */}
          <div className="protocol-card sticky top-20 md:top-32 w-full h-[65vh] md:h-[70vh] rounded-[2rem] md:rounded-[3rem] bg-surface border border-slate/50 p-6 md:p-12 flex flex-col justify-between shadow-xl overflow-hidden z-30">
            <div className="relative z-10">
              <div className="font-mono text-4xl md:text-6xl font-black text-accent/20 mb-4 md:mb-6 drop-shadow-sm">03</div>
              <h2 className="font-heading font-bold tracking-tight uppercase text-3xl md:text-5xl mb-3 md:mb-4 text-accent max-w-lg leading-none">Autonomous Deployment</h2>
              <p className="font-mono text-xs md:text-sm text-foreground/60 max-w-md leading-relaxed">
                The instrument goes live. Webhooks fire. Databases sync. Logic Lane takes over your operations, executing silently and flawlessly.
              </p>
            </div>
            {/* Pulsing Core */}
            <div className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 w-40 md:w-80 h-40 md:h-80 border border-foreground/10 rounded-full flex items-center justify-center pointer-events-none">
                <div className="w-28 md:w-56 h-28 md:h-56 border border-foreground/20 rounded-full flex items-center justify-center">
                    <div className="w-16 md:w-32 h-16 md:h-32 bg-accent rounded-full shadow-glow pulse-dot"></div>
                </div>
            </div>
          </div>

        </div>
      </section>

      {/* PORTFOLIO / CASE STUDIES */}
      <section id="portfolio" className="py-16 md:py-32 px-6 md:px-8 w-full max-w-7xl mx-auto bg-background">
        <div className="font-mono text-foreground/50 font-bold text-xs mb-8 md:mb-16 tracking-widest uppercase border-l-2 border-accent pl-4">Digital Architecture //</div>
        <h2 className="font-heading font-black uppercase text-4xl md:text-6xl text-foreground mb-8 md:mb-16 tracking-normal leading-none">
          Selected <span className="text-accent">Works.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Case Study 1 Placeholder */}
           <div className="group cursor-pointer">
              <div className="w-full aspect-video bg-surface border border-slate/50 rounded-[2rem] overflow-hidden mb-6 shadow-md transition-transform group-hover:-translate-y-2 relative flex items-center justify-center">
                 {/* Decorative Placeholder UI */}
                 <div className="absolute inset-0 opacity-10" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, #F8FAFC 1px, transparent 1px)' }}></div>
                 <div className="font-mono text-foreground/30 font-bold text-sm md:text-xl uppercase tracking-widest border border-foreground/20 px-4 md:px-6 py-2 md:py-3 rounded-full group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                    Awaiting Case Study 01
                 </div>
              </div>
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-1 group-hover:text-accent transition-colors">Client Project Alpha</h3>
                    <p className="font-mono text-sm font-bold text-foreground/50">Full-Stack Web App & AI Integration</p>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-foreground/50 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <ArrowRight size={16} className="-rotate-45" />
                 </div>
              </div>
           </div>

           {/* Case Study 2 Placeholder */}
           <div className="group cursor-pointer md:mt-16">
              <div className="w-full aspect-video bg-surface border border-slate/50 rounded-[2rem] overflow-hidden mb-6 shadow-md transition-transform group-hover:-translate-y-2 relative flex items-center justify-center">
                 {/* Decorative Placeholder UI */}
                 <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(rgba(248,250,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,1) 1px, transparent 1px)' }}></div>
                 <div className="font-mono text-foreground/30 font-bold text-sm md:text-xl uppercase tracking-widest border border-foreground/20 px-4 md:px-6 py-2 md:py-3 rounded-full group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                    Awaiting Case Study 02
                 </div>
              </div>
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-1 group-hover:text-accent transition-colors">Digital Automation Pipeline</h3>
                    <p className="font-mono text-sm font-bold text-foreground/50">Custom N8N Flow & React Dashboard</p>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-foreground/50 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <ArrowRight size={16} className="-rotate-45" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* MEMBERSHIP / PRICING & FOOTER */}
      <section id="pricing" className="py-20 md:py-40 px-6 md:px-8 w-full max-w-screen-2xl mx-auto flex flex-col items-center border-t border-slate/50">
         <div className="font-mono text-foreground/50 font-bold text-xs mb-8 tracking-widest uppercase bg-foreground/5 px-4 py-2 rounded-full border border-foreground/10">System Finalization //</div>
         <h2 className="font-heading font-black uppercase text-4xl md:text-7xl lg:text-[6rem] text-center mb-10 md:mb-16 text-foreground tracking-normal leading-[0.9]">
            Ready to <br/><span className="text-accent">scale logic?</span>
         </h2>
         
         <div className="btn-sliding overflow-hidden rounded-full font-heading font-black uppercase tracking-wider text-base md:text-xl px-8 md:px-16 py-5 md:py-8 bg-foreground text-background flex items-center gap-3 md:gap-4 transition-transform hover:scale-[1.03] active:scale-95 shadow-glow cursor-pointer group">
            <span className="slide-bg bg-accent"></span>
            <span className="content flex items-center gap-3 md:gap-4 text-background">Book a Strategy Call <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /></span>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-surface text-foreground px-6 md:px-8 py-12 md:py-20 mt-10 rounded-t-[2rem] md:rounded-t-[3rem] border-t border-slate/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-heading font-black uppercase tracking-normal text-3xl mb-4 flex items-center gap-2">
              Logic Lane Automation. <div className="w-3 h-3 bg-accent animate-pulse shadow-glow mt-1 rounded-full"></div>
            </h3>
            <p className="font-mono text-sm text-foreground/75 max-w-sm mb-8 leading-relaxed">
              Architecting the next generation of automated internet real estate. High-fidelity web dev meets pure AI logic.
            </p>
            <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 w-fit px-4 py-2 rounded border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent pulse-dot"></span>
              Status: 200 OK
            </div>
          </div>
          <div className="flex flex-col gap-4">
             <h4 className="font-mono text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2 border-b border-foreground/20 pb-2">Navigation</h4>
             <a href="#features" className="font-heading font-bold text-sm text-foreground/80 hover:text-accent transition-colors">Capabilities</a>
             <a href="#protocol" className="font-heading font-bold text-sm text-foreground/80 hover:text-accent transition-colors">Protocol</a>
          </div>
          <div className="flex flex-col gap-4">
             <h4 className="font-mono text-xs font-bold text-foreground/50 uppercase tracking-widest mb-2 border-b border-foreground/20 pb-2">Legal</h4>
             <a href="#" className="font-heading font-bold text-sm text-foreground/80 hover:text-accent transition-colors">Privacy Policy</a>
             <a href="#" className="font-heading font-bold text-sm text-foreground/80 hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes typing {
          from { width: 0; border-color: transparent }
          to { width: 100%; border-color: #8B5CF6 }
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scan {
          0% { top: 0% }
          50% { top: 100% }
          100% { top: 0% }
        }
        .pulse-dot {
          animation: customPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes customPulse {
          0%, 100% { opacity: 1; transform: scale(1) }
          50% { opacity: .5; transform: scale(1.3) }
        }
        .typewriter-text {
          animation: typing 2.5s steps(40, end) forwards;
        }
        .typewriter-efficiency {
          animation: typing 2s steps(40, end) forwards;
          animation-delay: 0.5s;
          width: 0;
        }
      `}} />
    </div>
  );
}
