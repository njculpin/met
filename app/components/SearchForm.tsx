"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export function SearchForm({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  function handleTextChange(e: React.FormEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  return (
    <div className="space-x-4 bg-white">
      <div className="flex flex-row gap-4 p-2">
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <form onSubmit={() => setSearchTerm(searchTerm)}>
              <input
                id="search"
                name="search"
                className="block w-full rounded-full border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                placeholder="Search"
                onChange={handleTextChange}
                type="search"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
