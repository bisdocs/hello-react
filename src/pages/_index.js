import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';



export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Learn React by Biswajit Sundara <head />">
      <main>
        <h1>Hello</h1>
      </main>
    </Layout>
  );
}
