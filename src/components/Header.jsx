import { useState } from "react";
import {
  MapPin,
  Trash2,
  Truck,
  FileText,
  Calendar,
  CreditCard,
} from "lucide-react";

const Header = () => {
  const [currentStep] = useState(3); // Select Skip adımında olduğumuzu varsayıyoruz

  const steps = [
    {
      id: 1,
      name: "Postcode",
      icon: MapPin,
      completed: true,
    },
    {
      id: 2,
      name: "Waste Type",
      icon: Trash2,
      completed: true,
    },
    {
      id: 3,
      name: "Select Skip",
      icon: Truck,
      completed: false,
      current: true,
    },
    {
      id: 4,
      name: "Permit Check",
      icon: FileText,
      completed: false,
    },
    {
      id: 5,
      name: "Choose Date",
      icon: Calendar,
      completed: false,
    },
    {
      id: 6,
      name: "Payment",
      icon: CreditCard,
      completed: false,
    },
  ];

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Progress Steps */}
        <div className="relative">
          {/* Progress Bar Background - Sadece masaüstü ve tablet'te görünür, mobilde gizli */}
          <div className="absolute top-6 left-0 w-full h-1 bg-slate-700 rounded-full hidden md:block">
            {/* Progress Bar Fill */}
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out shadow-lg shadow-blue-500/30"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Steps - Desktop */}
          <div className="hidden lg:flex relative justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-300 ease-in-out relative z-10
                    ${
                      step.completed
                        ? "bg-green-600 shadow-lg shadow-green-600/30"
                        : step.current
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-4 ring-blue-600/20"
                        : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                    }
                  `}
                >
                  {/* Lucide React ikonları */}
                  <step.icon
                    className={`w-6 h-6 ${
                      step.completed
                        ? "text-white"
                        : step.current
                        ? "text-white"
                        : "text-slate-400"
                    }`}
                  />
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium transition-colors duration-200
                      ${
                        step.current
                          ? "text-blue-400"
                          : step.completed
                          ? "text-green-400"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {step.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Steps - Tablet */}
          <div className="hidden md:flex lg:hidden relative justify-between px-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                {/* Tablet Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-300 ease-in-out relative z-10
                    ${
                      step.completed
                        ? "bg-green-600 shadow-lg shadow-green-600/30"
                        : step.current
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-3 ring-blue-600/20"
                        : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                    }
                  `}
                >
                  {/* Tablet Icons */}
                  <step.icon
                    className={`w-5 h-5 ${
                      step.completed
                        ? "text-white"
                        : step.current
                        ? "text-white"
                        : "text-slate-400"
                    }`}
                  />
                </div>

                {/* Tablet Step Label */}
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-medium transition-colors duration-200
                      ${
                        step.current
                          ? "text-blue-400"
                          : step.completed
                          ? "text-green-400"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {step.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Steps - Mobile (2x3 Grid) */}
          <div className="md:hidden relative">
            {/* Mobile Steps Grid */}
            <div className="grid grid-cols-2 gap-6 px-6 py-4">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Mobile Step Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-3
                      transition-all duration-300 ease-in-out
                      ${
                        step.completed
                          ? "bg-green-600 shadow-lg shadow-green-600/30"
                          : step.current
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "bg-slate-700 text-slate-400"
                      }
                    `}
                  >
                    {/* Mobile Icons */}
                    <step.icon
                      className={`w-7 h-7 ${
                        step.completed
                          ? "text-white"
                          : step.current
                          ? "text-white"
                          : "text-slate-400"
                      }`}
                    />
                  </div>

                  {/* Mobile Step Label */}
                  <p
                    className={`text-sm font-medium transition-colors duration-200 text-center
                      ${
                        step.current
                          ? "text-blue-400"
                          : step.completed
                          ? "text-green-400"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {step.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
