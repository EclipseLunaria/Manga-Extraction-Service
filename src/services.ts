import { openPage, screenshotElement, storePage } from "./utils";

export const extractChapter = async (mangaId: string, chapterId: string) => {
  const page = await openPage(`https://chapmanganato.to/manga-${mangaId}/chapter-${chapterId}`);

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
