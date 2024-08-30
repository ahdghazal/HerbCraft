import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DashboardContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    font-family: Arial, sans-serif;
`;

const WhiteHeading = styled.h2`
    color: white;
`;

const Title = styled.h1`
    text-align: center;
    color: #fffff;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 45%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        background-color: #218838;
    }
`;

const HerbTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableHead = styled.th`
    background-color: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;
`;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
    background-color: #f4f4f4;

`;

const SimulateButton = styled.button`
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

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
        <DashboardContainer>
            <Title>Admin Dashboard</Title>
            <InputContainer>
                <div>
                    <Input value={newHerb} onChange={(e) => setNewHerb(e.target.value)} placeholder="Add Herb" />
                    <Button onClick={handleAddHerb}>Add Herb</Button>
                </div>
                <div>
                    <Input value={deleteHerb} onChange={(e) => setDeleteHerb(e.target.value)} placeholder="Delete Herb" />
                    <Button onClick={handleDeleteHerb}>Delete Herb</Button>
                </div>
            </InputContainer>
            <WhiteHeading>Herb Percentages</WhiteHeading>
            <HerbTable>
                <thead>
                    <tr>
                        <TableHead>Herb Name</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Actions</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(herbs).map(([herb, percentage]) => (
                        <tr key={herb}>
                            <TableCell>{herb}</TableCell>
                            <TableCell>{percentage}%</TableCell>
                            <TableCell>
                                <SimulateButton onClick={() => handleGetLastKeys(herb)}>Simulate Use</SimulateButton>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </HerbTable>
        </DashboardContainer>
    );
}

export default AdminDashboard;
