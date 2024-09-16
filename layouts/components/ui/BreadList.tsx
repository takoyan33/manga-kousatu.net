import Link from 'next/link'
import React from 'react'

interface BreadListParams {
  secondTitle: string
  secondUrl?: string
  thirdTitle?: string
  thirdUrl?: string
}

// eslint-disable-next-line react/display-name
export const BreadList = React.memo(
  ({ secondTitle, secondUrl, thirdTitle, thirdUrl }: BreadListParams) => {
    return (
      <div>
        <Link href='/'>トップ</Link>
        {secondTitle && (
          <span>
            ＞ <Link href={secondUrl || '/'}>{secondTitle}</Link>
          </span>
        )}
        {thirdTitle && (
          <span>
            ＞<Link href={thirdUrl || '/'}>{thirdTitle}</Link>
          </span>
        )}
      </div>
    )
  },
)
