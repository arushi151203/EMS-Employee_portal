import { useState, useRef } from "react";
import "../../css/profile/ProfileCard.css";
import { FiCamera } from "react-icons/fi";

function ProfileCard() {

  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80"
  );

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (file) {

      const imageUrl = URL.createObjectURL(file);

      setProfileImage(imageUrl);

    }

  };

  return (
    <div className="profile-card">

      <div className="profile-image-wrapper">

        <img
          src={profileImage}
          alt="Profile"
          className="profile-image"
        />

        <button
          className="camera-button"
          onClick={() => fileInputRef.current.click()}
        >
          <FiCamera />
        </button>

      </div>

      <h2>Alex Chen</h2>

      <p className="designation">
        Senior Software Engineer
      </p>

      <p className="employee-id">
        Employee ID: EMP001234
      </p>

      <button
        className="change-photo-btn"
        onClick={() => fileInputRef.current.click()}
      >
        Change Photo
      </button>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

    </div>
  );
}

export default ProfileCard;