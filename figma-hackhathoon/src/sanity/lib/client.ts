import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, sanityEditorToken, sanityToken } from '../env'


// Viewer Client (Read-Only)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: sanityToken,
  useCdn: true,
})

// Editor Client (Write)
export const editorClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: sanityEditorToken, // Write Token
  useCdn: false, // Real-time updates
});