function DashboardHeader({
  activeTab,
  onChangeTab,
  onExport,
  exporting,
  entriesCount,
}: any) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="4" stroke="white" strokeWidth="2" />
              <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="app-title">Work Log</h1>
            <p className="app-subtitle">PLR Chambers (MoRTH)</p>
          </div>
        </div>

        {/* TOP NAV (3 cards like your image) */}
        <nav className="top-nav">
          <button
            type="button"
            className={`nav-card nav-add ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => onChangeTab('add')}
          >
            Add
            <br />
            Entry
          </button>

          <button
            type="button"
            className={`nav-card nav-view ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => onChangeTab('view')}
          >
            View
            <br />
            Entries ({entriesCount})
          </button>

          <button
            type="button"
            className="nav-card nav-export"
            onClick={onExport}
            disabled={exporting}
            title="Export to Excel"
          >
            {exporting ? (
              <>
                <span className="button-spinner" />
                Exporting...
              </>
            ) : (
              <>
                Export
                <br />
                to
                <br />
                Excel
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;
