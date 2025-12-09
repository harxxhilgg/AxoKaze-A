import { useEffect, useState } from "react";
import { useUIStore } from "../../../../stores";
import { useF1Store } from "../../../../stores/f1Store";
import { usePopupClose } from "../../../../hooks/usePopupClose";

const F1YearDropdown = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { setShowF1YearDropdown } = useUIStore();
  const { selectedYear, setSelectedYear } = useF1Store();

  usePopupClose(() => setShowF1YearDropdown(false));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const years = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
    2014, 2013, 2012, 2011, 2010,
  ];

  const handleYearSelect = async (year: number) => {
    await setSelectedYear(year); // save selected year in memory
    setShowF1YearDropdown(false); // close the dropdown after year is selected
  };

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0"
        onClick={() => setShowF1YearDropdown(false)}
      >
        <div
          className={`absolute bg-white dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 rounded-[14px] shadow-lg p-2 min-w-32 transform transition-all duration-200
            ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}  
          `}
          style={{
            top: "200px",
            right: "55px",
          }}
        >
          <div className="space-y-1 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-f1reg text-sm transition-all duration-200 cursor-pointer active:scale-95 ${
                  year === selectedYear
                    ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/80"
                }`}
              >
                <span>{year}</span>

                {year === selectedYear && (
                  <div className="w-2 h-2 bg-[#FF1801] rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default F1YearDropdown;
