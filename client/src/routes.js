import LandingPage from "./pages/LandingPage";
import CreatorPage from "./pages/CreatorPage/CreatorPage";
import UserPage from "./pages/UserPage";

export default [
  {
    path: '/',
    page: LandingPage
  },
  {
    path: '/creator',
    page: CreatorPage
  },
  {
    path: '/user',
    page: UserPage
  },
]
