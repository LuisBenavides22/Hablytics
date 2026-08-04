export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void" />

      <div className="absolute inset-x-0 top-0 h-[70vh] grid-floor [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-60" />

      <div className="absolute -top-40 -left-32 size-[38rem] animate-drift rounded-full bg-signal-500/12 blur-[130px]" />
      <div
        className="absolute -top-20 right-[-10rem] size-[34rem] animate-drift rounded-full bg-flux-500/12 blur-[130px]"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="absolute bottom-[-14rem] left-1/3 size-[30rem] animate-drift rounded-full bg-signal-600/8 blur-[140px]"
        style={{ animationDelay: '-14s' }}
      />

      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  )
}
