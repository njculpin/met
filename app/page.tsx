"use client";
import { useState, useEffect } from "react";
import { GetBrowseData, GetObjectById, GetSearchData } from "./actions";
import { Object } from "./types";
import {
  ObjectList,
  SearchForm,
  SortForm,
  ImageFilterForm,
} from "./components";
export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  const [loading, setLoading] = useState<boolean>(false);
  const [originalObjects, setOriginalObjects] = useState<Object[]>([]);
  const [objects, setObjects] = useState<Object[]>([]);
  const [objectIds, setObjectIds] = useState<number[]>([]);
  const [hasImages, setHasImages] = useState<boolean>(false);
  const [sort, setSort] = useState<number>(0);

  useEffect(() => {
    async function GetData() {
      setLoading(true);
      const dataIds = await GetBrowseData();
      setObjectIds(dataIds);
      setLoading(false);
    }
    GetData();
  }, []);

  useEffect(() => {
    setObjectIds([]);
  }, [query]);

  useEffect(() => {
    async function GetData() {
      if (!query) {
        return;
      } else {
        setLoading(true);
        const dataIds = await GetSearchData({ q: query });
        setObjectIds(dataIds);
        setLoading(false);
      }
    }
    GetData();
  }, [query]);

  useEffect(() => {
    async function slowLoad() {
      const copy = [...objectIds];
      setObjects([]);
      while (copy.length) {
        const shift = copy.shift();
        if (!shift) {
          continue;
        }
        const data = await GetObjectById(shift);
        if (!data) {
          continue;
        }
        setObjects((prev) => [...prev, data]);
      }
    }
    slowLoad();
  }, [objectIds]);

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
        <div className="flex justify-center md:justify-between items-center md:px-16 py-4">
          <SearchForm />
          <div className="hidden md:flex flex-row space-x-16">
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
