import React, { useState } from 'react';
import { Form, Alert, Spinner } from 'react-bootstrap';
import { uploadApi } from '../../services/AdminApi';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  multiple = false,
  accept = 'image/*,video/*',
  label = 'Upload File',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      if (multiple) {
        const filesArray = Array.from(files);
        const response = await uploadApi.multiple(filesArray);
        response.data.files.forEach((file: any) => onUploadComplete(file.url));
      } else {
        const response = await uploadApi.single(files[0]);
        onUploadComplete(response.data.url);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && (
        <div className="mt-2">
          <Spinner animation="border" size="sm" /> Uploading...
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default FileUpload;