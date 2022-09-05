import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const categories = {
  Recent: [
    {
      id: 1,
      title: "Does drinking coffee make you smarter?",
      date: "5h ago",
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: "2h ago",
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Popular: [
    {
      id: 1,
      title: "Is tech making coffee better or worse?",
      date: "Jan 7",
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: "The most innovative things happening in coffee",
      date: "Mar 19",
      commentCount: 24,
      shareCount: 12,
    },
  ],
  Trending: [
    {
      id: 1,
      title: "Ask Me Anything: 10 answers to your questions about coffee",
      date: "2d ago",
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: "4d ago",
      commentCount: 1,
      shareCount: 2,
    },
  ],
};

//See here for manual control of tabs https://headlessui.com/react/tabs#controlling-the-active-tab

const keys = Object.keys(categories);

export default function Example() {
  const [selectedIndex, setSelectedIndex] = useState<undefined | number>(
    undefined
  ); //set index to undefined to prevent flashing as it changes from 0 to to index from useEffect
  const router = useRouter();

  const handleChange = (index: number) => {
    setSelectedIndex(index);

    const tab = keys[index];
    //https://nextjs.org/docs/routing/shallow-routing
    //Also, encode tab string to account for spaces, special symbols etc in tab name
    router.push(`/?tab=${encodeURIComponent(tab)}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (router?.query) {
      //get tab name/index from url
      const tab = router.query.tab ?? "Recent"; //default to recent if no tab in url
      const index = keys.findIndex((t) => t === tab);
      setSelectedIndex(index > -1 ? index : 0);
    }
  }, [router]);

  return (
    <main className="flex items-center justify-start min-h-screen bg-blue-400 ">
      <div className="w-full max-w-md px-2 py-16 mx-auto sm:px-0">
        <Tab.Group selectedIndex={selectedIndex} onChange={handleChange}>
          <Tab.List className="flex p-1 space-x-1 rounded-xl bg-blue-900/20">
            {keys.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-white p-3",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                <ul>
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="relative p-3 rounded-md hover:bg-gray-100"
                    >
                      <h3 className="text-sm font-medium leading-5">
                        {post.title}
                      </h3>

                      <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-gray-500">
                        <li>{post.date}</li>
                        <li>&middot;</li>
                        <li>{post.commentCount} comments</li>
                        <li>&middot;</li>
                        <li>{post.shareCount} shares</li>
                      </ul>

                      <a
                        href="#"
                        className={classNames(
                          "absolute inset-0 rounded-md",
                          "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </main>
  );
}
