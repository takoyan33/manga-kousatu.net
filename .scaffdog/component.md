---
name: "component"
root: "./layouts/components"
output: "**/*"
ignore: []
questions:
  name: "Please enter component name."
---

# `{{ inputs.name | pascal }}.tsx`

```typescript
import React from 'react'

interface  {{ inputs.name | pascal -}}Params {
  test: string
}

// eslint-disable-next-line react/display-name
export const  {{ inputs.name | pascal -}} = React.memo(
  ({test}: {{ inputs.name | pascal -}}Params) => {
    return (
      <>
      </>
    )
  },
)
