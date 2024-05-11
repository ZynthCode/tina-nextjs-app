/**
 * Without this you will get trouble when trying to parse data from server to client components.
 * This only seem to happens when using the databaseClient (when adding a backend).
 */
export const fixTinaResults = <T>(data: T): T => {
  try {
    const serializedData = JSON.stringify(data);
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error("Error in serializing/deserializing data:", error);
    throw new Error("Handling data failed");
  }
};
