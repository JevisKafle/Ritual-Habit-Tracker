# API usage audit and optimization list

This is a code audit focused on reducing unnecessary API requests and reusing already-fetched data.

## 1) Re-fetching the same user data in multiple places
- Problem: both the navbar and the profile page call `getMe()` separately.
- Why it is bad: the same user profile is fetched more than once for the same session, even though the result is already available.
- Better approach: fetch the user once with React Query, cache the result, and reuse it in all components.
- Rule of thumb: if the same response is already in cache, use it instead of making another request.

## 2) Reusing cached habit data instead of refetching
- Problem: the detail page already calls `useHabits()`, then searches the list for the selected habit. It also calls `useHabitStats(id)` separately.
- Why it is bad: the app is fetching the full habit list and then separately fetching stats for the selected habit. That is more network work than needed when the list already holds the current habit state.
- Better approach: use the already-fetched habits query as the main source of truth, and only fetch the extra stats when needed.
- Rule of thumb: derive data from cached API responses before requesting a second endpoint for the same resource.

## 3) Fetching all habits when only one habit is needed
- Problem: `useHabits()` is used in the detail page to get the list and then `find()` the habit by ID.
- Why it is bad: this is a broad fetch for a narrow use case.
- Better approach: if the backend supports a detail endpoint, fetch the specific habit by ID. If not, keep the list query but avoid additional duplicate requests for the same resource.
- Rule of thumb: fetch the smallest data set needed for the screen.

## 4) Duplicate API request pattern from local state + effect calls
- Problem: several components use local `useState` and `useEffect` to fetch data, then store it in component state.
- Why it is bad: this bypasses the app’s query cache and can cause extra fetches on route changes or remounts.
- Better approach: keep data in React Query and let it handle caching, revalidation, and deduplication.
- Rule of thumb: do not manually re-fetch data in component effects when a query layer is already in place.

## 5) Over-invalidating queries after every mutation
- Problem: many mutations call `invalidateQueries({ queryKey: ["habits"] })` after a change.
- Why it is bad: it re-fetches the same list even when the mutation already updated the local cache. This creates extra network traffic and can cause UI jitter.
- Better approach: update the cache optimistically and invalidate only the query(s) that truly need fresh server data after the mutation completes.
- Rule of thumb: prefer local cache updates before a full refetch.

## 6) Stale, duplicated date logic in multiple places
- Problem: the code repeatedly does `new Date().toISOString().split("T")[0]` in multiple mutation handlers.
- Why it is bad: this is repeated logic and can behave inconsistently across time zones or if the server expects a different date boundary.
- Better approach: centralize date calculation in one helper and make the whole app use the same date source.
- Rule of thumb: don't compute the same concept in multiple components and hooks.

## 7) Local state is being used as a second source of truth
- Problem: the app keeps server data in React Query and also keeps derived UI values locally in components.
- Why it is bad: the UI can drift from the server if the derived values and cached values are not synchronized.
- Better approach: compute derived values directly from the cached data instead of duplicating state.
- Rule of thumb: one source of truth is better than multiple partial copies.

## 8) Empty or weak fallback handling around authentication refresh
- Problem: `authFetch()` refreshes the token on 401 and then redirects to login if refresh fails.
- Why it is bad: the logic is correct in spirit, but it mixes fetch logic, auth state mutation, and redirect behavior in one place. It is harder to reuse and easier to break.
- Better approach: separate token refresh logic from request execution and keep auth state concerns in one auth layer.
- Rule of thumb: keep network orchestration and app navigation concerns independent.

## 9) Fetching metrics that may already be derivable from the habit list
- Problem: stats are requested in a separate query while the habits list already has check-in information.
- Why it is bad: the UI is asking the server for a second set of stats instead of deriving them from data already loaded.
- Better approach: only fetch stats when the screen really needs them, or compute the most common values from the habits cache first.
- Rule of thumb: do not fetch a second copy of information when you can derive it from your first response.

## 10) Unnecessary request churn from route-based re-renders
- Problem: the navbar refetches login/user data whenever `pathname` changes, and other pages re-trigger effects on mount.
- Why it is bad: route changes can create repeated same-requests even when the user data has not changed.
- Better approach: use a single query with a stable cache key and `enabled` conditions, instead of firing data fetches on every route navigation.
- Rule of thumb: avoid network work during purely UI navigation changes if the data is already cached.

## Best-practice summary
- Use React Query as the app-level data cache.
- Reuse cached API responses before calling the network again.
- Fetch only the data a screen actually needs.
- Avoid redundant invalidations when local mutation updates already cover the change.
- Keep date, auth, and data-mapping logic centralized.

## Highest-priority optimization order
1. Reuse cached user data across navbar/profile.
2. Stop duplicate habit fetches and avoid extra network calls on detail screens.
3. Reduce invalidations after optimistic updates.
4. Centralize date logic and API-mapping helpers.
5. Only fetch stats when the page truly needs fresh data.
