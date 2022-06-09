import {db} from "../../firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";

//loadFeedFB
// get all feeds(posts) from firestore
export const loadFeedFB = createAsyncThunk("feed/loadFeedFB", async()=>{
  const dbData = await getDocs(collection(db,"feed"));

  const posts = [];

  dbData.forEach((doc) => {
    posts.push({ id:doc.id, ...doc.data()});
  });
  return posts;
});

//createFeedFB
// add a feed(post) into firestore (get -> update -> put in)
export const createFeedFB = createAsyncThunk("feed/addFeedFB", async(feed)=>{
  console.log(feed);
  const docRef1 = await addDoc(collection(db,"feed"), feed);
  console.log(docRef1);
  console.log((await getDoc(docRef1)).data());
  const new_feed = {id:docRef1.id, ...feed};
  console.log(new_feed);
  // const feed_data = await getDoc(docRef).data();
  // console.log(feed_data);
  return new_feed;
});


// editFeedFB
// Edit a feed(post) in firestore (change img or txt)
export const editFeedFB = createAsyncThunk("feed/editFeedFB", async(feed)=>{
  const docRef = await doc(db,"feed", feed.id);
  await updateDoc(docRef, feed);
  const updated_feed = {id:docRef.id, ...feed};
  console.log(updated_feed);

  return updated_feed;
});

// deleteFeedFB
// delete a feed(post) in firestore
export const deleteFeedFB = createAsyncThunk("feed/deleteFeed", async(feed)=>{
  const _id = feed.id;
  console.log(_id);
  const docRef = await doc(db,"feed", _id);
  await deleteDoc(docRef);
  console.log(feed);
  
  return feed;
})


const feedSlice = createSlice( {
  name: 'feed',
  initialState: {
    post: [
      {}
      ],
    status:null,
  },
 
  extraReducers: {
    //loadFeedFB
    [loadFeedFB.pending.type]: (state) => {
      state.status = "loading";
      console.log(state.status);
    },
    [loadFeedFB.fulfilled.type]: (state, action) => {
      state.status = "success";
      state.post = action.payload;
    },
    [loadFeedFB.rejected.type]: (state) => {
      state.status = "failed";
      console.log(state.status);
    },

    //createFeedFB
    [createFeedFB.pending.type]: (state) => {
      state.status = "loading";
      console.log(state.status);
    },
    [createFeedFB.fulfilled.type]: (state, action) => {
      state.status = "success";
      console.log(current(state).post);
      state.post = [...current(state).post, action.payload]
      console.log(state.post);
      console.log(state.status);
    },
    [createFeedFB.rejected.type]: (state) => {
      state.status = "failed";
      console.log(state.status);
    },

    //editFeedFB
    [editFeedFB.pending.type]: (state) => {
      state.status = "loading";
      console.log(state.status);
    },
    [editFeedFB.fulfilled.type]: (state, action) => {
      state.status = "success";
      console.log(action.payload.id, action.payload.img);
      console.log(current(state).post);

      const updated_feed = current(state).post.map((l,idx) => {console.log(l)
        if(action.payload.id === l.id) {
          
          return {...l, ...action.payload};
        } else {
          return l;
        }
      })
      console.log(updated_feed);
      state.post = updated_feed;
    },

    [editFeedFB.rejected.type]: (state) => {
      state.status = "failed";
      console.log(state.status);
    },

    //deleteFeedFB
    [deleteFeedFB.pending.type]: (state) => {
      state.status = "loading";
      console.log(state.status);
    },
    [deleteFeedFB.fulfilled.type]: (state, action) => {
      state.status = "success";
      console.log(action.payload);
      console.log(current(state).post);
      const new_list = current(state).post.filter(feed => feed.id !== action.payload.id);
      console.log(new_list);
      state.post = new_list;
    },

    [deleteFeedFB.rejected.type]: (state) => {
      state.status = "failed";
      console.log(state.status);
    },
    }
  
})

export const {loadFeed, createFeed, extraReducers} = feedSlice.actions;
export default feedSlice.reducer;