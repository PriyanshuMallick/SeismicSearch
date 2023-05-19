import React from "react";

function DisplayCard({ documents }) {
  return (
    <div>
      {documents && (
        <div className="search-result">
          {documents.length > 0 ? (
            <p> Number of hits: {documents.length}</p>
          ) : (
            <p> No results found. Try broadening your search criteria.</p>
          )}
          {documents.map((document) => (
            <div className="results-card">
              <div className="results-text">
                <p>Type: {document._source.type}</p>
                <p>Time: {document._source["@timestamp"]}</p>
                <p>Location: {document._source.place}</p>
                <p>Latitude: {document._source.coordinates.lat}</p>
                <p>Longitude: {document._source.coordinates.lon}</p>
                <p>Magnitude: {document._source.mag}</p>
                <p>Depth: {document._source.depth}</p>
                <p>Significance: {document._source.sig}</p>
                <p>Event URL: {document._source.url}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DisplayCard;
