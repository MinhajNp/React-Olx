import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const {firebase} = useContext(FirebaseContext)
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('')

    const [loading, setLoading]= useState(false);
    const date = new Date()

    const handleSubmit= async()=>{
        setLoading(true);
        const file = image;

        if(!file)return;

        const data = new FormData();
        data.append("file",file)
        data.append("upload_preset", "olx-clone-images")
        data.append("cloud_name", "doncxzjmz")

       const res = await fetch("https://api.cloudinary.com/v1_1/doncxzjmz/image/upload",{
    method:"POST",
    body: data
})
    const uploadedImageURL = await res.json()
    console.log(uploadedImageURL.url)

    firebase.firestore().collection('products').add({
        name,
        category,
        price,
        url:uploadedImageURL.url,
        userId:user.uid,
        createdAt:date.toDateString()
    })
    toast.success('uploaded successfully!');
    navigate('/')
    }

  return (
    <Fragment>
      <Header />
      
      {user?
       <card>
       <div className="centerDiv">
         <form>
           <label htmlFor="fname">Name</label>
           <br />
           <input
             className="input"
             type="text"
             value={name}
             onChange={(e)=>setName(e.target.value)}
             id="fname"
             name="Name"
             defaultValue="John"
           />
           <br />
           <label htmlFor="fname">Category</label>
           <br />
           <input
             className="input"
             type="text"
             value={category}
             onChange={(e)=>setCategory(e.target.value)}
             id="fname"
             name="category"
             defaultValue="John"
           />
           <br />
           <label htmlFor="fname">Price</label>
           <br />
           <input className="input"
            type="number"
            value={price}
             onChange={(e)=>setPrice(e.target.value)}
             id="fname"
             name="Price" />
           <br />
         </form>
         <br />
         <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
         
           <br />
           <input onChange={(e)=> setImage(e.target.files[0])} type="file" />
           <br />
           {loading? "Uploading.......":<button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>}
           
           
        
       </div>
     </card>: navigate('/login')}
     
    </Fragment>
  );
};

export default Create;
