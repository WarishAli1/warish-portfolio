import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const UPSCALE = 3;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const GRAIN_TONES = {
  dark: { shadow: [8, 11, 18], light: [238, 242, 248] },
  light: { shadow: [14, 14, 17], light: [250, 250, 247] },
};

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const luminance = (r, g, b) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;
const smoothstep = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const drawGrain = (ctx, img, width, height, dpr, isDark) => {
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  const frame = ctx.getImageData(0, 0, width, height);
  const d = frame.data;
  const step = Math.max(2, Math.round(dpr * 1.5));
  const { shadow, light } = GRAIN_TONES[isDark ? "dark" : "light"];

  for (let y = 0; y < height; y++) {
    const row = (Math.floor(y / step) & 3) * 4;

    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = d[i + 3];
      if (alpha === 0) continue;

      const threshold = (BAYER[row + (Math.floor(x / step) & 3)] + 0.5) / 16;
      const grain = (Math.random() - 0.5) * 0.14;
      const u = x / width;
      const reach = smoothstep(0, 0.42, u) * (1 - smoothstep(0.86, 1, u));

      if (reach < threshold + grain * 0.5) {
        d[i + 3] = 0;
        continue;
      }

      const lum = clamp01((luminance(d[i], d[i + 1], d[i + 2]) - 0.5) * 1.3 + 0.5);
      const mix = 0.16 + 0.5 * (1 - reach);
      const dither = clamp01((lum + grain - threshold) * 4 + 0.5);
      const t = lum * (1 - mix) + dither * mix;

      d[i] = shadow[0] + (light[0] - shadow[0]) * t;
      d[i + 1] = shadow[1] + (light[1] - shadow[1]) * t;
      d[i + 2] = shadow[2] + (light[2] - shadow[2]) * t;
      d[i + 3] = alpha;
    }
  }

  ctx.putImageData(frame, 0, 0);
};

const PixelPortrait = ({ src, alt, maxUpscale = UPSCALE }) => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [native, setNative] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      const dpr = window.devicePixelRatio || 1;
      setNative({
        height: img.naturalHeight / dpr,
        ratio: img.naturalWidth / img.naturalHeight,
      });
    };
    img.src = src;
    return () => {
      img.onload = null;
    };
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!native || !canvas || !img) return undefined;

    let frame = 0;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = Math.round(canvas.clientWidth * dpr);
      const height = Math.round(canvas.clientHeight * dpr);
      if (!width || !height) return;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.clearRect(0, 0, width, height);
      drawGrain(ctx, img, width, height, dpr, isDarkMode);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [native, isDarkMode]);

  const height = native
    ? `min(var(--photo-h), ${native.height * maxUpscale}px)`
    : "var(--photo-h)";

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={`block max-w-none select-none transition-opacity duration-700 ${
        native ? "opacity-100" : "opacity-0"
      }`}
      style={{ height, width: `calc(${height} * ${native ? native.ratio : 1})` }}
    />
  );
};

export default PixelPortrait;