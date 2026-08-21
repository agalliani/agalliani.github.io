<script setup lang="ts">
import { RouterLink } from 'vue-router'

// The visible half of the BreadcrumbList emitted in JSON-LD (see
// composables/useStructuredData). Google asks that the two agree: markup
// describing a hierarchy the page doesn't actually show is a structured-data
// violation, not a shortcut. Both are fed from the same `trail` array in the
// view, so they can't drift.
//
// Semantics matter as much as the pixels here: an ordered list inside a
// labelled <nav> is what tells a screen reader (and a parser) that these links
// are a path, and the last item is the current page — a link to itself, so it
// is rendered as text with aria-current instead.

defineProps<{ items: { name: string; path: string }[] }>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="text-[14px] text-ink-faint">
    <ol class="m-0 flex list-none flex-wrap items-center gap-2 p-0">
      <li v-for="(item, i) in items" :key="item.path" class="flex items-center gap-2">
        <span v-if="i > 0" aria-hidden="true" class="text-line-strong">/</span>
        <RouterLink
          v-if="i < items.length - 1"
          :to="item.path"
          class="font-medium no-underline transition-colors hover:text-ink"
        >
          {{ item.name }}
        </RouterLink>
        <!-- Current page: truncated because a post title is a full sentence. -->
        <span v-else aria-current="page" class="max-w-[42ch] truncate text-ink-soft">
          {{ item.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>
