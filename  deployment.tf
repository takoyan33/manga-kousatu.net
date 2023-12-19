resource "vercel_deployment" "example" {
  project_id  = vercel_project.example.id
  ref        = "main"
  production  = true
}