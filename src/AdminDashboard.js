import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AdminDashboard() {
    const [herbs, setHerbs] = useState({});
    const [newHerb, setNewHerb] = useState("");
    const [deleteHerb, setDeleteHerb] = useState("");

    useEffect(() => {
        fetchHerbs();
    }, []);

    const fetchHerbs = async () => {
        const response = await axios.get('https://backend-s5g3266vhq-zf.a.run.app/herbs');
        setHerbs(response.data);
    };

    const handleAddHerb = async () => {
        await axios.post('https://backend-s5g3266vhq-zf.a.run.app/add_herb', { herb_name: newHerb });
        fetchHerbs();
    };

    const handleDeleteHerb = async () => {
        await axios.post('https://backend-s5g3266vhq-zf.a.run.app/delete_herb', { herb_name: deleteHerb });
        fetchHerbs();
    };

    const handleGetLastKeys = async (herb) => {
        await axios.get('https://backend-s5g3266vhq-zf.a.run.app/last_keys', { params: { herb_group: herb } });
        fetchHerbs();
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <input value={newHerb} onChange={(e) => setNewHerb(e.target.value)} placeholder="Add Herb"/>
                <button onClick={handleAddHerb}>Add Herb</button>
            </div>
            <div>
                <input value={deleteHerb} onChange={(e) => setDeleteHerb(e.target.value)} placeholder="Delete Herb"/>
                <button onClick={handleDeleteHerb}>Delete Herb</button>
            </div>
            <h2>Herb Percentages</h2>
            <table>
                <thead>
                    <tr>
                        <th>Herb Name</th>
                        <th>Percentage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(herbs).map(([herb, percentage]) => (
                        <tr key={herb}>
                            <td>{herb}</td>
                            <td>{percentage}%</td>
                            <td>
                                <button onClick={() => handleGetLastKeys(herb)}>Simulate Use</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
