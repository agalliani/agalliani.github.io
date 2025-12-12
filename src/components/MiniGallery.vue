<script setup lang="ts">
import { ref, reactive } from 'vue'

defineProps<{
  images: string[]
}>()

const selectedImage = ref<string | null>(null)
const failedImages = reactive(new Set<string>())

const openLightbox = (image: string) => {
  selectedImage.value = image
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeLightbox = () => {
  selectedImage.value = null
  document.body.style.overflow = '' // Restore scrolling
}

const onImageError = (image: string) => {
  console.warn(`[MiniGallery] Image not found: ${image}`)
  failedImages.add(image)
}
</script>

<template>
  <div v-if="images && images.length > 0" class="my-4">
    <!-- Thumbnail Strip -->
    <div class="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      <template v-for="(image, index) in images" :key="index">
        <div 
          v-if="!failedImages.has(image)"
          class="flex-shrink-0 snap-start cursor-pointer group relative"
          @click="openLightbox(image)"
        >
          <img 
            :src="image" 
            alt="Gallery thumbnail" 
            class="h-24 w-auto rounded-md border border-white/10 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400/50"
            loading="lazy"
            @error="onImageError(image)"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-md"></div>
        </div>
      </template>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div 
        v-if="selectedImage" 
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        @click.self="closeLightbox"
      >
        <button 
          @click="closeLightbox"
          class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 focus:outline-none"
        >
          <i class="fas fa-times text-3xl"></i>
        </button>
        
        <img 
          :src="selectedImage" 
          alt="Full size view" 
          class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
        />
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
