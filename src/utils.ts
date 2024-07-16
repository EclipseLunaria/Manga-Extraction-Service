import { ElementHandle, Page } from "puppeteer";
import axios from "axios";
import { config } from "./config";

export const isDev = process.env.RUNTIME_ENVIRONMENT !== "docker";

export const screenshotElement = async (
  element: ElementHandle,
  page: Page
): Promise<Buffer | null> => {
  const boundingBox = await element.boundingBox();
  if (!boundingBox || boundingBox.height < 1000) {
    return null;
  }

  await page.evaluate((boundingBox) => {
    window.scrollTo(boundingBox.x, boundingBox.y);
  }, boundingBox);

  return await element.screenshot({
    type: "jpeg",
    quality: 70,
  });
};

export const storePage = async (
  mangaId: string,
  chapterId: string,
  pageNumber: number,
  screenshot: Buffer
) => {
  const url = `${config.STORAGE_HOST}/storage/upload/manga-${mangaId}/chapter-${chapterId}/page-${pageNumber}.jpg`;
  console.log(`Storing page ${pageNumber} to ${url}`);
  await axios.post(url, screenshot, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
};

export default { screenshotElement };
