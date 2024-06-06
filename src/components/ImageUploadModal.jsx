import React, { useState } from "react";
import styled from "styled-components";
import supabase from "../supabaseClient";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB

const ImageUploadModal = ({ onClose, onSave, type }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      setError("파일 크기는 2MB 이하이어야 합니다.");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSave = async () => {
    if (file) {
      const fileExtension = file.name.split(".").pop();
      const sanitizedFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, "")}.${fileExtension}`;
      const bucketName = type === "background" ? "bg" : "profile";
      const filePath = `upload/${sanitizedFileName}`;
      const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, file);

      if (uploadError) {
        console.error("파일 업로드 에러:", uploadError);
        return;
      }

      const { data, error: urlError } = await supabase.storage.from(bucketName).getPublicUrl(filePath);

      if (urlError) {
        console.error("URL 가져오기 에러:", urlError);
        return;
      }

      onSave(data.publicUrl, type); // Ensure the correct key name here
      onClose();
    }
  };

  return (
    <ModalBackground>
      <ModalContent>
        <ModalHeader>
          <h2>이미지 업로드</h2>
        </ModalHeader>
        <ModalBody>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {error && <ErrorText>{error}</ErrorText>}
        </ModalBody>
        <ModalFooter>
          <button onClick={handleSave} disabled={!file}>
            저장
          </button>
          <button onClick={onClose}>취소</button>
        </ModalFooter>
      </ModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #121212;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;

  h2 {
    margin: 0;
    color: #fff;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  button:nth-child(1) {
    background-color: #ffd0d0;
    color: #000;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &:hover:enabled {
      background-color: #ffc0c0;
    }
  }

  button:nth-child(2) {
    background-color: #121212;
    color: #fff;

    &:hover {
      background-color: #333;
    }
  }
`;

export default ImageUploadModal;
