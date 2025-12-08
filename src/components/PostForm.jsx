function PostForm() {
   // id         Int       @id @default(autoincrement())
   // createdAt  DateTime  @default(now())
   // EditedAt   DateTime? @default(now())
   // title      String
   // content    String
   // timePeriod String
   // genre      String[]
   // movie      String
   // image_url  String // potential for image url???

   // authorId Int
   // author   User      @relation(fields: [authorId], references: [id])
   // comments Comment[]
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [timePeriod, setTimePeriod] = useState("");
   const [genre, setGenre] = useState("");
   const [movie, setMovie] = useState("");
   const [image_url, setImage_url] = useState("");

   const time_period_list = [
      "1920s",
      "1930s",
      "1940s",
      "1950s",
      "1960s",
      "1970s",
      "1980s",
      "1990s",
      "2000s",
      "2010s",
      "2020s",
   ];
   const movie_genre_list = [
      "Action",
      "Romance",
      "Drama",
      "Western",
      "Mystery",
      "Animated",
      "Comedy",
      "Historical",
      "Horror",
      "Sci-fi",
   ];

   return <div></div>;
}

export default PostForm;
