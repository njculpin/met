"use client";
import { useState, useEffect } from "react";
import { GetBrowseData, GetSearchData } from "./actions";
import { Object } from "./types";
import {
  ObjectList,
  SearchForm,
  SortForm,
  ImageFilterForm,
} from "./components";
export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [originalObjects, setOriginalObjects] = useState<Object[]>([]);
  const [objects, setObjects] = useState<Object[]>([]);
  const [hasImages, setHasImages] = useState<boolean>(false);
  const [sort, setSort] = useState<number>(0);

  useEffect(() => {
    async function GetData() {
      if (!searchTerm) {
        setLoading(true);
        const data = await GetBrowseData();
        setObjects(data);
        setLoading(false);
      }
    }
    GetData();
  }, []);

  useEffect(() => {
    async function GetData() {
      if (!searchTerm) {
        return;
      } else {
        setLoading(true);
        const data = await GetSearchData({ q: searchTerm });
        setObjects(data);
        setLoading(false);
      }
    }
    GetData();
  }, [searchTerm]);

  useEffect(() => {
    async function sortData() {
      if (sort === 1) {
        const data = objects.sort(
          (a, b) => a.objectBeginDate - b.objectBeginDate
        );
        setObjects(data);
      } else {
        const data = objects.sort(
          (a, b) => b.objectBeginDate - a.objectBeginDate
        );
        setObjects(data);
      }
    }
    sortData();
  }, [sort]);

  useEffect(() => {
    async function filterData() {
      if (!hasImages) {
        setObjects(originalObjects);
      } else {
        setOriginalObjects(objects);
        const data = objects.filter(
          (x) =>
            x.primaryImage || x.primaryImageSmall || x.additionalImages.length
        );
        setObjects(data);
      }
    }
    filterData();
  }, [hasImages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-16 lg:p-24 bg-background_blue">
      <div className="fixed z-100 top-0 left-0 right-0 shadow-sm  bg-white">
        <div className="flex justify-center md:justify-between items-center md:px-16">
          <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="hidden md:flex flex-row space-x-4">
            <SortForm sort={sort} setSort={setSort} />
            <ImageFilterForm
              hasImages={hasImages}
              setHasImages={() => setHasImages(!hasImages)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="max-w-7xl">
          {loading ? <p>loading</p> : <></>}
          <ObjectList objects={objects} />
        </div>
      </div>
    </main>
  );
}
