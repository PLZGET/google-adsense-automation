"use client"

interface StickFigureProps {
  temperature: number
  condition: string
}

export default function StickFigure({ temperature, condition }: StickFigureProps) {
  // Determine outfit based on temperature
  const getOutfit = () => {
    if (temperature >= 25) {
      return {
        top: "tshirt",
        bottom: "shorts",
        outer: null,
        accessory: condition === "rainy" ? "umbrella" : null,
      }
    } else if (temperature >= 20) {
      return {
        top: "longsleeve",
        bottom: "pants",
        outer: null,
        accessory: condition === "rainy" ? "umbrella" : null,
      }
    } else if (temperature >= 15) {
      return {
        top: "longsleeve",
        bottom: "pants",
        outer: "windbreaker",
        accessory: condition === "rainy" ? "umbrella" : null,
      }
    } else if (temperature >= 10) {
      return {
        top: "longsleeve",
        bottom: "pants",
        outer: "hoodie",
        accessory: condition === "rainy" ? "umbrella" : null,
      }
    } else if (temperature >= 5) {
      return {
        top: "longsleeve",
        bottom: "pants",
        outer: "coat",
        accessory: condition === "rainy" ? "umbrella" : null,
      }
    } else {
      return {
        top: "longsleeve",
        bottom: "pants",
        outer: "puffer",
        accessory: condition === "rainy" ? "umbrella" : null,
      }
    }
  }

  const outfit = getOutfit()

  return (
    <svg width="180" height="280" viewBox="0 0 180 280" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="90" cy="30" r="20" fill="hsl(var(--primary))" className="animate-pulse" />

      {/* Umbrella (if rainy) */}
      {outfit.accessory === "umbrella" && (
        <g>
          <path
            d="M 60 40 Q 60 20, 90 20 Q 120 20, 120 40"
            fill="hsl(var(--destructive))"
            stroke="hsl(var(--destructive-foreground))"
            strokeWidth="2"
          />
          <line x1="90" y1="20" x2="90" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
        </g>
      )}

      {/* Body - varies by outfit */}
      <g>
        {/* Base Body (always present under clothes) */}
        <line x1="90" y1="50" x2="90" y2="140" stroke="hsl(var(--primary))" strokeWidth="3" />

        {/* Top clothing */}
        {outfit.top === "tshirt" && <rect x="70" y="50" width="40" height="45" fill="hsl(var(--secondary))" rx="4" />}
        {outfit.top === "longsleeve" && (
          <>
            <rect x="70" y="50" width="40" height="50" fill="hsl(var(--chart-2))" rx="4" />
            {/* Sleeves */}
            <rect x="55" y="55" width="15" height="35" fill="hsl(var(--chart-2))" rx="3" />
            <rect x="110" y="55" width="15" height="35" fill="hsl(var(--chart-2))" rx="3" />
          </>
        )}

        {/* Outer layer */}
        {outfit.outer === "windbreaker" && (
          <rect x="65" y="48" width="50" height="55" fill="hsl(var(--chart-3))" fillOpacity="0.7" rx="6" />
        )}
        {outfit.outer === "hoodie" && (
          <>
            <rect x="65" y="48" width="50" height="60" fill="hsl(var(--chart-4))" fillOpacity="0.85" rx="6" />
            <circle cx="90" cy="35" r="25" fill="hsl(var(--chart-4))" fillOpacity="0.5" />
          </>
        )}
        {outfit.outer === "coat" && (
          <rect x="60" y="48" width="60" height="70" fill="hsl(var(--chart-5))" fillOpacity="0.9" rx="6" />
        )}
        {outfit.outer === "puffer" && (
          <>
            <rect x="58" y="48" width="64" height="75" fill="hsl(var(--destructive))" fillOpacity="0.9" rx="8" />
            {/* Puffy lines */}
            <line x1="58" y1="70" x2="122" y2="70" stroke="hsl(var(--background))" strokeWidth="2" />
            <line x1="58" y1="90" x2="122" y2="90" stroke="hsl(var(--background))" strokeWidth="2" />
            <line x1="58" y1="110" x2="122" y2="110" stroke="hsl(var(--background))" strokeWidth="2" />
          </>
        )}

        {/* Arms */}
        <line x1="70" y1="70" x2="50" y2="110" stroke="hsl(var(--primary))" strokeWidth="3" />
        <line x1="110" y1="70" x2="130" y2="110" stroke="hsl(var(--primary))" strokeWidth="3" />

        {/* Bottom clothing */}
        {outfit.bottom === "shorts" && <rect x="75" y="140" width="30" height="35" fill="hsl(var(--muted))" rx="3" />}
        {outfit.bottom === "pants" && (
          <>
            <rect x="75" y="140" width="12" height="70" fill="hsl(var(--foreground))" rx="3" />
            <rect x="93" y="140" width="12" height="70" fill="hsl(var(--foreground))" rx="3" />
          </>
        )}

        {/* Legs */}
        <line
          x1="80"
          y1="140"
          x2="80"
          y2={outfit.bottom === "shorts" ? 220 : 210}
          stroke="hsl(var(--primary))"
          strokeWidth="3"
        />
        <line
          x1="100"
          y1="140"
          x2="100"
          y2={outfit.bottom === "shorts" ? 220 : 210}
          stroke="hsl(var(--primary))"
          strokeWidth="3"
        />

        {/* Feet */}
        <ellipse cx="80" cy={outfit.bottom === "shorts" ? 225 : 215} rx="8" ry="4" fill="hsl(var(--foreground))" />
        <ellipse cx="100" cy={outfit.bottom === "shorts" ? 225 : 215} rx="8" ry="4" fill="hsl(var(--foreground))" />
      </g>
    </svg>
  )
}
