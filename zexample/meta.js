import MetaTags from './MetaTags';

const HomePage = () => {
  const meta = {
    title: "Home Page",
    description: "Welcome to the home page of our amazing website.",
    keywords: "home, amazing, website, SEO",
    author: "Your Company",
    og: {
      title: "Home Page - Amazing Website",
      description: "Explore the amazing content on our home page.",
      image: "https://example.com/og-image.jpg",
      url: "https://example.com/home",
    },
    canonical: "https://example.com/home",
  };

  return (
    <>
      <MetaTags meta={meta} />
      <h1>Welcome to Our Home Page</h1>
    </>
  );
};
