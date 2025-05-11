/**
 * Composable function for handling pagination of a list of items.
 *
 * @template T The type of items in the list.
 * @param {Ref<T[]>} items - A ref containing the list of items to paginate.
 * @param {number} [itemsPerPage=5] - The number of items to display per page. Defaults to 5.
 * @returns {{
 *   currentPage: Ref<number>;
 *   totalPages: ComputedRef<number>;
 *   paginatedItems: ComputedRef<T[]>;
 *   goToPage: (page: number) => void;
 * }} An object containing the current page, total pages, paginated items for the current page, and a function to navigate to a specific page.
 */
 

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
