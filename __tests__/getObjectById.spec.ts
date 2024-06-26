import { GetObjectById } from "../app/actions";

it("get object", async () => {
  const object = await GetObjectById(1);
  const objectId = object?.objectID;
  expect(objectId).toBe(1);
});
