import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { submitContact, ContactFormData } from '../services/api';

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'danger'>('success');
  
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await submitContact(data);
      setMessageType('success');
      setSubmitMessage(response.message || 'Thank you! Your message has been sent successfully.');
      reset();
    } catch (error) {
      setMessageType('danger');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Container className="py-5">
      <Row>
        <Col lg={6} className="mb-4">
          <h2 className="section-title">Get In Touch</h2>
          <p className="lead mb-4">
            Interested in collaborating or have a project in mind? Feel free to reach out!
          </p>
          
          <div className="mb-4">
            <h5 style={{ color: '#994545' }}>Email</h5>
            <p>
              <a href="mailto:tuurozeeng.matthew@ashesi.edu.gh" style={{ color: '#994545' }}>
                tuurozeeng.matthew@ashesi.edu.gh
              </a>
            </p>
          </div>
          
          <div className="mb-4">
            <h5 style={{ color: '#994545' }}>Location</h5>
            <p>Available for remote opportunities worldwide</p>
          </div>
          
          <div className="mb-4">
            <h5 style={{ color: '#994545' }}>Social Media</h5>
            <div>
              <a 
                href="https://www.linkedin.com/in/matthewtuurozeeng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="me-3" 
                style={{ color: '#994545', textDecoration: 'none' }}
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/MatthewTuurozeeng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="me-3" 
                style={{ color: '#994545', textDecoration: 'none' }}
              >
                GitHub
              </a>
              <a 
                href="https://web.facebook.com/tuurozeeng.matthew" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#994545', textDecoration: 'none' }}
              >
                Facebook
              </a>
            </div>
          </div>
        </Col>
        
        <Col lg={6}>
          <Card className="card-custom">
            <Card.Body>
              <h4 style={{ color: '#994545' }} className="mb-4">Send a Message</h4>
              
              {submitMessage && (
                <div className={`alert alert-${messageType}`} role="alert">
                  {submitMessage}
                </div>
              )}
              
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your full name"
                    {...register('name', { required: 'Name is required' })}
                    isInvalid={!!errors.name}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    isInvalid={!!errors.email}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Subject </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="What is this about?"
                    {...register('subject', { required: 'Subject is required' })}
                    isInvalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <div className="invalid-feedback">
                      {errors.subject.message}
                    </div>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Your message here..."
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    isInvalid={!!errors.message}
                  />
                  {errors.message && (
                    <div className="invalid-feedback">
                      {errors.message.message}
                    </div>
                  )}
                </Form.Group>
                
                <Button 
                  type="submit" 
                  className="btn-primary-custom" 
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;