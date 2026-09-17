import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, Keyboard } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const ProjectGallery = ({ images = [] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [fullscreenIndex, setFullscreenIndex] = useState(null)

    if (images.length === 0) return null

    return (
        <div>
            <Swiper
                modules={[Navigation, Thumbs, Keyboard]}
                navigation
                keyboard
                thumbs={{ swiper: thumbsSwiper }}
                loop={images.length > 1}
                className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
                {images.map((img, i) => (
                    <SwiperSlide key={img.publicId || i}>
                        <img
                            src={img.url}
                            alt={img.altText || `Screenshot ${i + 1}`}
                            loading="lazy"
                            onClick={() => setFullscreenIndex(i)}
                            className="h-[420px] w-full cursor-zoom-in object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={Math.min(images.length, 5)}
                    spaceBetween={10}
                    watchSlidesProgress
                    className="mt-3"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={img.publicId || i} className="cursor-pointer">
                            <img
                                src={img.url}
                                alt=""
                                loading="lazy"
                                className="h-20 w-full rounded-lg object-cover opacity-60 transition hover:opacity-100"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <AnimatePresence>
                {fullscreenIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setFullscreenIndex(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
                    >
                        <button
                            onClick={() => setFullscreenIndex(null)}
                            className="absolute right-6 top-6 text-white"
                            aria-label="Close fullscreen"
                        >
                            <X size={28} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            src={images[fullscreenIndex].url}
                            alt=""
                            className="max-h-full max-w-full rounded-lg object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProjectGallery