export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-20'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
// Debugging: Check if SANITY_API_TOKEN is being read
// console.log("🔍 SANITY_API_TOKEN from Next.js:", process.env.SANITY_API_TOKEN);
export const sanityToken = assertValue(
  process.env.SANITY_API_TOKEN,
  "Missing environment variable: SANITY_API_TOKEN"
);

export const sanityEditorToken = assertValue(
  process.env.SANITY_EDITOR_TOKEN,
  "Missing environment variable: SANITY_EDITOR_TOKEN"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
