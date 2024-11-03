import { useState } from "react";

interface SliderProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  label = "Default range",
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    onChange(newValue);
  };
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <input
          type="range"
          value={sliderValue}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-right">
          {sliderValue}
        </span>
      </div>
    </div>
  );
};

export default Slider;