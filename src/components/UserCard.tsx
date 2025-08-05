"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const UserCard = ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const [data, setData] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/count/${type}`);
        const result = await response.json();
        setData(result.count || 0);
      } catch (error) {
        console.error(`Error fetching ${type} count:`, error);
        setData(0);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
