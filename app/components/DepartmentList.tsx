import { Department } from "../types";
import Link from "next/link";

export async function DepartmentList({
  departments,
}: {
  departments: Department[];
}) {
  return (
    <div className="col-span-1 grid grid-cols-1 gap-2">
      {departments.map(function (department: Department) {
        return (
          <div key={department.departmentId}>
            <Link href={`?departmentId=${department.departmentId}`}>
              <h1 className="font-bold">{department.displayName}</h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
