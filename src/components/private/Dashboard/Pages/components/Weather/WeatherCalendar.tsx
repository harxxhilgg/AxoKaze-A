const WeatherCalendar = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // get the week (7 days starting from sunday)
  const getWeekDays = () => {
    const days = [];
    const currentDayOfWeek = today.getDay(); // 0 = sunday, 1 = monday, etc.
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek); // go back to sunday

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const dayLabels = ["s", "m", "t", "w", "t", "f", "s"]; // sunday to saturday

  return (
    <div className="px-4 select-none">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => {
          const isToday =
            date.getDate() === currentDay &&
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear;

          return (
            <div key={index} className="text-center">
              <p className="text-xs font-display text-zinc-500 dark:text-zinc-400 mb-1">
                {dayLabels[index]}
              </p>

              <div
                className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full font-display text-sm ${
                  isToday
                    ? "bg-blue-600 text-white font-bold"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherCalendar;
