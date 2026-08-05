import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';
import { GitBranch, Circle, Minus, Square, ChevronRight, Folder, FolderOpen } from 'lucide-react';
import Button from '@/components/ui/Button';

// ─── File tree data ─────────────────────────────────────────────────────────
const FILE_TREE = [
  { type: 'folder', name: 'src', level: 0, open: true },
  { type: 'folder', name: 'components', level: 1, open: true },
  { type: 'file', name: 'Navbar.tsx', level: 2, active: false },
  { type: 'file', name: 'HeroSection.tsx', level: 2, active: true },
  { type: 'file', name: 'Button.tsx', level: 2, active: false },
  { type: 'folder', name: 'pages', level: 1, open: false },
  { type: 'file', name: 'Home.tsx', level: 2, active: false },
  { type: 'file', name: 'About.tsx', level: 2, active: false },
  { type: 'folder', name: 'api', level: 1, open: false },
  { type: 'file', name: 'contact.ts', level: 2, active: false },
  { type: 'file', name: 'App.tsx', level: 1, active: false },
  { type: 'file', name: 'index.ts', level: 1, active: false },
];

// ─── Code to display (App.tsx) ───────────────────────────────────────────────
const CODE_LINES = [
  { tokens: [{ t: 'keyword', v: 'import ' }, { t: 'plain', v: '{ ' }, { t: 'variable', v: 'React' }, { t: 'plain', v: ' } ' }, { t: 'keyword', v: 'from ' }, { t: 'string', v: "'react'" }] },
  { tokens: [{ t: 'keyword', v: 'import ' }, { t: 'plain', v: '{ ' }, { t: 'variable', v: 'Routes' }, { t: 'plain', v: ', ' }, { t: 'variable', v: 'Route' }, { t: 'plain', v: ' } ' }, { t: 'keyword', v: 'from ' }, { t: 'string', v: "'react-router-dom'" }] },
  { tokens: [{ t: 'keyword', v: 'import ' }, { t: 'plain', v: '{ ' }, { t: 'variable', v: 'motion' }, { t: 'plain', v: ' } ' }, { t: 'keyword', v: 'from ' }, { t: 'string', v: "'framer-motion'" }] },
  { tokens: [{ t: 'keyword', v: 'import ' }, { t: 'variable', v: 'Home' }, { t: 'keyword', v: ' from ' }, { t: 'string', v: "'./pages/Home'" }] },
  { tokens: [{ t: 'keyword', v: 'import ' }, { t: 'variable', v: 'Works' }, { t: 'keyword', v: ' from ' }, { t: 'string', v: "'./components/Works'" }] },
  { tokens: [] },
  { tokens: [{ t: 'keyword', v: 'export default function ' }, { t: 'function', v: 'App' }, { t: 'plain', v: '() {' }] },
  { tokens: [{ t: 'keyword', v: '  return ' }, { t: 'plain', v: '(' }] },
  { tokens: [{ t: 'plain', v: '    <' }, { t: 'type', v: 'Routes' }, { t: 'plain', v: '>' }] },
  { tokens: [{ t: 'plain', v: '      <' }, { t: 'type', v: 'Route ' }, { t: 'attr', v: 'path' }, { t: 'plain', v: '=' }, { t: 'string', v: '"/"' }, { t: 'plain', v: ' ' }, { t: 'attr', v: 'element' }, { t: 'plain', v: '={<' }, { t: 'type', v: 'Home' }, { t: 'plain', v: ' />} />' }] },
  { tokens: [{ t: 'plain', v: '      <' }, { t: 'type', v: 'Route ' }, { t: 'attr', v: 'path' }, { t: 'plain', v: '=' }, { t: 'string', v: '"/about"' }, { t: 'plain', v: ' ' }, { t: 'attr', v: 'element' }, { t: 'plain', v: '={<' }, { t: 'type', v: 'About' }, { t: 'plain', v: ' />} />' }] },
  { tokens: [{ t: 'plain', v: '    </' }, { t: 'type', v: 'Routes' }, { t: 'plain', v: '>' }] },
  { tokens: [{ t: 'plain', v: '  );' }] },
  { tokens: [{ t: 'plain', v: '}' }] },
];

// ─── Terminal output lines ───────────────────────────────────────────────────
const TERMINAL_LINES = [
  { text: '> zerocoded@1.0.0 dev', color: '#58a6ff' },
  { text: '> vite', color: '#58a6ff' },
  { text: '', color: '' },
  { text: '  VITE v5.3.1  ready in 234 ms', color: '#3fb950' },
  { text: '', color: '' },
  { text: '  ➜  Local:   http://localhost:5173/', color: '#d4d4d4' },
  { text: '  ➜  Network: use --host to expose', color: '#6e7681' },
  { text: '  ➜  press h + enter to show help', color: '#6e7681' },
];

// Token → CSS class map
const TOKEN_CLASSES: Record<string, string> = {
  keyword: 'syn-keyword',
  string: 'syn-string',
  comment: 'syn-comment',
  function: 'syn-function',
  variable: 'syn-variable',
  number: 'syn-number',
  type: 'syn-type',
  class: 'syn-class',
  tag: 'syn-tag',
  attr: 'syn-attr',
  value: 'syn-value',
  plain: 'syn-plain',
};

// ─── Code Editor Component ────────────────────────────────────────────────────
function VSCodeEditor() {
  const [terminalLines, setTerminalLines] = useState<typeof TERMINAL_LINES>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < TERMINAL_LINES.length) {
        setTerminalLines((prev) => [...prev, TERMINAL_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  return (
    <div className="editor-bg rounded-2xl overflow-hidden border border-white/10 shadow-large flex flex-col h-[460px] md:h-[520px] select-none">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ backgroundColor: '#323233' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-0.5 rounded text-xs" style={{ backgroundColor: '#3c3c3c', color: '#ababab' }}>
            App.tsx — zerocoded
          </div>
        </div>
      </div>

      {/* Editor tabs */}
      <div className="flex text-xs border-b border-white/5" style={{ backgroundColor: '#2d2d2d' }}>
        {['App.tsx', 'HeroSection.tsx', 'tailwind.config.ts'].map((tab, i) => (
          <div
            key={tab}
            className={`px-4 py-2 text-xs border-r border-white/5 cursor-pointer truncate max-w-[120px] ${
              i === 0
                ? 'editor-tab-active text-white'
                : 'editor-tab-inactive text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Main area: sidebar + code */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer sidebar */}
        <div className="editor-sidebar w-44 shrink-0 overflow-y-auto py-2 scrollbar-thin">
          <div className="px-3 py-1 text-2xs font-semibold tracking-widest uppercase" style={{ color: '#bbb' }}>
            Explorer
          </div>
          <div className="mt-1">
            {FILE_TREE.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1 px-2 py-0.5 cursor-pointer text-2xs transition-colors ${
                  item.active
                    ? 'bg-[#37373d] text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a2d2e]'
                }`}
                style={{ paddingLeft: `${(item.level) * 12 + 8}px` }}
              >
                {item.type === 'folder' ? (
                  <>
                    {item.open ? (
                      <FolderOpen size={11} className="shrink-0" style={{ color: '#e8ab4f' }} />
                    ) : (
                      <Folder size={11} className="shrink-0" style={{ color: '#e8ab4f' }} />
                    )}
                  </>
                ) : (
                  <span className="w-2.5 shrink-0" />
                )}
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code area */}
        <div className="flex-1 overflow-auto scrollbar-thin">
          <div className="p-4 font-mono text-xs leading-5 min-w-max">
            {CODE_LINES.map((line, lineIdx) => (
              <motion.div
                key={lineIdx}
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: lineIdx * 0.05, duration: 0.3 }}
              >
                <span className="w-5 text-right shrink-0 select-none" style={{ color: '#636363' }}>
                  {lineIdx + 1}
                </span>
                <span>
                  {line.tokens.map((tok, ti) => (
                    <span key={ti} className={TOKEN_CLASSES[tok.t] || 'syn-plain'}>
                      {tok.v}
                    </span>
                  ))}
                  {line.tokens.length === 0 && '\u00A0'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal panel */}
      <div className="terminal-bg border-t border-white/5 h-[100px] flex flex-col">
        <div className="flex items-center gap-3 px-3 py-1.5 border-b border-white/5">
          <span className="text-2xs font-medium text-white/60 uppercase tracking-wider">Terminal</span>
          <span className="text-2xs text-white/30 uppercase tracking-wider">Problems</span>
          <span className="text-2xs text-white/30 uppercase tracking-wider">Output</span>
        </div>
        <div ref={terminalRef} className="flex-1 overflow-auto px-3 py-2 scrollbar-thin">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              className="terminal-text text-2xs leading-4"
              style={{ color: line.color || '#d4d4d4' }}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}
          <div className="flex items-center gap-1">
            <span className="terminal-text text-2xs" style={{ color: '#3fb950' }}>$</span>
            <span className="w-1.5 h-3.5 bg-white/70 animate-blink inline-block" />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1" style={{ backgroundColor: '#2563FF' }}>
        <div className="flex items-center gap-2 text-white text-2xs">
          <GitBranch size={10} />
          <span>main</span>
          <span className="opacity-60">⊗ 0</span>
          <span className="opacity-60">⚠ 0</span>
        </div>
        <div className="flex gap-2 text-white/80 text-2xs">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>TSX</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #2563FF 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.07, 0.10, 0.07] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #2563FF 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column — copy */}
          <div>
            <motion.p
              className="section-label mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              We design, we code.
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-secondary leading-[1.1] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              We Build Digital{' '}
              <br className="hidden sm:block" />
              Experiences{' '}
              <span className="text-accent block sm:inline">That Scale.</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-muted leading-relaxed max-w-md mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              Zerocoded is a premium digital studio building websites, web apps, and mobile apps that help brands grow, stand out, and lead the future.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/work">
                <Button variant="primary" size="lg">
                  View Our Work
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Book a Call
                </Button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              className="mt-10 text-xs text-muted/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Trusted by forward-thinking brands worldwide
            </motion.p>
          </div>

          {/* Right column — VS Code Editor */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glowing background blur behind editor */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #2563FF22 0%, #1440C222 100%)' }}
            />
            <VSCodeEditor />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
