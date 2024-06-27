import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
// import { Form } from 'react-router-dom';
import ComboBox from './ComboBox/ComboBox';

export default function DataStore() {
    const [formData, setFormData] = useState({
        Institution: '',
        School: '',
        Department: '',
        AcademicYear: '',
        ProgrammeType: '',
        Programme: '',
        Semester: '',
        Section: ''
    });
    
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
    };
    
  return (
    <Box fontFamily={'Arial, sansSerif'} maxWidth={'600px'} margin={"0px auto"} padding={'20px'} border={'1px solid #ccc'} borderRadius={'10px'}>
      <Text textAlign={'center'}>Prepare Time Table</Text>
      <form onSubmit={handleSubmit} >
        <Box>
          <label>Institution</label>
          <select name="institution" onChange={handleChange} value={formData.Institution}>
            <option value="">Select Institution</option>
            <option value="ShardaUniversity">Sharda University</option>
          </select>
        </Box>
        <Box>
          <label>School</label>
          <select name="school" onChange={handleChange} value={formData.School}>
            <option value="">Select School</option>
            <option value="School1">SSBS School</option>
          </select>
        </Box>
        <Box>
          <label>Department</label>
          <select name="department" onChange={handleChange} value={formData.Department}>
            <option value="">Select Department</option>
            <option value="Department1">Department 1</option>
            <option value="Department2">Department 2</option>
          </select>
        </Box>
        <Box>
          <label>Academic Year</label>
          <select name="academicYear" onChange={handleChange} value={formData.AcademicYear}>
            <option value="">Select Academic Year</option>
            <option value="2023">2024</option>
            <option value="2024">2025</option>
          </select>
        </Box>
        <Box>
          <label>Programme Type</label>
          <select name="programmeType" onChange={handleChange} value={formData.ProgrammeType}>
            <option value="">Select Programme Type</option>
            <option value="Type1">General Programme</option>
            <option value="Type2">Special Programme</option>
          </select>
        </Box>
        <Box>
          <label>Programme</label>
          <select name="programme" onChange={handleChange} value={formData.Programme}>
            <option value="">Select Programme</option>
            <option value="Programme1">Programme 1</option>
            <option value="Programme2">Programme 2</option>
          </select>
        </Box>
        <Box>
          <label>Semester</label>
          <select name="semester" onChange={handleChange} value={formData.Semester}>
            <option value="">Select Semester</option>
            <option value="Semester1">Semester I</option>
            <option value="Semester2">Semester II</option>
            <option value="Semester3">Semester III</option>
            <option value="Semester4">Semester IV</option>
            <option value="Semester5">Semester V</option>
            <option value="Semester6">Semester VI</option>
            <option value="Semester7">Semester VII</option>
            <option value="Semester8">Semester VIII</option>
          </select>
        </Box>
        <Box>
          <label>Section</label>
          <select name="section" onChange={handleChange} value={formData.Section}>
            <option value="">--Select Section--</option>
            <option value="Section1">Management(MGMT)</option>
          </select>
        </Box>
        <Button >Search Version</Button>
        <Button onClick={() => setFormData({
          Institution: '',
          School: '',
          Department: '',
          AcademicYear: '',
          ProgrammeType: '',
          Programme: '',
          Semester: '',
          Section: ''
        })}>Reset</Button>
      </form>
    </Box>  
  )
}



