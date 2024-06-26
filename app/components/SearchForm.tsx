"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchForm() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  function handleTextChange(e: React.FormEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }
  return (
    <form
      className="w-full"
      onSubmit={() => router.push(`/?medium=${searchTerm}`)}
    >
      <div className="pb-12">
        <div className="mt-10 grid-cols-1">
          <label
            htmlFor="medium"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Search by Medium
          </label>
          <div className="mt-2 flex flex-row gap-4">
            <input
              type="text"
              name="medium"
              id="medium"
              onChange={handleTextChange}
              className="p-4 block rounded-full w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blueberry_600 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blueberry_500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueberry_600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
