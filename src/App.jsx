import { Routes, Route } from "react-router-dom";

import {
   PostsPage,
   HomePage,
   PostDetailPage,
   CreatePostPage,
   RegisterPage,
   LoginPage,
   TagPage,
   ProfilePage,
} from "./pages";

function App() {
   return (
      <Routes>
         <Route index element={<HomePage />} />
         <Route path="feed">
            <Route index element={<PostsPage />} />
            <Route path=":id" element={<PostDetailPage />} />
         </Route>
         <Route path="create" element={<CreatePostPage />} />
         <Route path="register" element={<RegisterPage />} />
         <Route path="login" element={<LoginPage />} />
         <Route path="/tags/genre/:tag" element={<TagPage type="genre" />} />
         <Route
            path="/tags/period/:tag"
            element={<TagPage type="timePeriod" />}
         />
         <Route path="user" element={<ProfilePage />} />
      </Routes>
   );
}

export default App;
