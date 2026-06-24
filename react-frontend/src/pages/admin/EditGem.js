import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const API = "http://localhost:5000/api/admin";

function EditGem() {

  const { id } = useParams();

  const [gem, setGem] = useState(null);

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

  // 🎥 VIDEO STATES
  const [highVideo, setHighVideo] = useState("");
  const [mediumVideo, setMediumVideo] = useState("");
  const [lowVideo, setLowVideo] = useState("");

  const [highPrice, setHighPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");

  const [highDesc, setHighDesc] = useState("");
  const [mediumDesc, setMediumDesc] = useState("");
  const [lowDesc, setLowDesc] = useState("");

  const [benefits, setBenefits] = useState("");
const [recommendedFor, setRecommendedFor] = useState("");

  useEffect(() => {
    loadGem();
  }, []);

  async function loadGem() {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/gems`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const found = res.data?.gems?.find(g => g._id === id);
      if (!found) return;

      setGem(found);

      setName(found.name);
      setDescription(found.description);
      setImage(found.image);
      setColor(found.color || "");

      setHighQualityImage(found.highQualityImage || "");
      setMediumQualityImage(found.mediumQualityImage || "");
      setLowQualityImage(found.lowQualityImage || "");

      setHighImages(found.qualities?.high?.images || []);
      setMediumImages(found.qualities?.medium?.images || []);
      setLowImages(found.qualities?.low?.images || []);

      // 🎥 LOAD VIDEOS
      setHighVideo(found.qualities?.high?.video || "");
      setMediumVideo(found.qualities?.medium?.video || "");
      setLowVideo(found.qualities?.low?.video || "");

      setHighPrice(found.qualities?.high?.pricePerRatti || "");
      setMediumPrice(found.qualities?.medium?.pricePerRatti || "");
      setLowPrice(found.qualities?.low?.pricePerRatti || "");

      setHighDesc(found.qualities?.high?.description || "");
      setMediumDesc(found.qualities?.medium?.description || "");
      setLowDesc(found.qualities?.low?.description || "");

      setBenefits(
  found.astrology?.benefits?.join("\n") || ""
);

setRecommendedFor(
  found.astrology?.recommendedFor?.join(", ") || ""
);

    } catch (err) {
      console.error("Failed to load gem", err);
    }
  }

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

    setter(prev => [...prev, ...images]);
  }

  async function updateGem(e) {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/gems/${id}`,
        {
          name,
          description,
          image,
          color,

          highQualityImage,
          mediumQualityImage,
          lowQualityImage,

           astrology: {
    benefits: benefits
      .split("\n")
      .map(item => item.trim())
      .filter(Boolean),

    recommendedFor: recommendedFor
      .split(",")
      .map(item => item.trim())
      .filter(Boolean)
  },

          qualities: {
            high: {
              images: highImages,
              video: highVideo, // ✅
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

      alert("Gem updated successfully");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  if (!gem) {
    return (
      <AdminLayout>
        <h2>Loading...</h2>
      </AdminLayout>
    );
  }

  return (

    <AdminLayout>

      <div style={{ maxWidth: 900 }}>

        <h1>Edit Gem</h1>

        <form onSubmit={updateGem}>

          <input value={name} onChange={(e) => setName(e.target.value)} />
          <br /><br />

          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <br /><br />

          <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" />
          <br /><br />

          {/* HIGH */}
          <h3>High Quality</h3>

          <input value={highPrice} onChange={(e) => setHighPrice(e.target.value)} />
          <textarea value={highDesc} onChange={(e) => setHighDesc(e.target.value)} />

          <input type="file" multiple onChange={(e) => uploadMultiple(e.target.files, setHighImages)} />

          {/* 🎥 VIDEO */}
          <input type="file" accept="video/*" onChange={async (e) => setHighVideo(await uploadImage(e.target.files[0]))} />

          {highVideo && (
            <video src={`http://localhost:5000${highVideo}`} width="120" controls />
          )}

          <br /><br />

          {/* MEDIUM */}
          <h3>Medium Quality</h3>

          <input value={mediumPrice} onChange={(e) => setMediumPrice(e.target.value)} />
          <textarea value={mediumDesc} onChange={(e) => setMediumDesc(e.target.value)} />

          <input type="file" multiple onChange={(e) => uploadMultiple(e.target.files, setMediumImages)} />

          <input type="file" accept="video/*" onChange={async (e) => setMediumVideo(await uploadImage(e.target.files[0]))} />

          {mediumVideo && (
            <video src={`http://localhost:5000${mediumVideo}`} width="120" controls />
          )}

          <br /><br />

          {/* LOW */}
          <h3>Low Quality</h3>

          <input value={lowPrice} onChange={(e) => setLowPrice(e.target.value)} />
          <textarea value={lowDesc} onChange={(e) => setLowDesc(e.target.value)} />

          <input type="file" multiple onChange={(e) => uploadMultiple(e.target.files, setLowImages)} />

          <input type="file" accept="video/*" onChange={async (e) => setLowVideo(await uploadImage(e.target.files[0]))} />

          {lowVideo && (
            <video src={`http://localhost:5000${lowVideo}`} width="120" controls />
          )}

          <br /><br />

          <hr style={{ margin: "40px 0" }} />

<h2>Astrological Information</h2>

<div style={{ marginBottom: 20 }}>
  <label>Benefits (one per line)</label>

  <br />

  <textarea
    rows={6}
    style={{ width: "100%" }}
    value={benefits}
    onChange={(e) => setBenefits(e.target.value)}
    placeholder={`Strengthens Mars
Improves confidence
Enhances courage`}
  />
</div>

<div style={{ marginBottom: 20 }}>
  <label>Recommended Zodiac Signs</label>

  <br />

  <input
    style={{ width: "100%" }}
    value={recommendedFor}
    onChange={(e) => setRecommendedFor(e.target.value)}
    placeholder="Aries, Scorpio"
  />
</div>

          <button type="submit">Update Gem</button>

        </form>

      </div>

    </AdminLayout>
  );
}

export default EditGem;