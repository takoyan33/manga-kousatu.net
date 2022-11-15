import { useRouter } from "next/router";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import { SiteHead } from "../layouts/components/ui/SiteHead";
import Loginauth from "../layouts/api/auth/Loginauth";

export default function Login() {
  const router = useRouter();

  return (
    <div>
      <SiteHead />
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          ログイン
        </h2>

        <Loginauth />
      </div>
    </div>
  );
}
