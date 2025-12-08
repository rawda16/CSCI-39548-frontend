import PostCard from "./PostCard";

function PostList({ posts }) {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            gap: "48px",
         }}
      >
         {posts.map((post) => (
            <PostCard
               key={post.id}
               title={post.title}
               username={post.username}
               description={post.description}
               periodTag={post.periodTag}
               genreTag={post.genreTag}
               commentCount={post.commentCount}
            />
         ))}
      </div>
   );
}

export default PostList;
