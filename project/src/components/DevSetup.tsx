import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

interface Token { t: string; c: string }
interface CodeLine { indent: number; tokens: Token[] }

const codeLines: CodeLine[] = [
  { indent: 0, tokens: [{ t: 'const', c: '#c792ea' }, { t: ' app ', c: '#d6deeb' }, { t: '=', c: '#89ddff' }, { t: ' createApp', c: '#82aaff' }, { t: '({', c: '#d6deeb' }] },
  { indent: 1, tokens: [{ t: 'name', c: '#f78c6c' }, { t: ':', c: '#89ddff' }, { t: " 'Portfolio'", c: '#c3e88d' }, { t: ',', c: '#d6deeb' }] },
  { indent: 1, tokens: [{ t: 'theme', c: '#f78c6c' }, { t: ':', c: '#89ddff' }, { t: " 'dark'", c: '#c3e88d' }, { t: ',', c: '#d6deeb' }] },
  { indent: 1, tokens: [{ t: 'stack', c: '#f78c6c' }, { t: ': [', c: '#89ddff' }] },
  { indent: 2, tokens: [{ t: "'React'", c: '#c3e88d' }, { t: ',', c: '#d6deeb' }, { t: " 'TypeScript'", c: '#c3e88d' }, { t: ',', c: '#d6deeb' }] },
  { indent: 2, tokens: [{ t: "'Tailwind'", c: '#c3e88d' }, { t: ',', c: '#d6deeb' }, { t: " 'Node.js'", c: '#c3e88d' }] },
  { indent: 1, tokens: [{ t: '],', c: '#89ddff' }] },
  { indent: 0, tokens: [{ t: '});', c: '#d6deeb' }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'app', c: '#d6deeb' }, { t: '.', c: '#89ddff' }, { t: 'deploy', c: '#82aaff' }, { t: '()', c: '#d6deeb' }, { t: ';', c: '#89ddff' }] },
];

function flattenLines(lines: CodeLine[]) {
  const result: { lineIdx: number; char: string; color: string }[] = [];
  lines.forEach((line, lineIdx) => {
    for (let i = 0; i < line.indent * 2; i++) {
      result.push({ lineIdx, char: ' ', color: '#d6deeb' });
    }
    line.tokens.forEach(token => {
      for (const ch of token.t) {
        result.push({ lineIdx, char: ch, color: token.c });
      }
    });
    result.push({ lineIdx, char: '\n', color: '' });
  });
  return result;
}

const allChars = flattenLines(codeLines);
const totalChars = allChars.length;

const terminalLines = [
  { text: '$ npm run build', color: '#8b949e' },
  { text: '✓ Compiled successfully', color: '#a6e3a1' },
  { text: '✓ Bundle size: 142kb', color: '#a6e3a1' },
  { text: '✓ Deployed to production', color: '#a855f7' },
];

const floatingIcons = [
  { icon: '⚛', label: 'React', x: -30, y: -20, color: '#61dafb' },
  { icon: 'TS', label: 'TypeScript', x: 105, y: -15, color: '#3178c6' },
  { icon: '{}', label: 'JSON', x: 108, y: 55, color: '#f7df1e' },
  { icon: '▲', label: 'Deploy', x: -25, y: 60, color: '#a855f7' },
];

function useTypingText(text: string, speed: number, startDelay: number, enabled: boolean) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!enabled) { setDisplayed(''); return; }
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, speed, startDelay, enabled]);
  return displayed;
}

const TerminalLine = ({ text, color, delay, codeFinished }: {
  text: string; color: string; delay: number; codeFinished: boolean;
}) => {
  const displayed = useTypingText(text, 25, delay, codeFinished);
  if (!codeFinished) return <div className="h-[20px]" />;
  return (
    <div className="font-mono text-[10px] sm:text-[11px] leading-[20px] flex items-center" style={{ color }}>
      {displayed}
      {displayed.length > 0 && displayed.length < text.length && (
        <span className="inline-block w-[5px] h-[12px] bg-gray-400 ml-px animate-pulse" />
      )}
      {displayed === text && text.startsWith('✓') && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-1"
        />
      )}
    </div>
  );
};

const DevSetup: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(mouseX, [-300, 300], [-4, 4]);
  const [charIndex, setCharIndex] = useState(0);
  const [codeFinished, setCodeFinished] = useState(false);
  const [cycle, setCycle] = useState(0);

  const resetAndType = useCallback(() => {
    setCharIndex(0);
    setCodeFinished(false);
    setCycle(c => c + 1);
  }, []);

  useEffect(() => {
    if (charIndex >= totalChars) {
      setCodeFinished(true);
      const resetTimer = setTimeout(resetAndType, 6000);
      return () => clearTimeout(resetTimer);
    }
    // Variable speed: faster for spaces/brackets, slower for meaningful chars
    const ch = allChars[charIndex]?.char;
    let speed = 35;
    if (ch === '\n') speed = 150;
    else if (ch === ' ' || ch === ',' || ch === ';') speed = 20;
    else if (ch === '{' || ch === '}' || ch === '(' || ch === ')' || ch === '[' || ch === ']') speed = 25;

    const timer = setTimeout(() => setCharIndex(prev => prev + 1), speed);
    return () => clearTimeout(timer);
  }, [charIndex, resetAndType]);

  // Build displayed lines
  const displayedLines: { chars: { char: string; color: string }[] }[] = codeLines.map(() => ({ chars: [] }));
  for (let i = 0; i < charIndex && i < allChars.length; i++) {
    const ch = allChars[i];
    if (ch.char !== '\n') {
      displayedLines[ch.lineIdx].chars.push({ char: ch.char, color: ch.color });
    }
  }

  const cursorLine = charIndex < totalChars ? allChars[Math.min(charIndex, totalChars - 1)].lineIdx : -1;
  // Track which lines have started typing
  const activeLine = charIndex < totalChars ? allChars[Math.min(charIndex, totalChars - 1)].lineIdx : codeLines.length;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[60%] rounded-full bg-purple-600/[0.07] blur-[60px]" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative w-full max-w-[620px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating tech badges — hidden on mobile to prevent overlap */}
        <div className="hidden sm:block">
          {floatingIcons.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.2, type: 'spring', stiffness: 180, damping: 15 }}
              className="absolute z-20"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#12121e]/95 border border-white/[0.08] shadow-xl"
                style={{ boxShadow: `0 4px 20px ${item.color}15` }}
              >
                <span className="text-sm" style={{ filter: `drop-shadow(0 0 4px ${item.color}60)` }}>{item.icon}</span>
                <span className="text-[10px] text-gray-400 font-medium">{item.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Monitor outer glow */}
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-purple-500/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative rounded-xl border border-gray-700/50 bg-[#0d1117] shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(147,51,234,0.08)' }}
        >
          {/* Screen reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none z-10" />

          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-gray-700/40">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f5740]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e40]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c84040]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-3 py-0.5 rounded-md bg-[#0d1117] border border-gray-700/30">
                <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/30" />
                <span className="text-[10px] text-gray-500 font-mono">portfolio.tsx</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-sm border border-gray-600/30" />
              <div className="w-2 h-2 rounded-sm border border-gray-600/30" />
            </div>
          </div>

          {/* Editor area */}
          <div className="flex min-h-[170px]">
            {/* Line numbers */}
            <div className="flex flex-col py-3 px-2 bg-[#0d1117] border-r border-gray-800/40 select-none">
              {codeLines.map((_, i) => (
                <div
                  key={i}
                  className={`text-[11px] font-mono leading-[19px] text-right pr-1 transition-colors duration-200 ${
                    i === cursorLine ? 'text-gray-400' : i <= activeLine ? 'text-gray-600' : 'text-gray-800'
                  }`}
                  style={{ minWidth: 20 }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code content */}
            <div className="flex-1 py-3 px-3 overflow-hidden relative">
              {codeLines.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  className="font-mono text-[11px] sm:text-xs leading-[19px] whitespace-pre h-[17px] relative"
                  style={{ paddingLeft: line.indent * 16 }}
                >
                  {/* Active line highlight */}
                  <AnimatePresence>
                    {cursorLine === lineIdx && !codeFinished && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -left-3 right-0 top-0 bottom-0 bg-white/[0.03] border-l-2 border-purple-500/50"
                        style={{ marginLeft: 0 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-[1]">
                    {displayedLines[lineIdx].chars.map((ch, ci) => (
                      <span key={ci} style={{ color: ch.color }}>{ch.char}</span>
                    ))}
                  </span>
                  {cursorLine === lineIdx && !codeFinished && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-[2px] h-[15px] bg-purple-400 ml-px align-middle relative z-[1]"
                      style={{ boxShadow: '0 0 8px rgba(168,85,247,0.6)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status bar between editor and terminal */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#1a1f2b] border-y border-gray-700/30">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${codeFinished ? 'bg-green-400' : 'bg-purple-400 animate-pulse'}`}
                  style={{ boxShadow: codeFinished ? '0 0 6px #4ade8050' : '0 0 6px #a855f750' }}
                />
                <span className="text-[9px] text-gray-500 font-mono">
                  {codeFinished ? 'ready' : 'typing...'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-gray-600 font-mono">UTF-8</span>
              <span className="text-[9px] text-gray-600 font-mono">TypeScript</span>
              <span className="text-[9px] text-gray-600 font-mono">
                Ln {(cursorLine >= 0 ? cursorLine : codeLines.length - 1) + 1}
              </span>
            </div>
          </div>

          {/* Terminal */}
          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22]">
              <span className="text-[10px] text-gray-500 font-medium tracking-wider">TERMINAL</span>
              <div className="flex-1" />
              <span className="text-[10px] text-gray-600 font-mono">zsh</span>
            </div>
            <div className="px-3 py-2 bg-[#0a0e14] min-h-[65px]">
              {terminalLines.map((line, i) => (
                <TerminalLine
                  key={`${i}-${cycle}`}
                  text={line.text}
                  color={line.color}
                  delay={i * 550}
                  codeFinished={codeFinished}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Monitor stand */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-8 rounded-b-sm border-x border-b border-gray-600/20"
            style={{ background: 'linear-gradient(180deg, #2a2a3e 0%, #1a1a2e 60%, #12121e 100%)' }}
          />
          <div className="w-36 h-[5px] rounded-b-md border-x border-b border-gray-600/15"
            style={{ background: 'linear-gradient(180deg, #252535 0%, #1a1a28 100%)' }}
          />
          {/* Stand highlight */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-400/15 to-transparent -mt-[5px]" />
        </div>

        {/* Desk surface glow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-purple-500/[0.06] blur-lg rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default DevSetup;
