'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  'Initializing...',
  'Loading Research...',
  'Loading Publications...',
  'Preparing Experience...',
  'Ready.',
];

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Skip loading if already visited this session
    if (sessionStorage.getItem('ub_loaded')) {
      setDone(true);
      return;
    }

    let i = 0;
    const next = () => {
      i++;
      if (i < steps.length) {
        setStepIndex(i);
        setTimeout(next, i === steps.length - 1 ? 300 : 380);
      } else {
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem('ub_loaded', '1');
        }, 400);
      }
    };
    setTimeout(next, 350);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#09090B',
              fontFamily: 'var(--font-body)',
              letterSpacing: '-0.02em',
            }}
          >
            UB
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: 200, height: 1, background: 'var(--border)', borderRadius: 1, overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: 'var(--accent)', borderRadius: 1 }}
              animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>

          {/* Status text */}
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              fontWeight: 500,
            }}
          >
            {steps[stepIndex]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
