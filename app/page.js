import { SECTIONS } from '@/config/sections';
import { getSiteContent } from '@/lib/content-service';
import { VIEWS } from '@/components/views';
import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import Section from '@/components/site/Section';

export const revalidate = 3600; // static page; the admin triggers an instant refresh on every change

const aboutOf = (content) => content.about?.[0]?.data ?? {};

export async function generateMetadata() {
  const about = aboutOf(await getSiteContent());
  return { title: about.name ? `${about.name}${about.title ? ' — ' + about.title : ''}` : 'Portfolio', description: about.bio?.slice(0, 160) };
}

export default async function Home() {
  const content = await getSiteContent();
  const about = aboutOf(content);
  return (
    <>
      <Navbar name={about.name} />
      <main>
        <Hero about={about} />
        {SECTIONS.map(({ key, label, view }) => {
          const items = (content[key] ?? []).map((e) => e.data);
          const View = VIEWS[view.type];
          return (
            <Section key={key} id={key} title={label} isEmpty={!items.length}>
              <View items={items} map={view.map} />
            </Section>
          );
        })}
      </main>
      <footer>© {new Date().getFullYear()} {about.name}</footer>
    </>
  );
}
