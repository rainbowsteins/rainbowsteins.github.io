"use client";
import { useEffect, useRef } from "react";

export function NeuralSculpture({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({ x: 0, y: 0, angle: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, last = 0, visible = true;
    const points: number[][] = [];
    const segments = 150, sides = 12;
    for (let i = 0; i < segments; i++) {
      const u = i / segments * Math.PI * 2;
      const radius = 1.3 + .42 * Math.cos(3 * u);
      const center = [radius * Math.cos(2 * u), radius * Math.sin(2 * u), .67 * Math.sin(3 * u)];
      const next = u + .001, nr = 1.3 + .42 * Math.cos(3 * next);
      const tangent = [nr * Math.cos(2 * next) - center[0], nr * Math.sin(2 * next) - center[1], .67 * Math.sin(3 * next) - center[2]];
      const len = Math.hypot(...tangent), t = tangent.map(n => n / len);
      const n = [-t[1], t[0], 0], nl = Math.hypot(...n), normal = n.map(v => v / nl);
      const binormal = [t[1] * normal[2] - t[2] * normal[1], t[2] * normal[0] - t[0] * normal[2], t[0] * normal[1] - t[1] * normal[0]];
      for (let j = 0; j < sides; j++) {
        const v = j / sides * Math.PI * 2;
        points.push(center.map((c, k) => c + .27 * (Math.cos(v) * normal[k] + Math.sin(v) * binormal[k])));
      }
    }
    const project = (p: number[], rotation: number) => {
      const ay = rotation + state.current.x * .2, ax = -.42 + state.current.y * .18;
      const x = p[0] * Math.cos(ay) + p[2] * Math.sin(ay), z = -p[0] * Math.sin(ay) + p[2] * Math.cos(ay);
      const y = p[1] * Math.cos(ax) - z * Math.sin(ax), depth = p[1] * Math.sin(ax) + z * Math.cos(ax);
      const scale = Math.min(width, height) * .205 * 5 / (5 + depth);
      return [width / 2 + x * scale, height / 2 + y * scale, depth];
    };
    const draw = (now: number) => {
      if (!width || !height) return;
      const elapsed = last ? Math.min(now - last, 40) : 16; last = now;
      if (!paused && !motion.matches && visible && !document.hidden) state.current.angle += elapsed * .000085;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(123,147,191,.11)";context.lineWidth = .6;
      for (let ring = 0; ring < 3; ring++) {
        context.beginPath();context.ellipse(width / 2, height / 2, width * (.4 + ring * .035), height * (.16 + ring * .018), -.48, 0, Math.PI * 2);context.stroke();
      }
      for (let i = 0; i < 42; i++) {
        const x = ((Math.sin(i * 127.1) * 43758.5453) % 1 + 1) % 1 * width;
        const y = ((Math.sin(i * 311.7) * 13431.312) % 1 + 1) % 1 * height;
        context.fillStyle = i % 5 === 0 ? "rgba(150,191,255,.5)" : "rgba(151,167,212,.2)";
        context.fillRect(x, y, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
      }
      const projected = points.map(p => project(p, state.current.angle + .25));
      const edges: { a: number[]; b: number[]; depth: number; along: boolean }[] = [];
      for (let i = 0; i < segments; i++) for (let j = 0; j < sides; j++) {
        const a = projected[i * sides + j], b = projected[i * sides + (j + 1) % sides], c = projected[((i + 1) % segments) * sides + j];
        edges.push({ a, b, depth: (a[2] + b[2]) / 2, along: false });
        if (j % 2 === 0) edges.push({ a, b: c, depth: (a[2] + c[2]) / 2, along: true });
      }
      edges.sort((a, b) => b.depth - a.depth);
      for (const edge of edges) {
        const front = Math.max(0, Math.min(1, (2.3 - edge.depth) / 4));
        context.strokeStyle = edge.along ? `rgba(122,226,235,${.1 + front * .58})` : `rgba(153,153,255,${.06 + front * .46})`;
        context.lineWidth = edge.along ? .8 : .5;context.beginPath();context.moveTo(edge.a[0], edge.a[1]);context.lineTo(edge.b[0], edge.b[1]);context.stroke();
      }
      for (let i = 0; i < 8; i++) {
        const index = (Math.floor(state.current.angle * 140 + i * 231) % points.length + points.length) % points.length, p = projected[index];
        const glow = context.createRadialGradient(p[0], p[1], 0, p[0], p[1], 9);
        glow.addColorStop(0, "rgba(179,247,255,.8)");glow.addColorStop(.2, "rgba(120,224,248,.4)");glow.addColorStop(1, "rgba(120,224,248,0)");
        context.fillStyle = glow;context.beginPath();context.arc(p[0], p[1], 9, 0, Math.PI * 2);context.fill();
      }
      if (!paused && !motion.matches && visible) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();width = bounds.width;height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);canvas.width = width * dpr;canvas.height = height * dpr;context.setTransform(dpr, 0, 0, dpr, 0, 0);
      cancelAnimationFrame(frame);draw(0);
    };
    const move = (event: PointerEvent) => {
      const b = canvas.getBoundingClientRect();state.current.x = (event.clientX - b.left) / b.width - .5;state.current.y = (event.clientY - b.top) / b.height - .5;
      if (paused || motion.matches) draw(0);
    };
    const observer = new ResizeObserver(resize);observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting;cancelAnimationFrame(frame);if (visible) { last = 0;draw(0); } });intersection.observe(canvas);
    const changed = () => { cancelAnimationFrame(frame);last = 0;draw(0); };
    motion.addEventListener("change", changed);canvas.addEventListener("pointermove", move);resize();
    return () => { cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();motion.removeEventListener("change", changed);canvas.removeEventListener("pointermove", move); };
  }, [paused]);
  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
}
