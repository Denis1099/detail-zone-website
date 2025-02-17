
import { motion } from "framer-motion";

const carLogos = [
  {
    name: "Porsche",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Porsche_logo.svg/2560px-Porsche_logo.svg.png"
  },
  {
    name: "Ferrari",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ferrari-Logo.svg/2560px-Ferrari-Logo.svg.png"
  },
  {
    name: "Lamborghini",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Lamborghini_Logo.svg/2560px-Lamborghini_Logo.svg.png"
  },
  {
    name: "BMW",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png"
  },
  {
    name: "Mercedes",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png"
  }
];

export const LogoSlider = () => {
  return (
    <div className="relative overflow-hidden bg-black/50 py-10">
      <div className="flex space-x-12 animate-[scroll_20s_linear_infinite]">
        {[...carLogos, ...carLogos].map((logo, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-32 h-20 flex items-center justify-center"
          >
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="max-h-12 object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
