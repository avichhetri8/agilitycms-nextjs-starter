import {
  AgilityPic,
  ImageField,
  UnloadedModuleProps,
  URLField,
} from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import AgilityLink from "components/common/AgilityLink"

interface IHeroBanner {
  title: string,
  url: URLField,
  backgroundImage?: {
    galleryId: number
    media: Array<ImageField>
  }
}

const HeroBanner = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields } = await getContentItem<IHeroBanner>({
    contentID: module.contentid,
    languageCode,
  })
  console.log("fields =>>", fields)
  if (!fields) return null

  const backgroundImage = fields.backgroundImage
  const mediaArray = backgroundImage?.media || []
  console.log("media =>>", mediaArray)

  return (
    <div className="relative px-8">
      <div className="max-w-(--breakpoint-xl) mx-auto py-20 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300 rounded-lg relative h-[60vh]">
        {/* Background images */}
        {mediaArray.length > 0 ? (
          <>
            {mediaArray.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000 opacity-100"
              >
                <AgilityPic
                  image={image}
                  className="w-full h-full object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}

        <div className="absolute inset-x-0 bottom-0 flex justify-center p-8">
          
          <h2
              data-agility-field="title"
              className="font-display md:text-2xl mt-8 px-8 py-3 text-secondary-500 dark:text-secondary-200 tracking-wide text-center lg:leading-tight  md:text-left"
            >
              {fields.title}
            </h2>
          <AgilityLink text={fields.url.text || "Learn More"} url={fields.url.href} target={fields.url.target} className="inline-block mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-600 focus:outline-hidden focus:border-primary-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"/>
        </div>

      </div>
    </div>

  )
}

export default HeroBanner
