import { screenshotElement, storePage } from "./utils";
import { getBrowser } from "./utils/browserGlobal";

export const extractChapter = async (mangaId: string, chapterId: string) => {
  console.log(`Extracting chapter ${chapterId} from manga ${mangaId}`);
  
  const browser = await getBrowser();
  const page = await browser.newPage();
  const chapterUrl = `https://chapmanganato.to/manga-${mangaId}/chapter-${chapterId}`;

  await page.goto(chapterUrl);
  console.log(chapterUrl);

  const chapterUrlsPromises = (await page.$$(".container-chapter-reader img")).map(async (element, index) => {
        const screenshot = await screenshotElement(element, page);
        if (screenshot) {
            // await storePage(mangaId, chapterId, index, screenshot);
        }
        return `/manga-${mangaId}/chapter-${chapterId}/page-${index}`;
  });

  return await Promise.all(chapterUrlsPromises);

};

export default { extractChapter };
