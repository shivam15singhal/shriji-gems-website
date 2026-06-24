import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import "./AddGem.css";
import Swal from "sweetalert2";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

function AddGem() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");

  const [highQualityImage, setHighQualityImage] = useState("");
  const [mediumQualityImage, setMediumQualityImage] = useState("");
  const [lowQualityImage, setLowQualityImage] = useState("");

  const [highImages, setHighImages] = useState([]);
  const [mediumImages, setMediumImages] = useState([]);
  const [lowImages, setLowImages] = useState([]);

  const [highVideo, setHighVideo] = useState("");
  const [mediumVideo, setMediumVideo] = useState("");
  const [lowVideo, setLowVideo] = useState("");

  const [highPrice, setHighPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");

  const [highDesc, setHighDesc] = useState("");
  const [mediumDesc, setMediumDesc] = useState("");
  const [lowDesc, setLowDesc] = useState("");

  async function uploadImage(file) {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(`${API}/upload-image`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return res.data.image;
  }

  async function uploadMultiple(files, setter) {

    const token = localStorage.getItem("token");

    const uploads = Array.from(files).map(file => {
      const formData = new FormData();
      formData.append("image", file);

      return axios.post(`${API}/upload-image`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    });

    const res = await Promise.all(uploads);
    const images = res.map(r => r.data.image);

    setter(images);
  }

  async function createGem(e) {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/gems`,
        {
          name,
          description,
          image,
          color,

          highQualityImage,
          mediumQualityImage,
          lowQualityImage,

          qualities: {
            high: {
              images: highImages,
              video: highVideo,
              pricePerRatti: Number(highPrice),
              description: highDesc
            },
            medium: {
              images: mediumImages,
              video: mediumVideo,
              pricePerRatti: Number(mediumPrice),
              description: mediumDesc
            },
            low: {
              images: lowImages,
              video: lowVideo,
              pricePerRatti: Number(lowPrice),
              description: lowDesc
            }
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      await Swal.fire({
  icon: "success",
  title: "Gem Created",
  text: `${name} has been added successfully.`,
  confirmButtonColor: "#16a34a"
});

navigate("/admin/gems");

    } catch (err) {
      console.error(err);
      Swal.fire({
  icon: "error",
  title: "Creation Failed",
  text: "Unable to create gemstone.",
  confirmButtonColor: "#dc2626"
});
    }
  }

  return (
    <AdminLayout>

      <div className="add-gem-container">

        <h1>Add Gem</h1>

        <form className="add-gem-form" onSubmit={createGem}>

          {/* BASIC */}
          <div className="form-section">
            <h3>Basic Info</h3>

            <input
              placeholder="Gem Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              placeholder="Color (e.g. yellow)"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          {/* MAIN IMAGE */}
          <div className="form-section">
            <h3>Main Image</h3>

            <input type="file" onChange={async (e) => {
              setImage(await uploadImage(e.target.files[0]));
            }} />

            {image && (
              <div className="preview-row">
                <img src={`${API_BASE}${image}`} alt="" />
              </div>
            )}
          </div>

          {/* QUALITY CARD */}
          <div className="form-section">
            <h3>Quality Card Images</h3>

            <input type="file" onChange={async (e) => setHighQualityImage(await uploadImage(e.target.files[0]))} />
            <input type="file" onChange={async (e) => setMediumQualityImage(await uploadImage(e.target.files[0]))} />
            <input type="file" onChange={async (e) => setLowQualityImage(await uploadImage(e.target.files[0]))} />
          </div>

          {/* HIGH */}
          <div className="form-section">
            <h3>High Quality</h3>

            <input placeholder="Price per Ratti" onChange={(e) => setHighPrice(e.target.value)} />
            <textarea placeholder="Description" onChange={(e) => setHighDesc(e.target.value)} />

            <input type="file" multiple onChange={(e) => uploadMultiple(e.target.files, setHighImages)} />

            <input type="file" accept="video/*" onChange={async (e) => setHighVideo(await uploadImage(e.target.files[0]))} />

            <div className="preview-row">
              {highImages.map((img, i) => (
               <img key={i} src={`${API_BASE}${img}`} alt="" />
              ))}
            </div>

            {highVideo && (
              <div className="preview-video">
                <video src={`${API_BASE}${highVideo}`} controls />
              </div>
            )}
          </div>

          {/* MEDIUM */}
          <div className="form-section">
            <h3>Medium Quality</h3>

            <input placeholder="Price per Ratti" onChange={(e) => setMediumPrice(e.target.value)} />
            <textarea placeholder="Description" onChange={(e) => setMediumDesc(e.target.value)} />

            <input type="file" multiple onChange={(e) => uploadMultiple(e.target.files, setMediumImages)} />

            <input type="file" accept="video/*" onChange={async (e) => setMediumVideo(await uploadImage(e.target.files[0]))} />

            <div className="preview-row">
              {mediumImages.map((img, i) => (
               <img key={i} src={`${API_BASE}${img}`} alt="" />
              ))}
            </div>

            {mediumVideo && (
              <div className="preview-video">
                <video src={`${API_BASE}${mediumVideo}`} controls />
              </div>
            )}
          </div>

          {/* LOW */}
          <div className="form-section">
            <h3>Low Quality</h3>

            <input placeholder="Price per Ratti" onChange={(e) => setLowPrice(e.target.value)} />
            <textarea placeholder="Description" onChange={(e) => setLowDesc(e.target.value)} />

            <input type="file" multiple onChange={(e) => uploadMultiple(e.target.files, setLowImages)} />

            <input type="file" accept="video/*" onChange={async (e) => setLowVideo(await uploadImage(e.target.files[0]))} />

            <div className="preview-row">
              {lowImages.map((img, i) => (
                <img key={i} src={`${API_BASE}${img}`} alt="" />
              ))}
            </div>

            {lowVideo && (
              <div className="preview-video">
                <video src={`${API_BASE}${lowVideo}`} controls />
              </div>
            )}
          </div>

          <button className="submit-btn" type="submit">
            Create Gem
          </button>

        </form>

      </div>

    </AdminLayout>
  );
}

export default AddGem;