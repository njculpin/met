import { Suspense } from "react";
import { GetObjects, GetDepartments } from "./actions";
import { SearchParams } from "./types";
import { ObjectList, SearchForm } from "./components";
import { DepartmentList } from "./components/DepartmentList";

export default async function Page({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const departments = await GetDepartments();
  const objects = await GetObjects({ searchParams });
  return (
    <main className="flex justify-center items-center">
      <div className="flex max-w-7xl min-h-screen flex-col items-center justify-between p-24">
        <SearchForm />
        <div className="grid grid-cols-5 gap-8">
          <Suspense fallback={<p>Loading departments...</p>}>
            <DepartmentList departments={departments} />
          </Suspense>
          <Suspense fallback={<p>Loading objects...</p>}>
            <ObjectList objects={objects} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
