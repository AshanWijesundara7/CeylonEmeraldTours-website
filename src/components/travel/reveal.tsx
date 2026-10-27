import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
export function Reveal({ children, className, stagger = false }: { children: ReactNode; className?: string; stagger?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    node.dataset['motion'] = 'ready';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { node.dataset['visible'] = 'true'; observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={cn('reveal', stagger && 'stagger', className)}>{children}</div>;
}
