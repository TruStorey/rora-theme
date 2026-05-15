export function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #b59eff 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-20 -left-32 h-96 w-[40rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #72f0c8 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-40 top-72 h-96 w-[36rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #f06cb8 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
