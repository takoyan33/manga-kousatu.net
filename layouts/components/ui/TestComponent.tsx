interface TestComponentParams {
  test: string
}

// eslint-disable-next-line react/display-name
export const TestComponent = React.memo(({ test }: TestComponentParams) => {
  return <></>
})
