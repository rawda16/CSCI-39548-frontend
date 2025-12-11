function PostCard({
   username,
   title,
   description,
   periodTag,
   genreTags = [],
   commentCount = 0,
}) {
   return (
      <div
         style={{
            width: "1000px",
            margin: "20px auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "40px",
            borderBottom: "1px solid lightgray",
            gap: "5px",
         }}
      >
         <h2>{title}</h2>
         <h4 style={{ textDecoration: "underline" }}>{username}</h4>
         <div
            style={{
               width: "900px",
               backgroundColor: "white",
               padding: "50px",
               borderRadius: "16px",
               border: "1px solid black",
            }}
         >
            <p
               style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "left",
                  color: "black",
                  margin: 0,
               }}
            >
               {description}
            </p>
         </div>
         <div
            style={{
               display: "flex",
               gap: "8px",
            }}
         >
            {genreTags.map((tag) => (
               <button key={tag}>{tag}</button>
            ))}
            <button>{periodTag}</button>
            <button>Comments {commentCount}</button>
         </div>
      </div>
   );
}

export default PostCard;
