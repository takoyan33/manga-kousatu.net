resource "vercel_project" "example" {
  name      = "sample-blog-nextjs-app"
  framework = "nextjs"
 
  git_repository = {
    type = "github"
    # ユーザー名/リポジトリ名は置き換えてください
    repo = "takoyan33/manga--kousatu--net"
  }
}