import { ContactDialogProvider } from "@/components/contact/contact-dialog";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { clean } from "@/lib/format";
import { site } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContactDialogProvider email={clean(site.email)}>
      <SkipLink />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </ContactDialogProvider>
  );
}
