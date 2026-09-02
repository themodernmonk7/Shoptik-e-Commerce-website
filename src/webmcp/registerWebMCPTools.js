import { buildWebMCPTools } from "./tools"

export const registerWebMCPTools = (stateRef) => {
  if (!document.modelContext?.registerTool) return () => {}

  const controller = new AbortController()
  const { signal } = controller

  buildWebMCPTools(stateRef).forEach((tool) => {
    document.modelContext.registerTool(tool, { signal }).catch(() => {})
  })

  return () => controller.abort()
}
