import LandingPage from "./pages/LandingPage";
import CreatorPage from "./pages/CreatorPage/CreatorPage";
import UserPage from "./pages/UserPage";
import RedirectTwitch from './components/RedirectTwitch'

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
    path: '/viewer',
    page: UserPage
  },
  {
    path: '/redirect_twitch',
    page: RedirectTwitch
  },
]
