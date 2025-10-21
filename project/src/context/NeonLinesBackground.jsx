export default function NeonLinesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-[200%] h-[2px] bg-purple-500/30 rotate-45 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[200%] h-[2px] bg-blue-500/30 -rotate-45 animate-pulse" />
    </div>
  );
}
