import { getAuth } from 'firebase/auth'
import { SiteButton } from 'layouts/components/button'
import { CommonHead } from 'layouts/components/ui/CommonHead'

export default function Top() {
  const auth = getAuth()
  const user = auth.currentUser
  return (
    <div>
      <CommonHead />
      <div className='d-block m-auto my-20 w-80 md:flex md:w-full md:justify-center'>
        <div className='w-full md:w-6/12'>
          <h1 className='my-6 text-left text-4xl font-semibold text-sky-600'>Manga Study</h1>
          <p className='my-6 text-xl'>
            Manga Studyでは、人気漫画の考察を
            <br />
            自由に投稿・閲覧できるwebサイトです。
          </p>
        </div>
        <div className='w-full md:w-6/12'>
          <div className='text-center'>
            <img src='../images/top-home.png' className='m-auto my-6 w-64' alt='漫画のイラスト' />
          </div>
        </div>
      </div>
      <hr></hr>
      <h2 className='my-12 text-center text-2xl font-semibold'>機能</h2>
      <div className='d-block  m-auto my-20 w-80 md:flex md:w-full'>
        <div className='w-full md:w-1/3'>
          <img src='../images/top-1.png' className='m-auto my-6 w-64' alt='漫画のイラスト' />
          <h3 className='my-6 text-center text-2xl font-semibold text-sky-600'>記事の投稿</h3>
          <p className='my-6 px-4'>
            語りたい漫画の考察があったら、 <br />
            ログインをして、 記事を投稿しましょう。
          </p>
        </div>
        <div className='w-full md:w-1/3'>
          <img src='../images/top-2.png' className='m-auto my-6 w-64' alt='漫画のイラスト' />
          <h3 className='my-6 text-center text-2xl font-semibold text-sky-600'>記事の閲覧</h3>
          <p className='my-6 px-4'>
            Manga Studyでは、様々な記事が投稿されているため、
            <br />
            記事の閲覧や好きな漫画の考察を検索できます
          </p>
        </div>
        <div className='w-full md:w-1/3'>
          <img src='../images/top-3.png' className='m-auto my-6 w-64' alt='漫画のイラスト' />
          <h3 className='my-6 text-center text-2xl font-semibold text-sky-600'>コメント機能</h3>
          <p className='my-6 px-4'>
            コメント機能で、考察の内容について語ることができ、
            <br />
            より考察を深められます
          </p>
        </div>
      </div>
      <hr></hr>
      <div className='d-block m-auto my-20 bg-blue-200 p-10 md:flex'>
        <div className='w-full md:w-6/12'>
          <h2 className='my-6 text-center text-4xl font-semibold text-sky-600 md:text-left'>
            Join Manga Study
          </h2>
          <p className='my-6 text-center text-xl md:text-left'>漫画の考察記事を投稿、閲覧しよう</p>
          <div className='m-auto'>
            {!user && (
              <>
                <SiteButton
                  href='/register'
                  text='新規登録'
                  className='w-50 m-auto my-2 inline-block text-left'
                />
                <SiteButton
                  href='/login'
                  text='ログイン'
                  className='w-50 text-lef m-auto my-2 mx-4 inline-block'
                />
              </>
            )}
            <SiteButton
              href='/'
              text='記事を見る'
              className='w-50 text-lef m-auto my-2 inline-block'
            />
          </div>
        </div>
        <div className='w-full md:w-6/12'>
          <div className='text-center'>
            <img src='../images/top-search.png' className='m-auto my-6 w-64' alt='漫画のイラスト' />
          </div>
        </div>
      </div>
    </div>
  )
}
