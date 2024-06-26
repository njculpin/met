"use client";
import Image from "next/image";
import { Object } from "../types";

export function ObjectList({ objects }: { objects: Object[] }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      {objects.map(function (obj: Object) {
        return (
          <div key={obj.objectID} className="space-y-6 mt-8">
            <div>
              {obj.primaryImageSmall ? (
                <Image
                  src={obj.primaryImageSmall}
                  alt={obj.objectName}
                  height={500}
                  width={500}
                  style={{ borderRadius: "8px" }}
                  className="aspect-square object-cover"
                />
              ) : (
                <PlaceholderImage />
              )}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-primary_text">
                {obj.objectName} - {obj.objectBeginDate}
              </h1>
              <p className="text-md text-secondary_text">{obj.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlaceholderImage() {
  return (
    <Image
      src={"/500x500.png"}
      height={500}
      width={500}
      alt="placeholder"
      style={{ borderRadius: "8px" }}
      className="aspect-square object-cover"
    />
  );
}
