import React from "react";
import "./Restarauns.css";
import { gql, useMutation, useQuery } from "@apollo/client";
const GET_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      name
      posts {
        restaurantName
        restaurantImage
        restaurantDesc
      }
    }
  }
`;
export const Restarauns = () => {
  const { data, error, loading } = useQuery(GET_POSTS);
  if (error) {
    console.log(error);
  }
//   console.log({ data, loading, error });
  return (
    <div className="posts_wrape">
      {error ? (
        <h1>error</h1>
      ) : loading ? (
        <h1>Loading...</h1>
      ) : (
        data.getAllPosts.map((post,index) => {
          return (
            <div className={post.posts.length === 0 ? "null_post" :"post_block"} key={index}>
              <h1 className={"post_name"}>
                {post.name}
              </h1>
              <div className="posts">
                <div className="post_info_wrape">
                  <div className="posts_info">
                    {post.posts.map((p1,index) => {
                      return (
                        <div className="block" key={index}>
                          <h1>
                            name:   <span></span>     
                              {p1 === ""
                              ? post.restaurantName === null
                              : p1.restaurantName}
                          </h1>
                         <b>description:</b> <p>{p1.restaurantDesc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
