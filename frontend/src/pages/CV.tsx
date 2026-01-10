import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import '../styles/cv.css';

const CV: React.FC = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h2 className="section-title">My Curriculum Vitae</h2>
        <p className="lead">Complete professional background and experience</p>
        <div className="d-flex gap-3 justify-content-center mt-4">
          <Button 
            href="#master-cv"
            className="btn-primary-custom btn-outline-custom"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('cv-viewer')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            📋 View Master CV
          </Button>
          <a
            href="/documents/Matthew_Tuurozeeng_Resume.pdf"
            download
            className="btn btn-secondary-custom btn-lg d-inline-flex align-items-center justify-content-center"
            role="button"
          >
            📥 Download Resume (PDF)
          </a>
        </div>
      </div>

      <Row className="mt-5">
        <Col lg={6} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Body>
              <h4 style={{ color: '#994545' }}>📋 Master CV</h4>
              <p>
                Comprehensive document containing all my experiences, projects, skills, 
                and achievements. Perfect for getting a complete overview of my professional journey.
              </p>
              <p className="text-muted small">
                <strong>Note:</strong> Master CV is for viewing only. For downloads, please use the tailored resume.
              </p>
              <Button 
                href="#master-cv" 
                variant="outline-primary"
                className="btn-primary-custom btn-outline-custom"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('cv-viewer')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                 👁️ View Below
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Body>
              <h4 style={{ color: '#9C484F' }}>🎯 Tailored Resume</h4>
              <p>
                Role-specific resume highlighting relevant experiences and skills. 
                Optimized for specific job applications and recruiter review.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <Button 
                  href="/documents/Matthew_Tuurozeeng_Resume.pdf" 
                  target="_blank"
                  variant="outline-primary"
                  className="btn-primary-custom btn-outline-custom"
                  rel="noopener noreferrer"
                >
                  👁️ View PDF
                </Button>
                <a
                  href="/documents/Matthew_Tuurozeeng_Resume.pdf"
                  download
                  className="btn btn-secondary-custom"
                  role="button"
                >
                  📥 Download
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Master CV Viewer - View Only */}
      <div id="cv-viewer" className="mt-5">
        <Card className="shadow-lg">
          <Card.Header style={{ backgroundColor: '#994545', color: 'white' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Master CV - Matthew Tuurozeeng</h3>
              <small className="text-white-50">View Only</small>
            </div>
          </Card.Header>
          <Card.Body className="p-4">
            <div className="My-CV-container">
              {/* CV Header */}
              <header>
                <h1 className="name">Matthew Tuurozeeng</h1>
                <div className="contact-info">
                  <p>Cantonments PMB 13, Ashesi University</p>
                  <p>+233543317402 / Ghanaian</p>
                  <p>tuurozeeng.matthew@ashesi.edu.gh</p>
                  <p>
                    <a href="https://www.linkedin.com/in/matthewtuurozeeng/" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/matthewtuurozeeng/
                    </a>
                  </p>
                </div>
              </header>

              {/* Education Section */}
              <section>
                <h2>EDUCATION</h2>
                <div className="entry">
                  <div className="left">
                    <strong>Ashesi University</strong> <br />
                    BSc. Computer Science <br />
                    Cumulative GPA: 3.67/4.00
                  </div>
                  <div className="right">
                    Berekuso, Eastern Region <br />
                    Expected Graduation: Jul 2027
                  </div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>Nandom Senior High School</strong> <br />
                    General Science (WASSCE)
                  </div>
                  <div className="right">
                    Nandom, Wa <br />
                    Aug 2019 - Sep 2022
                  </div>
                </div>
              </section>

              {/* Achievements Section */}
              <section>
                <h2>ACHIEVEMENTS / AWARDS</h2>
                <div className="entry">
                  <div className="left">MasterCard Foundation Scholar, Ashesi University</div>
                  <div className="right">Jan 2024 - Jul 2027</div>
                </div>
                <div className="entry">
                  <div className="left">Scholars Entrepreneurship Fund Honors, Ashesi University</div>
                  <div className="right">Jul 2025 - Oct 2025</div>
                </div>
              </section>

              {/* Work Experience Section */}
              <section>
                <h2>WORK EXPERIENCE</h2>
                <div className="entry">
                  <div className="left">
                    <strong>Sensorba LTD</strong> - Wa, Ghana<br />
                    <b>Co-founder & CEO</b>
                    <ul>
                      <li>Co-Founded a tiger nut farming business, supplying over 20 local market women and working towards large-scale production</li>
                      <li>Secured a $1000 grant from the Mastercard Foundation Scholars Entrepreneurship Fund to scale the business operations by 40%</li>
                      <li>Manage operations focused on sustainable farming practices and community engagement</li>
                    </ul>
                  </div>
                  <div className="right">Jun 2024 - Present</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>Ashesi MasterCard Foundation Scholars Community</strong> - Ashesi University, Ghana <br />
                    <b>Finance Committee Member</b>
                    <ul>
                      <li>Assisting in efforts to raise GH₵10,000.00 to support community projects and scholar-led initiatives</li>
                      <li>Organizing and promoting community-building events to increase scholar participation by 35%</li>
                      <li>Assisting in planning and coordinating 4 events to foster stronger sense of community and improve scholar engagement</li>
                    </ul>
                  </div>
                  <div className="right">Jun 2024 - Present</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>Future Interns</strong> - Bengaluru, India <br />
                    <b>Machine Learning & AI Intern</b>
                    <ul>
                      <li>Built an AI-powered sales forecasting dashboard, achieving 90%+ prediction accuracy and visualizing trends, seasonality, and demand patterns for retail sales</li>
                      <li>Developed a customer churn prediction model with 85%+ classification accuracy, delivering insights that supported retention strategies and reduced potential churn risk by 15% in simulations</li>
                      <li>Designed and deployed a customer support chatbot, automating FAQs and fallback handling, resulting in a 70%+ reduction in first-response time during testing</li>
                    </ul>
                  </div>
                  <div className="right">Jul 2025 - Aug 2025</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>Extern</strong> - New York <br />
                    <b>SEO Optimization Intern</b>
                    <ul>
                      <li>Utilized SEO tools (SEMrush and Ahrefs) to identify 50+ high-impact keywords relevant to extern, improving content relevance and search engine ranking</li>
                      <li>Analyzed keyword metrics to strategically categorize keywords based on search intent that enhanced targeted content strategy</li>
                      <li>Crafted 3 SEO keyword-optimized blog posts leveraging AI content creation tools, that increased website traffic by 40%</li>
                    </ul>
                  </div>
                  <div className="right">Apr 2024 - May 2024</div>
                </div>
              </section>

              {/* Projects Section */}
              <section>
                <h2>PROJECTS AND RESEARCH</h2>
                <div className="entry">
                  <div className="left">
                    <strong>Africa Leadership Academy</strong> - South Africa <br />
                    <b>Phoenix Resource DIC Participant</b>
                    <ul>
                      <li>Co-developed in a team of 5, a solution to safely decommission aircraft in Africa, focusing on sustainability and cost efficiency</li>
                      <li>Designed a model to repurpose 75% of aircraft materials, reducing hazardous waste by 30%</li>
                      <li>Proposed a regional recycling hub to cut decommissioning costs by 20%</li>
                    </ul>
                  </div>
                  <div className="right">Jan 2025 - Apr 2025</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>Ashesi University</strong> - Ghana <br />
                    <b>Frontend Developer and Project Collaborator</b>
                    <ul>
                      <li>Co-developed an interactive web platform to teach discrete math concepts</li>
                      <li>Designed modular, exercise-based learning features that simplified complex topics, improving learner engagement and comprehension significantly</li>
                      <li>Applied project management and teamwork skills by coordinating development tasks, meeting deadlines, and ensuring alignment with academic objectives</li>
                    </ul>
                  </div>
                  <div className="right">Oct 2024 - Dec 2024</div>
                </div>
              </section>

              {/* Co-curricular Activities */}
              <section>
                <h2>CO-CURRICULAR ACTIVITIES</h2>
                <div className="entry">
                  <div className="left">
                    <strong>Kingdom Christian Fellowship</strong> - Ashesi University<br />
                    <b>Member, Technical Team</b>
                    <ul>
                      <li>Support worship services through skilled drumming to enhance musical quality and congregation engagement</li>
                      <li>Collaborate with the technical team to ensure smooth coordination of church events</li>
                    </ul>
                  </div>
                  <div className="right">Jan 2024 - Present</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>Investment Club</strong> - Ashesi University <br />
                    <b>Active Member</b>
                    <ul>
                      <li>Participate in discussions and workshops on investment strategies and financial literacy</li>
                      <li>Contribute to peer learning by sharing insights and engaging in group analysis of activities</li>
                    </ul>
                  </div>
                  <div className="right">Jan 2024 - Present</div>
                </div>
              </section>

              {/* Skills Section */}
              <section>
                <h2>SKILLS</h2>
                <ul>
                  <li><strong>Programming & Web Development:</strong> HTML, CSS, Javascript, React, Next.js, Python, Rasa, R, Java, MySQL</li>
                  <li><strong>Data Science & AI:</strong> Machine Learning, Natural Language Processing, chatbot deployment and integration</li>
                  <li><strong>Data Visualisation & Tools:</strong> Power BI, Matplotlib, Streamlit</li>
                  <li><strong>Business & Management:</strong> Business development, financial analysis, operations management</li>
                  <li><strong>Productivity Tools:</strong> Microsoft Office Suite (Word, PowerPoint, Excel, Outlook)</li>
                  <li><strong>Research & storytelling:</strong> Youth-led participatory action research, ethical AI, Cross-cultural collaboration, Conscious Leadership, Communication, problem-solving</li>
                  <li><strong>Languages:</strong> English (Fluent), Dagaare (Fluent)</li>
                </ul>
              </section>

              {/* References Section */}
              <section>
                <h2>REFERENCES</h2>
                <p>Available upon request</p>
                <div className="indent-ref">
                  <p><strong>*WASSCE:</strong> West African Senior School Certificate Examination</p>
                  <p><strong>*DIC:</strong> Design and Innovation Challenge</p>
                </div>
              </section>
            </div>
          </Card.Body>
          <Card.Footer className="text-center bg-light">
            <small className="text-muted">
              💡 <strong>Tip:</strong> For a downloadable version, please use the tailored resume above.
            </small>
          </Card.Footer>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="text-center mt-5">
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <a
            href="/documents/Matthew-Tuurozeeng-Resume.pdf"
            download
            className="btn btn-primary-custom"
            role="button"
          >
            📥 Download Resume
          </a>
          <Button 
            href="mailto:tuurozeeng.matthew@ashesi.edu.gh?subject=Job Opportunity&body=Hi Matthew, I reviewed your CV and would like to discuss..." 
            variant="outline-success"
          >
            ✉️ Contact Me
          </Button>
          <Button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="outline-secondary"
          >
            ⬆️ Back to Top
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CV;