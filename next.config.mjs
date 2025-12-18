import nextra from "nextra";
const withNextra = nextra({
  defaultShowCopyCode: true,
  codeHighlight: true,
});

export default withNextra({
  async redirects() {
    return [{ source: "/", destination: "/docs", permanent: true }];
  },
});
