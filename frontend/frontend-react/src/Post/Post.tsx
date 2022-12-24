import "./Post.css"

interface IPostProps{
  username: string;
  title: string;
  body: string;
  likesNumber: number;
  comments: string[]
}

export const Post = (props: IPostProps) => {
      return (
        <div className='post'>
          <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <span className="postUsername">
                      {props.title}
                      </span>
                      <span className="postDate">{props.username}</span>
                </div>
            </div>
            <div className="postCenter">
              <span className="postText">{props.body}</span>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img className='likeIcon' src="/assets/like.png" onClick={() => {console.log('click')}} alt="" />
                <span className="postLikeCounter">{props.likesNumber} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommenttext">{props.comments.length} comments</span>
              </div>
            </div>
          </div>
        </div>
      )
}

// export const SignInPage =() => {
//     return (
//         <div className='post'>
//           <div className="postWrapper">
//             <div className="postTop">
//                 <div className="postTopLeft">
                    
//                     <span className="postUsername">
//                       {Users.filter((u) => u.id === post.userId)[0].username}
//                       </span>
//                     <span className="postDate">{post.date}</span>
//                 </div>
//                 <div className="postTopRight">
//                     <MoreVert />
//                 </div>
//             </div>
//             <div className="postCenter">
//               <span className="postText">{post.desc}</span>
//               <img className='postImg' src={post.photo} alt="" />
//             </div>
//             <div className="postBottom">
//               <div className="postBottomLeft">
//                 <img className='likeIcon' src="/assets/like.png" onClick={likeHandler} alt="" />
//                 <img className='likeIcon' src="/assets/heart.png" onClick={likeHandler} alt="" />
//                 <span className="postLikeCounter">{like} people like it</span>
//               </div>
//               <div className="postBottomRight">
//                 <span className="postCommenttext">{post.comment} comments</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
// }