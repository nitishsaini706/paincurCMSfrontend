import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { createBlog, uploadImage } from '../Utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Addblog = () => {
  const [formData, setFormData] = useState({
    services: '',
    image: null,
    title: '',
    slug: '',
    body: '',
    ispublished: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [image, setImageResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const history = useNavigate();
  const generateSlug = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleImageUpload = async (file) => {
    const imageData = { image: file };
    try {
      const response = await uploadImage(imageData);
      const imageRes = response.data.imageUrl;
      setImageResponse(imageRes);
      setFormData((prevData) => ({
        ...prevData,
        image: imageRes
      }));
      setImagePreview(response.data.imageUrl); // Set the image preview
      setImageUploadError(null); // Reset image upload error
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageUploadError("Error uploading image"); // Set image upload error
      toast.error("Error uploading image");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    if (name === 'image') {
      newValue = files[0];
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      if (newValue) {
        reader.readAsDataURL(newValue); // Read the file as a data URL
        handleImageUpload(newValue); // Upload the image
      }
    }

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: newValue };
      if (name === 'title') {
        updatedData.slug = generateSlug(newValue);
      }
      return updatedData;
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.services) errors.services = 'Services is required';
    if (!formData.image) errors.image = 'Image is required';
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.body) errors.body = 'Body is required';
    if (!formData.slug) errors.slug = 'Slug is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const formDataToSend = {
        service: formData.services,
        image: image,
        title: formData.title,
        slug: formData.slug,
        body: formData.body,
        ispublished: formData.ispublished
      };

      console.log('Form data submitted:', formDataToSend);

      try {
        setLoading(true);
        const response = await createBlog(formDataToSend)
        if (response && response.status == 200) {
          toast.success("Blog posted successfully");
          history('/blogs')
        }
        setLoading(false);
        console.log('Form submitted:', response);
      } catch (error) {
        console.error('Error submitting form:', error);
        setLoading(false);
        toast.error("Error submitting blog")
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex'>

        <Sidebar />
        <div className="w-full p-4">
          <h2 className="text-lg font-semibold mb-4">All Fields are mandatory:</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSport">
              {formData.services ? null : <Form.Label className="text-red-600 ">Please Select Service:</Form.Label>}
              <Form.Control as="select" name="services" value={formData.services} onChange={handleChange} isInvalid={!!formErrors.services}>
                <option value="">Select Services</option>
                <option value="Neck Pain">Neck Pain</option>
                <option value="Wrist Pain">Wrist Pain</option>
                <option value="Lower Back Pain">Lower Back Pain</option>
                <option value="Knee Pain">Knee Pain</option>
                <option value="Sedentary Lifestyle">Sedentary Lifestyle</option>
                <option value="Yoga For Migrains and Headaches">Yoga For Migrains and Headaches</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{formErrors.services}</Form.Control.Feedback>
            </Form.Group>
            <Container>
              <Row className='w-full'>
                <Col md={12}>
                  <p className="mt-2 text-blue-800">Please upload image in the dimension of 1920x1080</p>
                  <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={handleChange}
                      isInvalid={!!formErrors.image}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.image || imageUploadError}</Form.Control.Feedback>                  </Form.Group>
                  {imagePreview && (
                    <div className="mt-3">
                      <h5>Image Preview:</h5>
                      <img src={imagePreview} alt="Image Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                    </div>
                  )}
                  <Form.Group controlId="formTitle">
                    <Form.Label className='mt-3'>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      isInvalid={!!formErrors.title}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formSlug">
                    <Form.Label className='mt-3'>Slug</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      isInvalid={!!formErrors.slug}
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.slug}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBody">
                    <Form.Label className='mt-3'>Body</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Body"
                      name="body"
                      value={formData.body}
                      onChange={handleChange}
                      isInvalid={!!formErrors.body}
                      className="h-[200px]"
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.body}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPublish">
                    <Form.Label className='mt-3'>Published</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Publish"
                      name="ispublished"
                      value={formData.ispublished}
                      onChange={handleChange}
                      isInvalid={!!formErrors.ispublished}
                    >
                      <option value="true">Publish</option>
                      <option value="false">Draft</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{formErrors.ispublished}</Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-6" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" /> {/* Spinner */}
                        {' '}Submitting...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Addblog;
