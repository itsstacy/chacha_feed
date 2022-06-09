import React, {useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {editFeedFB} from './redux/modules/feedSlice';

const Edit = (props) => {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log(id.id)

  let all_posts = useSelector((state) => state.feed.post);
  const single = all_posts.find(post => post.id === id.id);

  console.log(single.txt)


  //edit post
  const _img = React.useRef(null);
  const _txt = React.useRef(null);

  const editPost = ()=> {
  
    dispatch(editFeedFB({id: id.id, img: _img.current.url, txt: _txt.current.value, layout:layout}));
    alert('Your feed has been edited!');
    navigate('/');
  };


  // Radio checkbox
  const [layout, setLayout] = React.useState("");

  const handleChange = (event) => {
    setLayout(event.target.value)
  }
  console.log(layout)


  
    // img upload
  
    const [file, setFile] = useState("");
  
    const storage = getStorage();
    const uploadFeedImgFB = async(e) => {
       const uploaded_img = await uploadBytes(ref(storage, `images/${e.target.files[0].name}`), e.target.files[0])
       console.log(uploaded_img)
       
       const file_url = await getDownloadURL(uploaded_img.ref)
       console.log(file_url)
       _img.current= {url: file_url}
       setFile(_img.current.url)
    }


  return (
    <div className="containersm">
      <div className="form_wrapper2">
        <p>Current image</p>
        <img src = {single.img} className='showimg'/>
        <label>Change image</label>

        <input className='file' type="file" onChange={(e)=>{
          uploadFeedImgFB(e)
          }}></input>

        <div className='previewtxt'>
          <img src = {file} className='showimg'/>
          <div className='imgtxt'>preview</div>
        </div> 
        <label>Change text</label>

        <textarea ref={_txt} defaultValue={single.txt}></textarea>

        <p className="topmg20">Change Post style</p>
        <form className='flexrow'>
          <div className='flexcol'>
            <input
              type="radio"
              value="right"
              checked={layout === 'right'}
              onChange={handleChange}
            /> right
            <div className="topmg20">
              <span class="material-icons">notes</span>
              <span class="material-icons">image</span>              
            </div>
          </div>
          <div className='flexcol'>
            <input
              type="radio"
              value="left"
              checked={layout === 'left'}
              onChange={handleChange}
            /> left
            <div className="topmg20">
              <span class="material-icons">image</span>
              <span class="material-icons">notes</span>
            </div>
          </div>
          <div className='flexcol'>
            <input
              type="radio"
              value="bottom"
              checked={layout === 'bottom'}
              onChange={handleChange}
            /> bottom
            <div className='flexcol'>
              <span class="material-icons">image</span>
              <span class="material-icons">notes</span>
            </div>
          </div>
        </form>
        
    </div>
       <div className='btn lg-btn' onClick={editPost}>Post!</div>
     
    </div>
  )
}

export default Edit;