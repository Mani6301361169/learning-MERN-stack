import '../../App.css';

const companies = [
  {
    name: 'TCS',
    role: 'Software Engineer',
    package: '₹6 LPA',
    visitDate: '20 July 2026'
  },
  {
    name: 'Infosys',
    role: 'System Engineer',
    package: '₹4.5 LPA',
    visitDate: '22 July 2026'
  },
  {
    name: 'Wipro',
    role: 'Project Engineer',
    package: '₹3.5 LPA',
    visitDate: '25 July 2026'
  },
  {
    name: 'Accenture',
    role: 'Associate Software Engineer',
    package: '₹5.5 LPA',
    visitDate: '28 July 2026'
  }
];

function CompaniesPage() {
  return (
    <div className="page-card">
      <h2>Companies Visiting for Placements</h2>
      <p>Here are some companies expected to visit the college for placement drives.</p>

      <table className="students-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Package</th>
            <th>Visit Date</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.name}>
              <td>{company.name}</td>
              <td>{company.role}</td>
              <td>{company.package}</td>
              <td>{company.visitDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompaniesPage;
