import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Crypto = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const data = [
    {
      id: "6744fa67e52a4f920b19c101",
      title: "Mysteries of the Forest",
      description: `Deep within the trees, secrets sleep beneath the soil. Sunlight filters through leaves like scattered jewels. Creatures roam quietly, hidden from the hurried world. Every path invites curiosity and wonder.`,
      image: "https://picsum.photos/seed/forest01/800/600",
    },
    {
      id: "6744fa67e52a4f920b19c102",
      title: "Reflections of the Past",
      description: `Old memories linger where time stood still. Ruins whisper stories of those who came before us. History lives in every stone and broken wall. Look closely, and the past speaks again.`,
      image: "https://picsum.photos/seed/history02/800/600",
    },
    {
      id: "6744fa67e52a4f920b19c103",
      title: "Wonders Above the Clouds",
      description: `High in the sky, dreams learn to fly freely. Clouds drift like soft pillows shaping new worlds. Stars patiently wait for night to take the stage. Lift your eyes and feel the freedom above.`,
      image: "https://picsum.photos/seed/sky03/800/600",
    },
    {
      id: "6744fa67e52a4f920b19c104",
      title: "Journey into the Unknown",
      description: `Every adventure starts with a single brave step. Roads twist, turn, and surprise those who follow. Challenges build strength we didn’t know we had. Keep moving forward and discover your story.`,
      image: "https://picsum.photos/seed/adventure04/800/600",
    },
    {
      id: "6744fa67e52a4f920b19c105",
      title: "Peaceful Morning Breeze",
      description: `The world wakes with soft morning light. Birds sing greetings to the rising sun. Calm moments bring clarity to a busy heart. Take a breath and welcome the day.`,
      image: "https://picsum.photos/seed/morning05/800/600",
    },
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // fetch delay - to check skeleton loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonTheme
      baseColor="rgba(156, 163, 175, 0.1)"
      highlightColor="rgba(209, 213, 219, 0.1)"
      direction="ltr"
    >
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Crypto
        </h2>

        {data.map((item) => (
          <div key={item.id} className="font-satoshi mb-6">
            {loading ? (
              <>
                <Skeleton height={120} width={120} className="mb-2" />
                <h1>
                  <Skeleton />
                </h1>
                <p>
                  <Skeleton count={4} />
                </p>
              </>
            ) : (
              <>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-30 h-30 object-contain mb-2"
                />
                <h1 className="text-lg font-semibold">{item.title}</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {item.description}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default Crypto;
