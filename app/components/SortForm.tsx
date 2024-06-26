"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function SortForm({
  sort,
  setSort,
}: {
  sort: number;
  setSort: (sort: number) => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          {sort === 0 ? <p>Ascending </p> : <p>Descending </p>}
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {[
            { id: 0, name: "Ascending " },
            { id: 1, name: "Descending " },
          ].map((option) => (
            <MenuItem key={option.name}>
              {({ focus }) => (
                <button
                  onClick={() => setSort(option.id)}
                  className={classNames(
                    option.id === sort
                      ? "font-medium text-gray-900"
                      : "text-gray-500",
                    focus ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row space-x-2">
                    {option.id === sort ? (
                      <div className="w-4 h-4">
                        <CheckIcon />
                      </div>
                    ) : (
                      <div className="w-4 h-4" />
                    )}
                    <p className="font-regular">{option.name}</p>
                  </div>
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
