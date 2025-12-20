import PostCard from "./PostCard";

function PostList({ posts, onDelete }) {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            gap: "48px",
         }}
      >
         {posts.map((post, index) => (
            <PostCard
               key={index}
               title={post.title}
               image={post.image_url}
               username={post.author.username}
               description={post.content}
               periodTag={post.timePeriod}
               genreTags={post.genre}
               likeCount={post.likeCount}
               commentCount={post.commentCount}
               id={post.id}
               onDelete={onDelete}
               authorId={post.authorId}
            />
         ))}
      </div>
   );
}

export default PostList;
