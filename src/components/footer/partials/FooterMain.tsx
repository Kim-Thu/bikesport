import { CompanyInfoLoader } from "@/components/company/CompanyInfoLoader";
import { Heading } from "@/components/heading/Heading";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { LogoLoader } from "@/components/logo/LogoLoader";
import { CMenu } from "@/components/menu/CMenu";
import { Section } from "@/components/section/Section";
import { SocialLoader } from "@/components/social/SocialLoader";
import type { FooterSettings } from "@/interfaces/footer.interface";
import { getMediaWithFallbackByIds } from "@/lib/media.utils";
import { getMenuById } from "@/lib/menu-data.utils";
import { FOOTER_LAYOUT_CLASS } from "@/variants/footer.variant";

export async function FooterMain({ settings }: { settings: FooterSettings }) {
  const menuIds = settings.menuIds ?? [];
  const menus = (await Promise.all(menuIds.map((menuId) => getMenuById(menuId)))).filter(
    (menu) => menu !== null,
  );
  const mediaIds = menus.flatMap((menu) =>
    menu.items.flatMap((item) => (item.mediaId ? [item.mediaId] : [])),
  );
  const mediaById = await getMediaWithFallbackByIds(mediaIds);
  const styles = FOOTER_LAYOUT_CLASS;

  return (
    <Container className={styles.container}>
      <Row className={styles.mainRow}>
        <Column className={styles.brandColumn}>
          <div className={styles.brandContent}>
            <LogoLoader href="/" />
            {settings.description ? (
              <p className={styles.description}>{settings.description}</p>
            ) : null}
            <SocialLoader />
          </div>
        </Column>

        <Column grow className={styles.menusColumn}>
          <Row className={styles.menusRow}>
            {menus.map((menu) => (
              <Column key={menu._id} className={styles.menuColumn}>
                <Section>
                  <Heading level={4} className={styles.menuHeading}>
                    {menu.name}
                  </Heading>
                  <CMenu
                    menu={menu}
                    mediaById={mediaById}
                    listClassName={styles.menuList}
                    linkClassName={styles.menuLink}
                  />
                </Section>
              </Column>
            ))}
          </Row>
        </Column>
      </Row>

      <div className={styles.companyInfo}>
        <CompanyInfoLoader />
      </div>
    </Container>
  );
}
