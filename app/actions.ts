import axios from "axios";
import { Department, Object, SearchParams } from "./types";
import { revalidatePath } from "next/cache";

const ROOT_URL = "https://collectionapi.metmuseum.org";
const MAX_OBJECTS = 80;

/**
 *  Get List of Departments to Search
 * @returns Department[]
 */
export async function GetDepartments(): Promise<Department[]> {
  try {
    const URL = ROOT_URL + "/public/collection/v1/departments";
    const req = await axios.get(URL);
    if (!req.data) {
      return [];
    }
    const departments = req.data.departments;
    revalidatePath("/");
    return departments;
  } catch (e) {
    // todo: handle errors for bad objects
    return [];
  }
}

/**
 *
 * @returns Object[] returns an array of Objects
 */
export async function GetObjects({
  searchParams,
}: {
  searchParams?: SearchParams;
}): Promise<Object[]> {
  let objects: Object[] = [];
  let objectIds: number[] = [];
  if (!searchParams) {
    return [];
  }
  objectIds = await Search(searchParams);
  if (!objectIds.length) {
    const res = await Browse();
    objectIds = res;
  }
  for (let i = 0; i < objectIds.length; i++) {
    const object = await GetObjectById(objectIds[i]);
    if (!object) {
      continue;
    }
    objects.push(object);
  }
  revalidatePath("/");
  return objects;
}

async function Browse(): Promise<number[]> {
  try {
    const URL = ROOT_URL + "/public/collection/v1/objects";
    const req = await axios.get(URL);
    if (!req.data) {
      return [];
    }
    const objectIds = req.data.objectIDs.slice(0, MAX_OBJECTS);
    if (!objectIds) {
      return [];
    }
    return objectIds;
  } catch (e) {
    // todo: handle errors for bad objects
    return [];
  }
}

/**
 *
 * @param q Returns a listing of all Object IDs for objects that contain the search query within the object’s data
 * @param isHighlight Returns objects that match the query and are designated as highlights. Highlights are selected works of art from The Met Museum’s permanent collection representing different cultures and time periods.
 * @param title Returns objects that match the query, specifically searching against the title field for objects.
 * @param tags Returns objects that match the query, specifically searching against the subject keyword tags field for objects.
 * @param departmentId Returns objects that are a part of a specific department. For a list of departments and department IDs, refer to our /department endpoint: https://collectionapi.metmuseum.org/public/collection/v1/departments
 * @param isOnView Returns objects that match the query and are on view in the museum.
 * @param artistOrCulture Returns objects that match the query, specifically searching against the artist name or culture field for objects.
 * @param medium Returns objects that match the query and are of the specified medium or object type. Examples include: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.
 * @param hasImages Returns objects that match the query and have images.
 * @param geoLocation Returns objects that match the query and the specified geographic location. Examples include: "Europe", "France", "Paris", "China", "New York", etc.
 * @param dateBegin Returns objects that match the query and fall between the dateBegin parameters. Must include dateEnd.
 * @param dateEnd Returns objects that match the query and fall between the dateEnd parameters. Must include dateBegin.
 * @returns number[] Returns an array of objectIds
 */
async function Search(searchParams: SearchParams): Promise<number[]> {
  try {
    let URL = ROOT_URL + "/public/collection/v1/search";
    let terms: string[] = [];

    if (searchParams.departmentId) {
      terms.push(`departmentId=${searchParams.departmentId}`);
    }
    if (searchParams.medium) {
      terms.push(`medium=${searchParams.medium.split(",").join("%7C")}`);
    }
    if (searchParams.q) {
      terms.push(`q=${searchParams.q.toLowerCase()}`);
    }
    if (searchParams.hasImages) {
      terms.push(`hasImages=${searchParams.hasImages}`);
    }
    if (!terms.length) {
      return [];
    }
    for (let i = 0; i < terms.length; i++) {
      if (i === 0) {
        URL += "?";
      }
      URL += terms[i];
      if (i < terms.length - 1 && terms.length > 1) {
        URL += "&";
      }
    }
    const req = await axios.get(URL);
    if (!req.data.objectIDs) {
      return [];
    }
    const objectIds = req.data.objectIDs.slice(0, MAX_OBJECTS);
    if (!objectIds) {
      return [];
    }
    return objectIds;
  } catch (e) {
    // todo: handle errors for bad objects
    return [];
  }
}

/**
 * Providing an object ID will return a Promise with an Object if available
 * @param id Object ID
 * @returns Object | undefined
 */
export async function GetObjectById(id: number): Promise<Object | undefined> {
  try {
    const URL = ROOT_URL + "/public/collection/v1/objects/" + id;
    const req = await axios.get(URL);
    const object = req.data as Object;
    if (!object) {
      return undefined;
    }
    return object;
  } catch (e) {
    // todo: handle errors for bad objects
    return undefined;
  }
}
