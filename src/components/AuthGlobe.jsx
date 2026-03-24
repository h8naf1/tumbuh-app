import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

function AuthGlobe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined
    }

    let phi = 0

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.145, 0.235, 0.392],
      markerColor: [0.388, 0.647, 0.98],
      glowColor: [0.192, 0.435, 0.89],
      markers: [
        { location: [-6.2, 106.8], size: 0.08 },
        { location: [-7.8, 110.4], size: 0.06 },
        { location: [1.29, 103.85], size: 0.06 },
        { location: [35.7, 139.7], size: 0.06 },
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.0025
      },
    })

    return () => globe.destroy()
  }, [])

  return (
    <div className="pointer-events-none relative aspect-square w-130 xl:w-155">

      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default AuthGlobe
