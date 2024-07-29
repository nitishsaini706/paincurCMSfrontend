import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { uploadImage } from '../Utils/api';

const Addblog = () => {
  const [formData, setFormData] = useState({
    services: '',
    image: null,
    title: '',
    slug: '',
    body: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [imageResponse, setImageResponse] = useState(null); // State to store the image upload response

  const generateSlug = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleImageUpload = async (file) => {
    const imageData = new FormData();
    imageData.append('image', file);

    try {
      const response = await uploadImage( imageData );
      const result = await response.json();
      setImageResponse(result);
      console.log('Image uploaded:', result);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    if (name === 'image') {
      newValue = files[0];
      handleImageUpload(newValue);
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
        services: formData.services,
        imageResponse, // Use the image upload response here
        title: formData.title,
        slug: formData.slug,
        body: formData.body
      };

      console.log('Form data submitted:', formDataToSend);

      try {
        const response = await fetch('/your-form-submit-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataToSend),
        });
        const result = await response.json();
        console.log('Form submitted:', result);
      } catch (error) {
        console.error('Error submitting form:', error);
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
            <Form.Label className="text-red-600">Please Select Service first:</Form.Label>
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
                  <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>
                </Form.Group>

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
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.body}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-3'>
                  Submit
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
