function PostCard({
   id,
   userId,
   username,
   title,
   description,
   periodTag,
   genreTag,
   commentCount = 0,
}) {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "90px",
            borderRadius: "16px",
            border: "100px solid #black",
            gap: "12px",
         }}
      >
         <h2>{title}</h2>
         <h4>{username}</h4>
         <div
            style={{
               backgroundColor: "white",
               padding: "90px",
               borderRadius: "16px",
               border: "4px solid #black",
            }}
         >
            <p style={{ color: "black", margin: 0 }}>{description}</p>
         </div>
         <span>{id}</span>
         <span>{userId}</span>
         <div
            style={{
               display: "flex",
               gap: "8px",
            }}
         >
            <button>{periodTag}</button>
            <button>{genreTag}</button>
            <button>Comments {commentCount}</button>
         </div>
      </div>
   );
}

export default PostCard;
