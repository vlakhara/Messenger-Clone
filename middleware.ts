import { withAuth } from "next-auth/middleware";
import { pages } from "next/dist/build/templates/app-page";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/users/:path*"],
};
