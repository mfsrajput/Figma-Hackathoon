import { Trophy, Shield, Truck, HeadphonesIcon } from 'lucide-react'

export default function Benefits({ className = "" }: { className?: string }) {
  const benefits = [
    {
      icon: Trophy,
      title: "High Quality",
      description: "Crafted from top materials",
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description: "Over 2 years",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Order over $150",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Dedicated support",
    },
  ]

  return (
    <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}>
      {benefits.map((benefit) => (
        <div
          key={benefit.title}
          className="flex items-center gap-4 p-4 rounded-md hover:bg-gray-100 transition-colors duration-300"
          aria-labelledby={benefit.title}
          role="region"
        >
          <benefit.icon
            className="w-12 h-12 text-muted-foreground transition-transform duration-300 transform hover:scale-110"
            aria-hidden="true"
          />
          <div>
            <h3 className="font-semibold text-lg" id={benefit.title}>
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
