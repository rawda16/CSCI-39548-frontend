import { Routes, Route } from "react-router-dom";

import {
   PostsPage,
   HomePage,
   PostDetailPage,
   CreatePostPage,
   RegisterPage,
   LoginPage,
} from "./pages";

function App() {
   return (
      <Routes>
         <Route index element={<HomePage />} />
         <Route path='feed'>
            <Route index element={<PostsPage />} />
            <Route path=':id' element={<PostDetailPage />} />
         </Route>
         <Route path='create' element={<CreatePostPage />} />
         <Route path='register' element={<RegisterPage />} />
         <Route path='login' element={<LoginPage />} />
      </Routes>
   );
}

export default App;
