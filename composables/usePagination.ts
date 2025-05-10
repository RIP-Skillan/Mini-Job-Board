import { ref, computed } from 'vue'

export function usePagination<T>(items: Ref<T[]>, itemsPerPage = 5) {
  const currentPage = ref(1)

  const totalPages = computed(() =>
    Math.ceil(items.value.length / itemsPerPage)
  )

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return items.value.slice(start, start + itemsPerPage)
  })

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage
  }
}
