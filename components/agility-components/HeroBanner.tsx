import {
  AgilityPic,
  ImageField,
  UnloadedModuleProps,
} from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"

interface IHeroBanner {
  title: string
  subTitle?: string
  backgroundImage?: {
    galleryId: number
    media?: Array<ImageField>
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
    <div className="relative w-full h-screen min-h-[500px] overflow-hidden">
      {/* Background images */}
      {mediaArray.length > 0 ? (
        <>
          {mediaArray.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full transition-opacity duration-1000 opacity-100"
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

      <div className="relative z-10 flex items-center justify-center h-full bg-black/40 px-4">
        <div className="text-center text-white max-w-4xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {fields.title}
          </h1>
          {fields.subTitle && (
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-8">
              {fields.subTitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
