import { Object } from "../types";

export async function ObjectList({ objects }: { objects: Object[] }) {
  if (!objects.length) {
    return <p>No Objects Found</p>;
  }
  return (
    <div className="grid grid-cols-4 gap-2">
      {objects.map(function (obj: Object) {
        return <div key={obj.objectID}>{obj.objectName}</div>;
      })}
    </div>
  );
}
