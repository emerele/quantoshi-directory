import fs from "fs";
import path from "path";

const categoriesDirectory = path.join(process.cwd(), "src/data");

export const getAllCategorySlugs = () => {
  try {
    const fileNames = fs.readdirSync(categoriesDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".json"))
      .map((fileName) => ({
        params: {
          id: fileName.replace(/\.json$/, ""),
        },
      }));
  } catch (error) {
    console.error("Error getting category slugs:", error);
    return [];
  }
};

export const getCategoryData = (slug) => {
  try {
    const fullPath = path.join(categoriesDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const data = JSON.parse(fileContents);
    return data.features || [];
  } catch (error) {
    console.error("Error processing JSON file:", error);
    return [];
  }
};
