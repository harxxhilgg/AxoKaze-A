import F1Header from "./components/F1/F1Header";
import F1RaceList from "./components/F1/F1RaceList";

const F1 = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 pl-8 pr-8 pb-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <F1Header />
      <F1RaceList />
    </div>
  );
};

export default F1;
