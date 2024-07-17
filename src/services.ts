import { openPage, screenshotElement } from "./utils";
import { uploadFileToS3 } from "./utils/s3Tools";
export const extractChapter = async (mangaId: string, chapterId: string) => {
  const page = await openPage(`https://chapmanganato.to/manga-${mangaId}/chapter-${chapterId}`);

  const chapterUrlsPromises = (await page.$$(".container-chapter-reader img"))
    .map(async (element, index) => {
        const screenshot = await screenshotElement(element, page);
        if (screenshot) {
          await uploadFileToS3(`manga-${mangaId}/chapter-${chapterId}/page-${index}.jpg`, screenshot);
        }
        return `manga-${mangaId}/chapter-${chapterId}/page-${index}`;
  });

  return await Promise.all(chapterUrlsPromises);

};

export default { extractChapter };
