import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Sell = () => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            toast.error("Please select a valid image file.");
            return;
        }
        setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
        toast.error("Title cannot be empty.");
        return;
    }
    if (!price) {
        toast.error("Price cannot be empty.");
        return;
    }
    if (!category) {
        toast.error("Category cannot be empty.");
        return;
    }
    if (!description) {
        toast.error("Description cannot be empty.");
        return;
    }
    if (!imageFile) {
        toast.error("Please select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const imageUrl = data.secure_url;

      await addDoc(collection(db, "products"), {
        title,
        price,
        category,
        description,
        image: imageUrl,
        createdAt: new Date(),
      });

      toast.success("Product listed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error listing product.");
    }
  };

  return (
    <div className="container mx-auto p-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-800 mb-4 cursor-pointer">
            Back
        </button>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Sell Your Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-2 w-full mb-2"/>
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full mb-2"/>
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full mb-2"/>
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full mb-2"/>
                <input type="file" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*"/>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">List Product</button>
            </form>
        </div>
    </div>
  );
};

export default Sell;
