import React from 'react'
import pic1 from "./assets/images/pic1.jpg";

const About = () => {
  const wardData = [
    { number: 1, name: 'Morth Smuni' },
    { number: 2, name: 'Mar Athanasious' },
    { number: 3, name: 'St. Philips' },
  ];

  const ward2 = [
    { number: 1, name: 'Mar Basil' },
    { number: 2, name: 'Mar Gabriel' },
    { number: 3, name: 'St. Joseph' },
    { number: 4, name: 'St. Andrews' },
    { number: 5, name: 'Mar Gregorious' },
    { number: 6, name: 'St. Thomas' },
  ];

  const ward3 = [
    { number: 1, name: 'St. Paul' },
    { number: 2, name: 'Mar Aprem' },
    { number: 3, name: 'St. James' },
  ];

  const ward4 = [
    { number: 1, name: 'St. Johns' },
    { number: 2, name: 'Mar Micheal' },
    { number: 3, name: 'Mar Bahanam' },
  ];

  const ward5 = [
    { number: 1, name: 'St. George' },
    { number: 2, name: 'Morth Uluthy' },
    { number: 3, name: 'Mar Kauma' },
    { number: 4, name: 'Mar Alias' },
    { number: 5, name: 'Mar Ignatious' },
    { number: 6, name: 'St. Peters' },
  ];

  const ward6 = [
    { number: 1, name: 'Mar Severios' },
    { number: 2, name: 'Mar Yacob Burdhana' },
    { number: 3, name: 'Mar Semavoon' },
    { number: 4, name: 'Mar Ahathulla' },
    { number: 5, name: 'St. Mathews' },
    { number: 6, name: 'Mar Julius' },
  ];

  const allWards = [
    { title: "Block 1", data: wardData },
    { title: "Block 2", data: ward2 },
    { title: "Block 3", data: ward3 },
    { title: "Block 4", data: ward4 },
    { title: "Block 5", data: ward5 },
    { title: "Block 6", data: ward6 },
  ];

  return (
    <div className="about-body">
      {/* Inline CSS inside JSX */}
      <style>{`
        .about-body {
          background: #f8fafc;
          padding: 40px 20px;
          font-family: 'Poppins', sans-serif;
        }

        .about-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 40px;
          max-width: 1200px;
          margin: auto;
        }

        .about-text {
          flex: 1 1 500px;
          color: #1e293b;
        }

        .about-text h2 {
          font-size: 2rem;
          margin-bottom: 15px;
          color: #0f172a;
        }

        .about-text p {
          line-height: 1.7;
          font-size: 1.05rem;
          color: #334155;
          margin-bottom: 15px;
        }

        .about-image img {
          width: 100%;
          max-width: 400px;
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .wards-heading {
          font-size: 1.8rem;
          margin-top: 40px;
          color: #1e293b;
          text-align: center;
        }

        .ward-block {
          background: #ffffff;
          margin-top: 30px;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }

        .block-title {
          color: #0f172a;
          font-size: 1.5rem;
          font-weight: 600;
          border-left: 5px solid #e7d8c9;
          padding-left: 10px;
          margin-bottom: 10px;
        }

        .ward-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          font-size: 1rem;
        }

        .ward-table th {
          background-color: #e7d8c9;
          color: black;
          text-align: left;
          padding: 10px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        .ward-table td {
          padding: 10px;
          border-bottom: 1px solid #e2e8f0;
        }

        .ward-table tr:hover {
          background-color: #f1f5f9;
          transition: 0.3s ease;
        }

        @media (max-width: 768px) {
          .about-container {
            flex-direction: column;
          }

          .about-image img {
            max-width: 300px;
          }

          .block-title {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="about-container">
        <div className="about-text">
          <h2>Welcome to Our Church</h2>
          <p>
            St. Mary's Jacobite Syrian Cathedral, Pallikara, is a spiritual home for all who seek peace and connection with God.
            Founded with a strong tradition and deep faith, our church has grown into a vibrant and welcoming community.
          </p>
          <p>
            We offer regular services, community outreach programs, and a place of comfort for everyone.
            Our mission is to serve with love, worship with passion, and grow together in Christ.
          </p>
          <p>
            Whether you're new in town or exploring your faith, you're always welcome at our church.
          </p>

          <h2 className="wards-heading">Our Wards</h2>

          {allWards.map((wardBlock, index) => (
            <div key={index} className="ward-block">
              <h3 className="block-title">{wardBlock.title}</h3>
              <table className="ward-table">
                <thead>
                  <tr>
                    <th>Unit Number</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {wardBlock.data.map((ward) => (
                    <tr key={ward.number}>
                      <td>{ward.number}</td>
                      <td>{ward.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="about-image">
          <img src={pic1} alt="Church" />
        </div>
      </div>
    </div>
  );
};

export default About;
