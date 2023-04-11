import Loginauth from '../layouts/api/auth/Loginauth'
import { CommonHead } from '../layouts/components/ui/CommonHead'
import { SiteButton } from '../layouts/components/button'

export default function Top() {
  return (
    <div>
      <CommonHead />
      <div className='flex my-20'>
        <div className='w-6/12'>
          <h2 className='my-6 text-left text-4xl font-semibold text-sky-600'>Manga Study</h2>
          <p className='my-6 text-xl '>
            Manga Studyでは、人気漫画の考察を
            <br />
            自由に投稿・閲覧できるwebサイトです。
          </p>
        </div>
        <div className='w-6/12'>
          <div className='text-center'>
            <img src='./images/top-home.png' className='w-64 my-6 m-auto' alt='漫画のイラスト' />
          </div>
        </div>
      </div>
      <hr></hr>
      <h2 className='my-12 text-center text-2xl font-semibold'>機能</h2>
      <div className='flex my-20'>
        <div className='w-1/3'>
          <img src='./images/top-1.png' className='w-64 my-6 m-auto' alt='漫画のイラスト' />
          <h2 className='my-6 text-center text-2xl font-semibold text-sky-600'>記事の投稿</h2>
          <p className='my-6 px-4'>
            語りたい漫画の考察があったら、 <br></br>ログインをして、 記事を投稿しましょう。
          </p>
        </div>
        <div className='w-1/3'>
          <img src='./images/top-2.png' className='w-64 my-6 m-auto' alt='漫画のイラスト' />
          <h2 className='my-6 text-center text-2xl font-semibold text-sky-600'>記事の閲覧</h2>
          <p className='my-6 px-4'>
            Manga Studyでは、様々な記事が投稿されているため、<br></br>
            記事の閲覧や好きな漫画の考察を検索できます
          </p>
        </div>
        <div className='w-1/3'>
          <img src='./images/top-3.png' className='w-64 my-6 m-auto' alt='漫画のイラスト' />
          <h2 className='my-6 text-center text-2xl font-semibold text-sky-600'>コメント機能</h2>
          <p className='my-6 px-4'>
            コメント機能で、考察の内容について語ることができ、<br></br>
            より考察を深められます
          </p>
        </div>
      </div>
      <hr></hr>
      <div className='flex my-20 bg-blue-200 p-10'>
        <div className='w-6/12'>
          <h2 className='my-6 text-left text-4xl font-semibold text-sky-600'>Join Manga Study</h2>
          <p className='my-6 text-xl '>漫画の考察記事を投稿、閲覧しよう</p>
          <SiteButton
            href='/register'
            text='新規登録'
            className='m-auto w-50 my-2 text-left inline-block'
          />
          <SiteButton
            href='/login'
            text='ログイン'
            className='m-auto w-50 my-2 mx-4 text-lef inline-block'
          />
          <SiteButton
            href='/top'
            text='記事を見る'
            className='m-auto w-50 my-2 text-lef inline-block'
          />
        </div>
        <div className='w-6/12'>
          <div className='text-center'>
            <img src='./images/top-search.png' className='w-64 my-6 m-auto' alt='漫画のイラスト' />
          </div>
        </div>
      </div>
    </div>
  )
}
