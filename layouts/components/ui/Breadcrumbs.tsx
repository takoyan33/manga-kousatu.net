import Link from 'next/link'
import React from 'react'

interface BreadcrumbsParams {
  secondTitle: string
  secondUrl?: string
  thirdTitle?: string
  thirdUrl?: string
}

// eslint-disable-next-line react/display-name
export const Breadcrumbs = React.memo(
  ({ secondTitle, secondUrl, thirdTitle, thirdUrl }: BreadcrumbsParams) => {
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
