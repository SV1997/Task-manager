import { useState } from 'react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardMain from '../components/Dashboard/DashboardMain';
import DashboardFooter from '../components/Dashboard/DashboardFooter';
import { taskAPI } from '../services/api';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('add'); // 'add' | 'view'
  const [refreshKey, setRefreshKey] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [entriesCount, setEntriesCount] = useState(0);

  const handleTaskCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setActiveTab('view'); // optional: jump to view after create
  };

  const handleDownloadExcel = async () => {
    try {
      setDownloading(true);
      await taskAPI.downloadExcel();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download Excel file');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="app">
      <div className="background-pattern" />

      <div className="container">
        <DashboardHeader
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onExport={handleDownloadExcel}
          exporting={downloading}
          entriesCount={entriesCount}
        />

        <DashboardMain
          activeTab={activeTab}
          refreshKey={refreshKey}
          onTaskCreated={handleTaskCreated}
          onEntriesCountChange={setEntriesCount}
        />

        <DashboardFooter />
      </div>
    </div>
  );
}

export default Dashboard;
