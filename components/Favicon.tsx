const Favicon = () => {
  return (
    <>
      <link
        rel="icon"
        media="(prefers-color-scheme: light)"
        href="/light-theme-logo.png"
      />
      <link
        rel="icon"
        media="(prefers-color-scheme: dark)"
        href="/dark-theme-logo.png"
      />
    </>
  );
};

export default Favicon;
