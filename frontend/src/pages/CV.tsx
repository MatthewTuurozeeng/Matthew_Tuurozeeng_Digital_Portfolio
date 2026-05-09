import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import '../styles/cv.css';

const CV: React.FC = () => {

  const resumePath = '/documents/Matthew_Tuurozeeng_Resume.pdf';
  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h2 className="section-title">Curriculum Vitae</h2>
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
             View Master CV
          </Button>
          <a
            href={resumePath}
            download
            className="btn btn-secondary-custom btn-lg d-inline-flex align-items-center justify-content-center"
            role="button"
          >
            Download Resume (PDF)
          </a>
        </div>
      </div>

      <Row className="mt-5">
        <Col lg={6} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Body>
              <h4 style={{ color: '#994545' }}> Master CV</h4>
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
                 View Below
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Body>
              <h4 style={{ color: '#9C484F' }}> Tailored Resume</h4>
              <p>
                Role-specific resume highlighting relevant experiences and skills. 
                Optimized for specific job applications and recruiter review.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <Button 
                  href={resumePath} 
                  target="_blank"
                  variant="outline-primary"
                  className="btn-primary-custom btn-outline-custom"
                  rel="noopener noreferrer"
                >
                   View PDF
                </Button>
                <a
                  href="/documents/Matthew_Tuurozeeng_Resume.pdf"
                  download
                  className="btn btn-secondary-custom"
                  role="button"
                >
                   Download
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
              <h3 className="mb-0"> Matthew Tuurozeeng - Master CV </h3>
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
                    {/* Cumulative GPA: 3.67/4.00 */}
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

              </section>
              <div className="entry">
                  <div className="left">
                    <strong>African Leadership Academy</strong> - South Africa <br />
                    <b>Public Policy Research Intern</b>
                    <ul>
                      <li>
                        Developed a comprehensive policy framework addressing corruption in African governance,
                        focusing on transparency, legal reforms, and accountability
                      </li>
                      <li>
                        Authored a detailed 3-page policy recommendation document proposing three actionable
                        strategies to reduce public sector corruption
                      </li>
                      <li>
                        Presented policy recommendations to a panel of policy experts, advocating for practical
                        implementation to ensure good governance
                      </li>
                    </ul>
                  </div>
                  <div className="right">May 2024 - Jul 2024</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>O-Vanni Foods</strong> - Nigeria <br />
                    <b>Partnerships & Business Development Volunteer</b>
                    <ul>
                      <li>
                        Managed and nurtured relationships with 3+ strategic partners supporting business growth
                      </li>
                      <li>
                        Assisted in developing and executing partnership strategies, contributing to a 20% increase
                        in partner engagement and new business opportunities
                      </li>
                      <li>
                        Conducted research to identify 5+ potential partnership opportunities, leading to two new
                        partnership agreements
                      </li>
                    </ul>
                  </div>
                <div className="right">Jun 2024 - Oct 2024</div>
              </div>

              <div className="entry">
                <div className="left">
                  <strong>Mr. Dan Farming & Rearing Venture</strong> - Wa, Ghana <br />
                  <b>Agricultural Operations Manager</b>
                  <ul>
                    <li>
                      Cultivated and managed tiger nuts and other grains, contributing 45% of annual farm revenue
                    </li>
                    <li>
                      Applied improved agricultural techniques in cultivation, fertiliser application, weeding,
                      and harvesting, increasing crop yield by 30%
                    </li>
                    <li>
                      Oversaw livestock operations, successfully rearing goats, sheep, poultry, and guinea fowls,
                      contributing approximately 4% to overall income
                    </li>
                  </ul>
                </div>
                <div className="right">2013 - 2024</div>
              </div>

              <div className="entry">
                <div className="left">
                <strong>Machris Christian Academy</strong> -  Ghana <br />
                <b>Tutor & Student Mentor</b>
                <ul>
                  <li>
                    Tutored Mathematics and Integrated Science, contributing to a 20% improvement in examination
                    performance for approximately 60% of students
                  </li>
                  <li>
                    Mentored and coached over 50 students, improving academic discipline and learning habits
                  </li>
                  <li>
                    Organised remedial classes to prepare students for the BECE, improving performance for over
                    30 students
                  </li>
                </ul>
              </div>
              <div className="right">Mar 2013 - Sep 2020</div>
            </div>
            


              {/* Projects Section */}
              <section>
                <h2>PROJECTS AND RESEARCH</h2>

                <div className="entry">
                  <div className="left">
                    <strong>Daakye Vendor Space</strong> - Ghana <br />
                    <b>Full-Stack Engineer</b>
                    <ul>
                      <li>
                        Built a RESTful API with Node.js, Express, and TypeScript across 8 route
                        modules, 6 validators, and 5 services following a strict layered architecture
                        with JWT-secured endpoints and MongoDB Atlas database
                      </li>
                      <li>
                        Engineered a ow-stock notification system and analytics dashboard
                        tracking sales trends, daily summaries, and top-selling products across 5
                        core data entities
                      </li>
                      <li>
                        Shipped a full-stack application to Vercel via GitHub Actions
                        CI/CD pipeline intended to serve informal market vendors across Ghana
                      </li>
                    </ul>
                  </div>
                  <div className="right">Feb 2026 - May 2026</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>Matthew Tuurozeeng Professional Portfolio</strong> - Accra, Ghana <br />
                    <b>Full-Stack Product Owner & Developer</b>
                    <ul>
                      <li>
                        Architected a full-stack portfolio with an admin dashboard and REST API, shipping 15+ reusable components and accelerating future project launches.
                      </li>
                      <li>
                        Implemented a static-data fallback plus WhatsApp contact automation, enabling recruiters to reach me instantly even without a backend.
                      </li>
                      <li>
                        Deployed the Vite/React frontend to Vercel with CI-ready tooling, achieving sub-1s First Contentful Paint on desktop and mobile.
                      </li>
                    </ul>
                  </div>
                  <div className="right">Jan 2026 - Mar 2026</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>Machris Christian Academy</strong> - Nadowli, Ghana <br />
                    <b>Full-Stack Web Developer</b>
                    <ul>
                      <li>
                        Designed and developed a modern, responsive web application serving as the school's digital
                        presence and admission management system
                      </li>
                      <li>
                        Developed RESTful APIs using Express.js and integrated a MySQL database for reliable,
                        database-driven application and enquiry management
                      </li>
                      <li>
                        Delivered a clean, intuitive UI using React, Bootstrap, and Vite, ensuring cross-device
                        responsiveness and usability
                      </li>
                    </ul>
                  </div>
                  <div className="right">Nov 2025 - Dec 2025</div>
                </div>

                <div className="entry">
                  <div className="left">
                    <strong>For Youth By Youth (FYBY) Platform</strong> <br />
                    <b>Project Coordinator & Frontend Developer</b>
                    <ul>
                      <li>
                        Coordinated a five-member development team to build a collaborative web platform empowering
                        young people to connect, volunteer, and lead community-driven social impact initiatives
                      </li>
                      <li>
                        Implemented core platform features such as blogs, event management, volunteer matching, and
                        community engagement tools
                      </li>
                      <li>
                        Managed deployment and optimization processes, ensuring responsive design, fast load times,
                        and SEO-friendly routing
                      </li>
                    </ul>
                  </div>
                  <div className="right">Oct 2025 - Nov 2025</div>
                </div>

                <div className="entry">
                <div className="left">
                  <strong>Dipa </strong> - Ashesi University <br />
                  <b>Researcher & Chief Operations Officer</b>
                  <ul>
                    <li>
                      Led ethnographic research with 30+ market women to identify key drivers of unhealthy eating
                      habits and inform solution design
                    </li>
                    <li>
                      Conducted a market feasibility study analysing 50+ survey responses to validate demand and
                      refine product features
                    </li>
                    <li>
                      Oversaw development and pilot testing of a minimum viable product, achieving 85% positive
                      user feedback and strong indicators for market adoption
                    </li>
                  </ul>
                </div>
                <div className="right">Jan 2024 - Sep 2024</div>
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

              <section>
            <h2>FELLOWSHIPS & LEADERSHIP PROGRAMS</h2>

            {/* Jim Leech Mastercard Foundation Fellowship */}
            <div className="entry">
              <div className="left">
                <strong>Jim Leech Mastercard Foundation Fellowship</strong> - Ghana Chapter <br />
                <b>Fellow</b>
                <ul>
                  <li>
                    Selected to participate in the Explore Entrepreneurship phase, running from mid-January to
                    March, focused on early-stage venture development
                  </li>
                  <li>
                    Completing curated online entrepreneurship courses and the first 11 steps of the
                    Disciplined Entrepreneurship framework workbook
                  </li>
                  <li>
                    Engaging in in-person activities including market research, prototyping, testing, and
                    networking to validate and scale business ideas
                  </li>
                </ul>
              </div>
              <div className="right">Jan 2026 - Present</div>
            </div>

            {/* For Youth, By Youth Movement */}
            <div className="entry">
              <div className="left">
                <strong>Talloires Network of Engaged Universities</strong> - Medford <br />
                <b>For Youth, By Youth Movement (FYBY), Inaugural Cohort Member</b>
                <ul>
                  <li>
                    Selected as one of 50 youth leaders worldwide from a highly competitive applicant pool for
                    the inaugural FYBY movement
                  </li>
                  <li>
                    Participating in a three-year global fellowship focused on conscious leadership, youth-led
                    participatory action research, ethical AI, and storytelling
                  </li>
                  <li>
                    Collaborating with peers from 18+ countries to drive community transformation and foster
                    global solidarity
                  </li>
                
                </ul>
              </div>
              <div className="right"> Mar 2025 - Present</div>
            </div>

            {/* Millennium Fellowship */}
            <div className="entry">
              <div className="left">
                <strong>United Nations Academic Impact & Millennium Campus Network</strong> - Boston <br />
                <b>Millennium Fellow (Class of 2025)</b>
                <ul>
                  <li>
                    Selected as one of 4,000 fellows globally from over 60,000 applicants across 7,500+
                    campuses (approximately 4% acceptance rate)
                  </li>
                  <li>
                    Engaged in global leadership development and community- and campus-based social impact
                    projects advancing the UN Sustainable Development Goals (SDGs)
                  </li>
                  <li>
                    Collaborated with peers across 290+ campuses in 20+ countries to design and implement
                    initiatives that drive measurable community impact
                  </li>
                </ul>
              </div>
              <div className="right">Aug 2025 - Nov 2025</div>
            </div>

          </section>

              {/* Co-curricular Activities */}
              <section>
                <h2>COMMUNITY ENGAGEMENT & SERVICE</h2>
                <div className="entry">
                  <div className="left">
                    <strong>Computing4All Initiative</strong> <br />
                    <b>Founder & Volunteer Instructor</b>
                    <ul>
                      <li>
                        Designed and delivered a community-based digital literacy program to equip school children
                        with foundational computer skills and confidence in technology
                      </li>
                      <li>
                        Engaged and mentored 25+ students through hands-on learning sessions, dedicating two-hour
                        classes three times a week using personal resources
                      </li>
                      <li>
                        Developed practical lessons covering basic computer use, digital literacy, and safe
                        technology practices to bridge access gaps for underserved learners
                      </li>
                    </ul>
                  </div>
                  <div className="right">Dec 2025 - Present</div>
                </div>
                <div className="entry">
                  <div className="left">
                    <strong>Talloires Network of Engaged Universities</strong> - Tufts University <br />
                    <b>Social Media Design Consultant - Volunteer</b>
                    <ul>
                      <li>
                        Designed 15+ multi-format social graphics per month, boosting average post reach by 28% across FYBY channels.
                      </li>
                      <li>
                        Built reusable Canva/Figma templates that cut content turnaround time from 3 days to under 24 hours for partner teams.
                      </li>
                      <li>
                        Co-led quarterly storytelling campaigns highlighting youth-led impact, increasing newsletter clickthrough by 18%.
                      </li>
                    </ul>
                  </div>
                  <div className="right">Feb 2026 - Present</div>
                </div>

                  <div className="entry">
                    <div className="left">
                      <strong>Kingdom Christian Fellowship</strong> - Ashesi University <br />
                      <b>Member, Technical Team</b>
                      <ul>
                        <li>
                          Supported worship services through skilled drumming to enhance musical quality and
                          congregation engagement
                        </li>
                        <li>
                          Collaborated with the technical team to ensure smooth coordination of church events and
                          programs
                        </li>
                      </ul>
                    </div>
                    <div className="right">Jan 2024 - Present</div>
                  </div>

                  <div className="entry">
                    <div className="left">
                      <strong>Robotics Club</strong> - Ashesi University <br />
                      <b>Build Team Member</b>
                      <ul>
                        <li>
                          Co-led a 5-person subteam to prototype an autonomous line-following robot, cutting lap times by 35% over the semester.
                        </li>
                        <li>
                          Organized weekly troubleshooting clinics that helped 20+ members debug sensors and microcontroller code, boosting project completion rates.
                        </li>
                      </ul>
                    </div>
                    <div className="right">Feb 2025 - Present</div>
                  </div>

                  <div className="entry">
                    <div className="left">
                      <strong>Investment Club</strong> - Ashesi University <br />
                      <b>Active Member</b>
                      <ul>
                        <li>
                          Participated in discussions and workshops on investment strategies and financial literacy
                        </li>
                        <li>
                          Contributed to peer learning through group analysis and collaborative discussions
                        </li>
                      </ul>
                    </div>
                    <div className="right">Jan 2024 - Present</div>
                  </div>
              </section>


                            {/* Skills Section */}
              <section>
                <h2>SKILLS</h2>

                <div className="skill-category mt-2">
                  <h2 className="skill-subheading">Technical</h2>
                  <ul>
                    <li>
                      <strong>Programming & Web Development:</strong> HTML, CSS, JavaScript, React, Next.js, Python,
                      Java, R, Rasa, MySQL
                    </li>
                    <li>
                      <strong>Backend & Databases:</strong> Node.js, Express.js, RESTful APIs, JWT Authentication,
                      MySQL2, Cloudinary
                    </li>
                    <li>
                      <strong>Data Science & AI:</strong> Machine Learning, Natural Language Processing, chatbot
                      development & deployment
                    </li>
                    <li>
                      <strong>Data Visualisation & Analytics:</strong> Power BI, Matplotlib, Streamlit
                    </li>
                    <li>
                      <strong>Frontend & Tooling:</strong> Vite, Bootstrap, React Bootstrap, React Router, Axios,
                      React Hook Form
                    </li>
                    <li>
                      <strong>Productivity & Version Control:</strong> Microsoft Office Suite (Word, Excel,
                      PowerPoint, Outlook), Git, GitHub
                    </li>
                  </ul>
                </div>

                <div className="skill-category mt-3">
                  <h2 className="skill-subheading">Leadership and Professional</h2>
                  <ul>
                    <li>
                      <strong>Project Management:</strong> Team coordination, meeting deadlines, communication,
                      problem-solving
                    </li>
                    <li>
                      <strong>Business & Operations:</strong> Business development, financial analysis, operations
                      management, partnership strategy
                    </li>
                    <li>
                      <strong>Research & Engagement:</strong> Youth-led participatory action research, ethical AI,
                      cross-cultural collaboration, storytelling
                    </li>
                    <li>
                      <strong>Core Strengths:</strong> Strategic leadership and decision-making, designing and
                      implementing scalable solutions
                    </li>
                    <li>
                      <strong>Languages:</strong> English (Fluent), Dagaare (Fluent)
                    </li>
                  </ul>
                </div>
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
               <strong>Tip:</strong> For a downloadable version, please use the tailored resume above.
            </small>
          </Card.Footer>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="text-center mt-5">
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <a
            href={resumePath}
            download
            className="btn btn-primary-custom"
            role="button"
          >
            Download Resume
          </a>
          <Button 
            href="mailto:tuurozeeng.matthew@ashesi.edu.gh?subject=Job Opportunity&body=Hi Matthew, I reviewed your CV and would like to discuss..." 
            className="btn btn-secondary-custom"
            variant="outline-success"
          >
            Contact Me
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