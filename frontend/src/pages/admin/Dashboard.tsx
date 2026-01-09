import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar';
import DashboardCard from '../../components/admin/DashboardCard';
import { adminProjectsApi, adminImpactApi, adminContactApi } from '../../services/AdminApi';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    projects: 0,
    impact: 0,
    contacts: 0,
    newContacts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, impactRes, contactsRes] = await Promise.all([
          adminProjectsApi.getAll(),
          adminImpactApi.getAll(),
          adminContactApi.getAll(),
        ]);

        const newContactsCount = contactsRes.data.filter(
          (contact: any) => contact.status === 'new'
        ).length;

        setStats({
          projects: projectsRes.data.length,
          impact: impactRes.data.length,
          contacts: contactsRes.data.length,
          newContacts: newContactsCount,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '2rem' }}>
        <Container fluid>
          <h2 className="mb-4">Dashboard Overview</h2>

          <Row>
            <Col md={3}>
              <DashboardCard
                title="Total Projects"
                count={stats.projects}
                icon="💼"
                color="#994545"
              />
            </Col>
            <Col md={3}>
              <DashboardCard
                title="Impact Initiatives"
                count={stats.impact}
                icon="🌟"
                color="#9C484F"
              />
            </Col>
            <Col md={3}>
              <DashboardCard
                title="Total Contacts"
                count={stats.contacts}
                icon="📧"
                color="#997446"
              />
            </Col>
            <Col md={3}>
              <DashboardCard
                title="New Messages"
                count={stats.newContacts}
                icon="🔔"
                color="#F5C9AE"
              />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12}>
              <div className="p-4 bg-light rounded">
                <h5>Welcome to your Portfolio Dashboard!</h5>
                <p className="mb-0">
                  Use the sidebar to manage your projects, impact initiatives, profile, and contact messages.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;