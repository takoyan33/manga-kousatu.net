import { SiteHead } from "../layouts/components/ui/SiteHead";

export default function Custom404() {
  return (
    <>
      <SiteHead />
      <h1 className="text-center m-10">ページが見つかりませんでした。</h1>
    </>
  );
}
