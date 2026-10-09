interface VideoBackgroundProps {
  src: string
}

export function VideoBackground({ src }: VideoBackgroundProps) {
  return (
    <div className="video-background" aria-hidden="true">
      <video autoPlay loop muted playsInline tabIndex={-1}>
        <source src={src} />
      </video>
    </div>
  )
}
