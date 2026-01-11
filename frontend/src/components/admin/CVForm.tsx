import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Accordion } from 'react-bootstrap';
import FileUpload from './FileUpload';
const FileUploadAny: any = FileUpload as any;

interface CVFormData {
  type: 'master' | 'resume';
  personalInfo: {
    name: string;
    address: string;
    phone: string;
    nationality: string;
    email: string;
    linkedin: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    details?: string;
  }>;
  awards: Array<{
    title: string;
    organization: string;
    date: string;
  }>;
  experiences: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }>;
  projects: Array<{
    organization: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }>;
  activities: Array<{
    organization: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }>;
  skills: Array<{
    category: string;
    skills: string;
  }>;
  references: Array<{
    abbreviation: string;
    fullForm: string;
  }>;
  pdfUrl?: string;
  isActive: boolean;
}

interface CVFormProps {
  initialData?: any;
  cvType: 'master' | 'resume';
  onSubmit: (data: CVFormData) => void;
  onCancel: () => void;
}

const CVForm: React.FC<CVFormProps> = ({ initialData, cvType, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CVFormData>({
    type: cvType,
    personalInfo: {
      name: '',
      address: '',
      phone: '',
      nationality: '',
      email: '',
      linkedin: '',
    },
    education: [
      {
        institution: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
        details: '',
      },
    ],
    awards: [
      {
        title: '',
        organization: '',
        date: '',
      },
    ],
    experiences: [
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: [''],
      },
    ],
    projects: [
      {
        organization: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        achievements: [''],
      },
    ],
    activities: [
      {
        organization: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: [''],
      },
    ],
    skills: [
      {
        category: '',
        skills: '',
      },
    ],
    references: [
      {
        abbreviation: '',
        fullForm: '',
      },
    ],
    pdfUrl: '',
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Add/Remove functions for dynamic arrays
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          institution: '',
          degree: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: '',
          details: '',
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const addAward = () => {
    setFormData({
      ...formData,
      awards: [...formData.awards, { title: '', organization: '', date: '' }],
    });
  };

  const removeAward = (index: number) => {
    const newAwards = formData.awards.filter((_, i) => i !== index);
    setFormData({ ...formData, awards: newAwards });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        {
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          responsibilities: [''],
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExperiences });
  };

  const addResponsibility = (expIndex: number) => {
    const newExperiences = [...formData.experiences];
    newExperiences[expIndex].responsibilities.push('');
    setFormData({ ...formData, experiences: newExperiences });
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const newExperiences = [...formData.experiences];
    newExperiences[expIndex].responsibilities = newExperiences[expIndex].responsibilities.filter(
      (_, i) => i !== respIndex
    );
    setFormData({ ...formData, experiences: newExperiences });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          organization: '',
          role: '',
          location: '',
          startDate: '',
          endDate: '',
          achievements: [''],
        },
      ],
    });
  };

  const removeProject = (index: number) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
  };

  const addAchievement = (projIndex: number) => {
    const newProjects = [...formData.projects];
    newProjects[projIndex].achievements.push('');
    setFormData({ ...formData, projects: newProjects });
  };

  const removeAchievement = (projIndex: number, achIndex: number) => {
    const newProjects = [...formData.projects];
    newProjects[projIndex].achievements = newProjects[projIndex].achievements.filter(
      (_, i) => i !== achIndex
    );
    setFormData({ ...formData, projects: newProjects });
  };

  const addActivity = () => {
    setFormData({
      ...formData,
      activities: [
        ...formData.activities,
        {
          organization: '',
          role: '',
          location: '',
          startDate: '',
          endDate: '',
          responsibilities: [''],
        },
      ],
    });
  };

  const removeActivity = (index: number) => {
    const newActivities = formData.activities.filter((_, i) => i !== index);
    setFormData({ ...formData, activities: newActivities });
  };

  const addActivityResponsibility = (actIndex: number) => {
    const newActivities = [...formData.activities];
    newActivities[actIndex].responsibilities.push('');
    setFormData({ ...formData, activities: newActivities });
  };

  const removeActivityResponsibility = (actIndex: number, respIndex: number) => {
    const newActivities = [...formData.activities];
    newActivities[actIndex].responsibilities = newActivities[actIndex].responsibilities.filter(
      (_, i) => i !== respIndex
    );
    setFormData({ ...formData, activities: newActivities });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { category: '', skills: '' }],
    });
  };

  const removeSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const addReference = () => {
    setFormData({
      ...formData,
      references: [...formData.references, { abbreviation: '', fullForm: '' }],
    });
  };

  const removeReference = (index: number) => {
    const newReferences = formData.references.filter((_, i) => i !== index);
    setFormData({ ...formData, references: newReferences });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Personal Information */}
      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#994545', color: 'white' }}>
          <h5 className="mb-0">Personal Information</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, name: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, email: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, phone: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nationality </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.personalInfo.nationality}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, nationality: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.personalInfo.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, address: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>LinkedIn </Form.Label>
                <Form.Control
                  type="url"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, linkedin: e.target.value },
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Education */}
      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#9C484F', color: 'white' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Education</h5>
            <Button variant="light" size="sm" onClick={addEducation}>
              + Add Education
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Accordion>
            {formData.education.map((edu, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  {edu.institution || `Education ${index + 1}`}
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Institution </Form.Label>
                        <Form.Control
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEducation = [...formData.education];
                            newEducation[index].institution = e.target.value;
                            setFormData({ ...formData, education: newEducation });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Degree </Form.Label>
                        <Form.Control
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEducation = [...formData.education];
                            newEducation[index].degree = e.target.value;
                            setFormData({ ...formData, education: newEducation });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Location </Form.Label>
                        <Form.Control
                          type="text"
                          value={edu.location}
                          onChange={(e) => {
                            const newEducation = [...formData.education];
                            newEducation[index].location = e.target.value;
                            setFormData({ ...formData, education: newEducation });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Date </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Jan 2024"
                          value={edu.startDate}
                          onChange={(e) => {
                            const newEducation = [...formData.education];
                            newEducation[index].startDate = e.target.value;
                            setFormData({ ...formData, education: newEducation });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>End Date </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Jul 2027 or Present"
                          value={edu.endDate}
                          onChange={(e) => {
                            const newEducation = [...formData.education];
                            newEducation[index].endDate = e.target.value;
                            setFormData({ ...formData, education: newEducation });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>GPA (Optional)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., 3.67/4.00"
                          value={edu.gpa || ''}
                          onChange={(e) => {
                            const newEducation = [...formData.education];
                            newEducation[index].gpa = e.target.value;
                            setFormData({ ...formData, education: newEducation });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Additional Details (Optional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={edu.details || ''}
                          onChange={(e) => {
                            const newEducation = [...formData.education];
                            newEducation[index].details = e.target.value;
                            setFormData({ ...formData, education: newEducation });
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {formData.education.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      Remove Education
                    </Button>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* Awards */}
      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#997446', color: 'white' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Achievements / Awards</h5>
            <Button variant="light" size="sm" onClick={addAward}>
              + Add Award
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {formData.awards.map((award, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title </Form.Label>
                    <Form.Control
                      type="text"
                      value={award.title}
                      onChange={(e) => {
                        const newAwards = [...formData.awards];
                        newAwards[index].title = e.target.value;
                        setFormData({ ...formData, awards: newAwards });
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Organization </Form.Label>
                    <Form.Control
                      type="text"
                      value={award.organization}
                      onChange={(e) => {
                        const newAwards = [...formData.awards];
                        newAwards[index].organization = e.target.value;
                        setFormData({ ...formData, awards: newAwards });
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Jan 2024 - Jul 2027"
                      value={award.date}
                      onChange={(e) => {
                        const newAwards = [...formData.awards];
                        newAwards[index].date = e.target.value;
                        setFormData({ ...formData, awards: newAwards });
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              {formData.awards.length > 1 && (
                <Button variant="danger" size="sm" onClick={() => removeAward(index)}>
                  Remove Award
                </Button>
              )}
            </div>
          ))}
        </Card.Body>
      </Card>

      {/* Work Experience */}
      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#994545', color: 'white' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Work Experience</h5>
            <Button variant="light" size="sm" onClick={addExperience}>
              + Add Experience
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Accordion>
            {formData.experiences.map((exp, expIndex) => (
              <Accordion.Item eventKey={expIndex.toString()} key={expIndex}>
                <Accordion.Header>
                  {exp.company || `Experience ${expIndex + 1}`} - {exp.position}
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Company </Form.Label>
                        <Form.Control
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const newExperiences = [...formData.experiences];
                            newExperiences[expIndex].company = e.target.value;
                            setFormData({ ...formData, experiences: newExperiences });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Position </Form.Label>
                        <Form.Control
                          type="text"
                          value={exp.position}
                          onChange={(e) => {
                            const newExperiences = [...formData.experiences];
                            newExperiences[expIndex].position = e.target.value;
                            setFormData({ ...formData, experiences: newExperiences });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Location </Form.Label>
                        <Form.Control
                          type="text"
                          value={exp.location}
                          onChange={(e) => {
                            const newExperiences = [...formData.experiences];
                            newExperiences[expIndex].location = e.target.value;
                            setFormData({ ...formData, experiences: newExperiences });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Date </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Jun 2024"
                          value={exp.startDate}
                          onChange={(e) => {
                            const newExperiences = [...formData.experiences];
                            newExperiences[expIndex].startDate = e.target.value;
                            setFormData({ ...formData, experiences: newExperiences });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>End Date </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Present"
                          value={exp.endDate}
                          onChange={(e) => {
                            const newExperiences = [...formData.experiences];
                            newExperiences[expIndex].endDate = e.target.value;
                            setFormData({ ...formData, experiences: newExperiences });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Label>Responsibilities </Form.Label>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="mb-2">
                      <div className="d-flex gap-2">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={resp}
                          onChange={(e) => {
                            const newExperiences = [...formData.experiences];
                            newExperiences[expIndex].responsibilities[respIndex] =
                              e.target.value;
                            setFormData({ ...formData, experiences: newExperiences });
                          }}
                          required
                        />
                        {exp.responsibilities.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeResponsibility(expIndex, respIndex)}
                          >
                            ✕
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mb-3"
                    onClick={() => addResponsibility(expIndex)}
                  >
                    + Add Responsibility
                  </Button>

                  {formData.experiences.length > 1 && (
                    <div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeExperience(expIndex)}
                      >
                        Remove Experience
                      </Button>
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* Projects - Similar structure to experiences */}
      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#9C484F', color: 'white' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Projects and Research</h5>
            <Button variant="light" size="sm" onClick={addProject}>
              + Add Project
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Accordion>
            {formData.projects.map((proj, projIndex) => (
              <Accordion.Item eventKey={projIndex.toString()} key={projIndex}>
                <Accordion.Header>
                  {proj.organization || `Project ${projIndex + 1}`} - {proj.role}
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Organization </Form.Label>
                        <Form.Control
                          type="text"
                          value={proj.organization}
                          onChange={(e) => {
                            const newProjects = [...formData.projects];
                            newProjects[projIndex].organization = e.target.value;
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Role </Form.Label>
                        <Form.Control
                          type="text"
                          value={proj.role}
                          onChange={(e) => {
                            const newProjects = [...formData.projects];
                            newProjects[projIndex].role = e.target.value;
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Location </Form.Label>
                        <Form.Control
                          type="text"
                          value={proj.location}
                          onChange={(e) => {
                            const newProjects = [...formData.projects];
                            newProjects[projIndex].location = e.target.value;
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Date </Form.Label>
                        <Form.Control
                          type="text"
                          value={proj.startDate}
                          onChange={(e) => {
                            const newProjects = [...formData.projects];
                            newProjects[projIndex].startDate = e.target.value;
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>End Date *</Form.Label>
                        <Form.Control
                          type="text"
                          value={proj.endDate}
                          onChange={(e) => {
                            const newProjects = [...formData.projects];
                            newProjects[projIndex].endDate = e.target.value;
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Label>Achievements </Form.Label>
                  {proj.achievements.map((ach, achIndex) => (
                    <div key={achIndex} className="mb-2">
                      <div className="d-flex gap-2">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={ach}
                          onChange={(e) => {
                            const newProjects = [...formData.projects];
                            newProjects[projIndex].achievements[achIndex] = e.target.value;
                            setFormData({ ...formData, projects: newProjects });
                          }}
                          required
                        />
                        {proj.achievements.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeAchievement(projIndex, achIndex)}
                          >
                            ✕
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mb-3"
                    onClick={() => addAchievement(projIndex)}
                  >
                    + Add Achievement
                  </Button>

                  {formData.projects.length > 1 && (
                    <div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeProject(projIndex)}
                      >
                        Remove Project
                      </Button>
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* Co-curricular Activities - Similar to experiences */}
            <Card className="mb-4">
              <Card.Header style={{ backgroundColor: '#997446', color: 'white' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Co-curricular Activities</h5>
                  <Button variant="light" size="sm" onClick={addActivity}>
                    + Add Activity
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Accordion>
                  {formData.activities.map((act, actIndex) => (
                    <Accordion.Item eventKey={actIndex.toString()} key={actIndex}>
                      <Accordion.Header>
                        {act.organization || `Activity ${actIndex + 1}`} - {act.role}
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Organization </Form.Label>
                              <Form.Control
                                type="text"
                                value={act.organization}
                                onChange={(e) => {
                                  const newActivities = [...formData.activities];
                                  newActivities[actIndex].organization = e.target.value;
                                  setFormData({ ...formData, activities: newActivities });
                                }}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Role </Form.Label>
                              <Form.Control
                                type="text"
                                value={act.role}
                                onChange={(e) => {
                                  const newActivities = [...formData.activities];
                                  newActivities[actIndex].role = e.target.value;
                                  setFormData({ ...formData, activities: newActivities });
                                }}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Location </Form.Label>
                              <Form.Control
                                type="text"
                                value={act.location}
                                onChange={(e) => {
                                  const newActivities = [...formData.activities];
                                  newActivities[actIndex].location = e.target.value;
                                  setFormData({ ...formData, activities: newActivities });
                                }}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Start Date </Form.Label>
                              <Form.Control
                                type="text"
                                value={act.startDate}
                                onChange={(e) => {
                                  const newActivities = [...formData.activities];
                                  newActivities[actIndex].startDate = e.target.value;
                                  setFormData({ ...formData, activities: newActivities });
                                }}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>End Date </Form.Label>
                              <Form.Control
                                type="text"
                                value={act.endDate}
                                onChange={(e) => {
                                  const newActivities = [...formData.activities];
                                  newActivities[actIndex].endDate = e.target.value;
                                  setFormData({ ...formData, activities: newActivities });
                                }}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
      
                        <Form.Label>Responsibilities </Form.Label>
                        {act.responsibilities.map((resp, respIndex) => (
                          <div key={respIndex} className="mb-2">
                            <div className="d-flex gap-2">
                              <Form.Control
                                as="textarea"
                                rows={2}
                                value={resp}
                                onChange={(e) => {
                                  const newActivities = [...formData.activities];
                                  newActivities[actIndex].responsibilities[respIndex] = e.target.value;
                                  setFormData({ ...formData, activities: newActivities });
                                }}
                                required
                              />
                              {act.responsibilities.length > 1 && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => removeActivityResponsibility(actIndex, respIndex)}
                                >
                                  ✕
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="mb-3"
                          onClick={() => addActivityResponsibility(actIndex)}
                        >
                          + Add Responsibility
                        </Button>
      
                        {formData.activities.length > 1 && (
                          <div>
                            <Button variant="danger" size="sm" onClick={() => removeActivity(actIndex)}>
                              Remove Activity
                            </Button>
                          </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
      
            {/* Skills */}
            <Card className="mb-4">
              <Card.Header style={{ backgroundColor: '#9C484F', color: 'white' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Skills</h5>
                  <Button variant="light" size="sm" onClick={addSkill}>
                    + Add Skill Category
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {formData.skills.map((sk, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category </Form.Label>
                          <Form.Control
                            type="text"
                            value={sk.category}
                            onChange={(e) => {
                              const newSkills = [...formData.skills];
                              newSkills[index].category = e.target.value;
                              setFormData({ ...formData, skills: newSkills });
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>Skills (comma separated) </Form.Label>
                          <Form.Control
                            type="text"
                            value={sk.skills}
                            onChange={(e) => {
                              const newSkills = [...formData.skills];
                              newSkills[index].skills = e.target.value;
                              setFormData({ ...formData, skills: newSkills });
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {formData.skills.length > 1 && (
                      <Button variant="danger" size="sm" onClick={() => removeSkill(index)}>
                        Remove Skill Category
                      </Button>
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>
      
            {/* References */}
            <Card className="mb-4">
              <Card.Header style={{ backgroundColor: '#997446', color: 'white' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">References</h5>
                  <Button variant="light" size="sm" onClick={addReference}>
                    + Add Reference
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {formData.references.map((ref, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Abbreviation </Form.Label>
                          <Form.Control
                            type="text"
                            value={ref.abbreviation}
                            onChange={(e) => {
                              const newReferences = [...formData.references];
                              newReferences[index].abbreviation = e.target.value;
                              setFormData({ ...formData, references: newReferences });
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={8}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Form </Form.Label>
                          <Form.Control
                            type="text"
                            value={ref.fullForm}
                            onChange={(e) => {
                              const newReferences = [...formData.references];
                              newReferences[index].fullForm = e.target.value;
                              setFormData({ ...formData, references: newReferences });
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {formData.references.length > 1 && (
                      <Button variant="danger" size="sm" onClick={() => removeReference(index)}>
                        Remove Reference
                      </Button>
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>
      
            {/* File Upload / PDF */}
            <Card className="mb-4">
              <Card.Header style={{ backgroundColor: '#9C484F', color: 'white' }}>
                <h5 className="mb-0">Upload PDF (Optional)</h5>
              </Card.Header>
              <Card.Body>
                {/* If FileUpload supports an onUpload callback, wire it; otherwise keep a simple URL field */}
                <FileUploadAny
                  onUpload={(url: string) => setFormData({ ...formData, pdfUrl: url })}
                  currentUrl={formData.pdfUrl}
                />
              </Card.Body>
            </Card>
      
            <Row className="mb-4">
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Is Active"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              </Col>
            </Row>
      
            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        );
      };
      
      export default CVForm;