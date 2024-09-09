import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DashboardContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    padding: 20px;

    @media (max-width: 768px) {
        width: 95%;
        padding: 10px;
    }
`;

const WhiteHeading = styled.h2`
    color: white;
`;

const Title = styled.h1`
    text-align: center;
    color: #fff;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const InputWrapper = styled.div`
    width: 48%;

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
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

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px 16px;
        margin-left: 0;
        margin-top: 10px;
    }
`;

const HerbTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const TableHead = styled.th`
    background-color: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;

    @media (max-width: 768px) {
        padding: 8px;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
    background-color: #f4f4f4;

    @media (max-width: 768px) {
        padding: 8px;
    }
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

    @media (max-width: 768px) {
        padding: 4px 8px;
        font-size: 12px;
    }
`;

const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
`;

const ProgressBar = styled.div`
    height: 20px;
    width: ${props => props.percentage}%;
    background-color: ${props => 
        props.percentage >= 70 ? '#28a745' : 
        props.percentage >= 40 ? '#ffc107' : 
        '#dc3545'};
    transition: width 0.4s ease-in-out;
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
        console.log(response.data);
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
            <Title>Herbs Dashboard</Title>
            <InputContainer>
                <InputWrapper>
                    <Input value={newHerb} onChange={(e) => setNewHerb(e.target.value)} placeholder="Add Herb" />
                    <Button onClick={handleAddHerb}>Add Herb</Button>
                </InputWrapper>
                <InputWrapper>
                    <Input value={deleteHerb} onChange={(e) => setDeleteHerb(e.target.value)} placeholder="Delete Herb" />
                    <Button onClick={handleDeleteHerb}>Delete Herb</Button>
                </InputWrapper>
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
                    {Object.entries(herbs).map(([herb, data]) => (
                        <tr key={herb}>
                            <TableCell>{herb}</TableCell>
                            <TableCell>
                                <ProgressBarContainer>
                                    <ProgressBar percentage={data.percentage} />
                                </ProgressBarContainer>
                                {data.percentage}%
                            </TableCell>
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
