import puppeteer from "puppeteer";
import { screenshotElement, storePage } from "./utils";

export const extractChapter = async (mangaId: string, chapterId: string) => {
  console.log(`Extracting chapter ${chapterId} from manga ${mangaId}`);
  const chapterUrl = `https://chapmanganato.to/manga-${mangaId}/chapter-${chapterId}`;
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(chapterUrl);
  console.log(chapterUrl);
  let pageNumber = 0;
  const pageUrls = [];
  for (const element of await page.$$(".container-chapter-reader img")) {
    const screenshot = await screenshotElement(element, page);
    if (screenshot) {
      // save screenshot to s3
      await storePage(mangaId, chapterId, pageNumber, screenshot);
      pageUrls.push(
        `/manga-${mangaId}/chapter-${chapterId}/page-${pageNumber}`
      );
      console.log(`Saved page ${pageNumber}`);
      pageNumber++;
    }
  }

  await browser.close();
  return pageUrls;
};

export default { extractChapter };
