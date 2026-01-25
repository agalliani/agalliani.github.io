<script setup lang="ts">
import { ref, reactive, onUnmounted, watch } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const selectedIndex = ref<number>(-1)
const failedImages = reactive(new Set<string>())

const openLightbox = (index: number) => {
  selectedIndex.value = index
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeLightbox = () => {
  selectedIndex.value = -1
  document.body.style.overflow = '' // Restore scrolling
}

const nextImage = () => {
  if (selectedIndex.value === -1) return
  selectedIndex.value = (selectedIndex.value + 1) % props.images.length
}

const prevImage = () => {
  if (selectedIndex.value === -1) return
  selectedIndex.value = (selectedIndex.value - 1 + props.images.length) % props.images.length
}

const onImageError = (image: string) => {
  console.warn(`[MiniGallery] Image not found: ${image}`)
  failedImages.add(image)
}

const isVideo = (url: string) => {
  return /\.(mp4|webm|mov)($|\?)/i.test(url)
}

// Keyboard Navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (selectedIndex.value === -1) return
  
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

// Attach listeners only when lightbox is open
watch(selectedIndex, (newVal) => {
  if (newVal !== -1) {
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="images && images.length > 0" class="my-4">
    <!-- Thumbnail Strip -->
    <div class="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      <template v-for="(image, index) in images" :key="index">
        <div 
          v-if="!failedImages.has(image)"
          class="flex-shrink-0 snap-start cursor-pointer group relative"
          @click="openLightbox(index)"
        >
          <video 
            v-if="isVideo(image)"
            :src="image" 
            class="h-24 w-auto rounded-md border border-white/10 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400/50"
            muted
            playsinline
            @error="onImageError(image)"
          ></video>
          <img 
            v-else
            :src="image" 
            alt="Gallery thumbnail" 
            class="h-24 w-auto rounded-md border border-white/10 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400/50"
            loading="lazy"
            @error="onImageError(image)"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-md flex items-center justify-center">
            <i v-if="isVideo(image)" class="fas fa-play text-white/80 text-lg opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"></i>
          </div>
        </div>
      </template>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div 
        v-if="selectedIndex !== -1" 
        class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
        @click.self="closeLightbox"
      >
        <!-- Close Button -->
        <button 
          @click="closeLightbox"
          class="absolute top-4 right-4 z-50 text-slate-400 hover:text-white hover:bg-white/10 rounded-full w-12 h-12 flex items-center justify-center transition-all focus:outline-none"
          title="Close (Esc)"
        >
          <i class="fas fa-times text-2xl"></i>
        </button>
        
        <!-- Main Image Helper Container for layout -->
        <div class="relative w-full max-w-6xl flex-grow flex items-center justify-center px-12 mb-24">
          
          <!-- Prev Button -->
          <button 
            @click.stop="prevImage"
            class="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full w-12 h-12 flex items-center justify-center transition-all focus:outline-none"
            title="Previous (Left Arrow)"
          >
            <i class="fas fa-chevron-left text-3xl"></i>
          </button>

          <!-- The Media -->
          <video
            v-if="isVideo(images[selectedIndex])"
            :src="images[selectedIndex]"
            :key="`vid-${selectedIndex}`"
            controls
            autoplay
            loop
            class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/5 bg-black"
          ></video>
          <img 
            v-else
            :src="images[selectedIndex]" 
            :key="`img-${selectedIndex}`"
            alt="Full size view" 
            class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/5 bg-black"
          />

          <!-- Next Button -->
          <button 
            @click.stop="nextImage"
            class="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full w-12 h-12 flex items-center justify-center transition-all focus:outline-none"
            title="Next (Right Arrow)"
          >
            <i class="fas fa-chevron-right text-3xl"></i>
          </button>
        </div>

        <!-- Bottom Navigation Strip -->
        <div class="fixed bottom-6 left-0 right-0 flex justify-center px-4">
          <div class="bg-black/50 backdrop-blur-sm p-2 rounded-xl border border-white/10 max-w-full overflow-x-auto flex gap-2">
            <template v-for="(image, index) in images" :key="index">
              <button
                v-if="!failedImages.has(image)"
                @click.stop="openLightbox(index)"
                class="relative group focus:outline-none transition-all duration-200"
                :class="index === selectedIndex ? 'scale-110 opacity-100 ring-2 ring-amber-500 rounded-md z-10' : 'opacity-50 hover:opacity-100 hover:scale-105'"
              >
                <video
                  v-if="isVideo(image)"
                  :src="image"
                  class="h-12 w-auto object-cover rounded-md shadow-lg"
                  muted
                  playsinline
                ></video>
                <img 
                  v-else
                  :src="image" 
                  class="h-12 w-auto object-cover rounded-md shadow-lg" 
                  alt="Thumbnail"
                />
              </button>
            </template>
          </div>
        </div>

      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Custom scrollbar for Webkit browsers */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(51, 65, 85, 0.5);
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(245, 158, 11, 0.5);
}
</style>
