/* eslint-disable no-lone-blocks */
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import { getAuth} from "firebase/auth";
import {auth} from "./firebase"
import {useSelector, useDispatch} from "react-redux";
import {deleteFeedFB} from "./redux/modules/feedSlice";


const Feed = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let all_posts = useSelector((state) => state.feed.post);
  console.log(all_posts);


  const [logIn, setLogin] = useState("false");
  
  useEffect(()=> {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  })
},[])

  // find current user
  let _email; 
  if(logIn === true) {
    const auth = getAuth();
    const user = auth.currentUser;
    _email = user.email;
    console.log(_email);
  }

  return(
        <div className="container">
          {all_posts.map((post, idx) => {
              return(
                <>
                  {post.layout === "right" && (
                      <Card>
                        <div className="card_head_wrapper">

                            <div className='inflex'>
                              <img className="cardimg" src={"https://i.kym-cdn.com/photos/images/facebook/001/673/605/8bc.jpg"}/>
                              <Cardid> nugget </Cardid>
                            </div>
                            
                            <div className='inflex'>
                              <Time>{post.time}</Time>
                              <div className='btn md-btn boldtext' onClick={()=>{
                                if (_email === post.email) {
                                  navigate(`/edit/${post.id}`)
                                }else {
                                  alert("You are not allowed to edit this post😨")
                                };
                              }}> edit
                              </div>
                              <div className='btn md-btn boldtext leftmg5' onClick={()=>{                                  
                                if (_email !== post.email) {
                                  alert("You are not allowed to delete this post😨");
                                  return;
                                };
                                const confirmBox = window.confirm('Are you sure you want to delete this post?')   
                                if (confirmBox === true && _email === post.email){
                                  dispatch(deleteFeedFB(post));  
                                } else {
                                  return;
                                };                                 
                                }}> delete
                                </div>
                            </div>
                        </div>

                        <Grid>
                          <div className='card_txt'> {post.txt} </div>
                          <img className='card_img_wrapper' src={post.img}/>
                        </Grid>

                        <div className="card_head_wrapper">
                          <p>좋아요 10개</p>
                          <span class="material-icons">favorite_border</span>
                          {/* <span class="material-icons">favorite</span> */}
                        </div>
                      </Card>
                  )}
                  {post.layout === "left" && (
                      <Card>
                        <div className="card_head_wrapper">

                          <div className='inflex'>
                          <img className="cardimg" src={"https://i.kym-cdn.com/photos/images/facebook/001/673/605/8bc.jpg"}/>
                            <Cardid> nugget </Cardid>
                          </div>

                          <div className='inflex'>
                              <Time>{post.time}</Time>
                              <div className='btn md-btn boldtext' onClick={()=>{
                                if (_email === post.email) {
                                  navigate(`/edit/${post.id}`)
                                }else {
                                  alert("You are not allowed to edit this post😨")
                                };
                                }}> edit
                              </div>
                              <div className='btn md-btn boldtext leftmg5' onClick={()=>{                                  
                                if (_email !== post.email) {
                                  alert("You are not allowed to delete this post😨");
                                  return;
                                };
                                const confirmBox = window.confirm('Are you sure you want to delete this post?')   
                                if (confirmBox === true && _email === post.email){
                                  dispatch(deleteFeedFB(post));  
                                } else {
                                  return;
                                };                                 
                                }}> delete
                                </div>                   
                          </div>                    
                        </div>

                        <Grid>            
                          <img className='card_img_wrapper' src={post.img}/>
                          <div className='card_txt'> {post.txt} </div>
                        </Grid>

                        <div className="card_head_wrapper">
                          <p>좋아요 10개</p>
                          <span class="material-icons">favorite_border</span>
                          {/* <span class="material-icons">favorite</span> */}
                        </div>
                    </Card>
                  )}
                  {post.layout === "bottom" && (  
                      <Card>
                        <div className="card_head_wrapper">
                          <div className='inflex'>
                          <img className="cardimg" src={"https://i.kym-cdn.com/photos/images/facebook/001/673/605/8bc.jpg"}/>
                            <Cardid> nugget </Cardid>
                          </div>

                          <div className='inflex'>
                            <Time>{post.time}</Time>
                            <div className='btn md-btn boldtext' onClick={()=>{
                              if (_email === post.email) {
                                navigate(`/edit/${post.id}`)
                              }else {
                                alert("You are not allowed to edit this post😨")
                              };
                            }}> edit
                            </div>
                            <div className='btn md-btn boldtext leftmg5' onClick={()=>{                                  
                                if (_email !== post.email) {
                                  alert("You are not allowed to delete this post😨");
                                  return;
                                };
                                const confirmBox = window.confirm('Are you sure you want to delete this post?')   
                                if (confirmBox === true && _email === post.email){
                                  dispatch(deleteFeedFB(post));  
                                } else {
                                  return;
                                };                                 
                                }}> delete
                                </div>
                          </div>
                        </div>
                        <Grid2>
                          <div className='card_txt'> {post.txt} </div>
                          <img className='card_img_wrapper2' src={post.img}/>
                        </Grid2>
                        <div className="card_head_wrapper">
                        <p>좋아요 10개</p>
                        <span class="material-icons">favorite_border</span>
                        {/* <span class="material-icons">favorite</span> */}
                        </div>
                      </Card>
                  )}
                </>
                ) 
            })
          }
        </div>
  )
}

export default Feed;

const Card = styled.div`
  max-width: 100%;
  min-height: 550px;
  border: var(--cardline);
  background-color: white;
  margin: 20px;
`

const Cardid = styled.div`
  font-size: 1.2rem;
`


const Time = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`

const Grid = styled.div`
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 700px)  {
    grid-template-columns: 1fr;
  }
`

const Grid2 = styled.div`
  display: grid;
  margin-right:auto;
  margin-left:auto;
  grid-template-columns: 1fr;
`
