import { useState } from "react";
import { toast } from "sonner";
import { FaFileAlt, FaEye, FaTrash } from "react-icons/fa";
import "../../css/profile/DocumentsForm.css";

function DocumentsForm() {

    const [documents, setDocuments] = useState([
        {
            id: 1,
            name: "Aadhaar Card.pdf",
            status: "Verified",
            uploadDate: "22 Jul 2026",
            size: "2.1 MB",
        },
        {
            id: 2,
            name: "PAN Card.pdf",
            status: "Pending",
            uploadDate: "21 Jul 2026",
            size: "850 KB",
        },
        {
            id: 3,
            name: "Resume.pdf",
            status: "Verified",
            uploadDate: "20 Jul 2026",
            size: "1.4 MB",
        },
    ]);

    const [selectedFile, setSelectedFile] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [filterStatus, setFilterStatus] = useState("All");

    const uploadDocument = () => {

        if (!selectedFile) {
    toast.error("Please select a file.");
    return;
}

        const newDocument = {
            id: Date.now(),
            name: selectedFile.name,
            status: "Pending",
        };

        setDocuments([...documents, newDocument]);

        setSelectedFile(null);

    };

    const deleteDocument = (id) => {

        const updatedDocuments = documents.filter((doc) => {

            return doc.id !== id;

        });

        setDocuments(updatedDocuments);

    };

  const viewDocument = (documentName) => {
    toast(`Viewing ${documentName}`);
};

    const filteredDocuments = documents.filter((doc) => {

        const matchesSearch =
            doc.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === "All" ||
            doc.status === filterStatus;

        return matchesSearch && matchesFilter;

    });

    return (
        <div className="documents-form">

            <div className="documents-header">

                <div>

                    <h2>Documents</h2>

                    <p>Manage your uploaded documents</p>

                </div>

                <>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />

                    <button
                        className="upload-btn"
                        onClick={() => {

                            if (selectedFile) {

                                uploadDocument();

                            } else {

                                document.getElementById("fileInput").click();

                            }

                        }}
                    >
                        Upload Document
                    </button>
                </>

            </div>

            <input
                className="search-box"
                type="text"
                placeholder="Search document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="filter-buttons">

                <button
                    onClick={() => setFilterStatus("All")}
                >
                    All
                </button>

                <button
                    onClick={() => setFilterStatus("Verified")}
                >
                    Verified
                </button>

                <button
                    onClick={() => setFilterStatus("Pending")}
                >
                    Pending
                </button>

            </div>

            <div className="stats-container">

                <div className="stat-card">

                    <h2>{documents.length}</h2>

                    <p>Total</p>

                </div>

                <div className="stat-card">

                    <h2>

                        {
                            documents.filter(
                                (doc) => doc.status === "Verified"
                            ).length
                        }

                    </h2>

                    <p>Verified</p>

                </div>

                <div className="stat-card">

                    <h2>

                        {
                            documents.filter(
                                (doc) => doc.status === "Pending"
                            ).length
                        }

                    </h2>

                    <p>Pending</p>

                </div>

            </div>

            <div className="documents-list">

                {filteredDocuments.map((doc) => (

                    <div
                        className="document-card"
                        key={doc.id}
                    >

                        <div className="document-left">

                            <FaFileAlt className="file-icon" />

                            <div>

                                <h3>{doc.name}</h3>
                                <p className="file-size">
                                    {doc.size}
                                </p>

                                <span
                                    className={
                                        doc.status === "Verified"
                                            ? "verified"
                                            : "pending"
                                    }
                                >
                                    {doc.status}
                                </span>

                                <p className="upload-date">
                                    Uploaded: {doc.uploadDate}
                                </p>

                            </div>

                        </div>

                        <div className="document-actions">

                            <button className="view-btn" onClick={() => viewDocument(doc.name)}
                            >

                                <FaEye />

                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => deleteDocument(doc.id)}
                            >
                                <FaTrash />
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default DocumentsForm;