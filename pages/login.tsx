import { useRouter } from "next/router";
import { SiteHead } from "../layouts/components/ui/SiteHead";
import Loginauth from "../layouts/api/auth/Loginauth";

export default function Login() {
  return (
    <div>
      <SiteHead />
      <h2 className="m-5 my-12 text-center text-2xl font-semibold">ログイン</h2>

      <Loginauth />
    </div>
  );
}
