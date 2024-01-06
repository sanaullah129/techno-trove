import Image from "next/image"

const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-sky-400 to-sky-900 mb-4">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Techno Trove</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Discover the Future: Your Ultimate Techno Trove for Cutting-edge Gadgets.</p>
                    {/* <button
                        type="button"
                        className="text-white bg-gradient-to-l from-teal-400 via-teal-500 to-teal-600 hover:from-teal-800 hover:via-teal-800 hover:to-teal-900 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Shop Now
                    </button> */}
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 relative aspect-video">
                    <Image src="/banner-image.png" alt="banner-image" height={300} width={300} className="object-contain" />
                </div>
            </div>
        </div>
    )
}

export default HomeBanner