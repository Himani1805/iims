import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import ComboBox from '../../../Components/ComboBox/ComboBox'
import {
  Institution,
  AcademicYear,
  Department,
  Programme,
  ProgrammeType,
  School,
  Section,
  Semester
} from '../../../assets/js/data/Commondata/commonData.js'
import ButtonSubmit from '../../../Components/Button/ButtonSubmit.jsx'
import ButtonReset from '../../../Components/Button/ButtonReset.jsx'

export default function PreTimeTable() {
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

  const btnSubmitStyle = {
    padding: "10px 40px",
    bg: "white",
    color: "black",
    bgHover: "teal",
    colorHover: "white",
    border: "1px",
    borderColor: "gray.500",
    radius: "2px",
  };

  const btnResetStyle = {
    padding: "10px 40px",
    bg: "white",
    color: "black",
    bgHover: "black",
    colorHover: "white",
    border: "1px",
    borderColor: "gray.500",
    radius: "2px",
  };
  function handleSelect(e){
    // alert("Select triggered", e.target.value)
    const {name,value}=e.target
    setFormData({
      ...formData,
      [name]: value
      });

  }
  function handleOnSave() {
    console.log(formData)
  }
  function handleOnReset(e) {
    setFormData({
      ...formData,Institution: '',
      School: '',
      Department: '',
      AcademicYear: '',
      ProgrammeType: '',
      Programme: '',
      Semester: '',
      Section: ''
    })
    // console.log(e.target.value)
    // alert("Button Reset Clicked", e.target.value);
  }

  return (

    <Flex >
      <Flex justifyContent={'space-around'} flexWrap={'wrap'} gap={'20px'} alignItems={'center'}>
        <Box>
          <Text>Institution</Text>
          <ComboBox name='Institution' value={formData.Institution} data={Institution} fieldName='name' optionName={'Institution'} width={'300px'} selectChange={handleSelect}/>
        </Box>
        <Box>
          <Text>School</Text>
          <ComboBox name='School' value={formData.School} data={School} fieldName='name' optionName={'School'} width={'300px'} selectChange={handleSelect}/>
        </Box>
        <Box>
          <Text>Department</Text>
          <ComboBox name='Department' value={formData.Department} data={Department} fieldName='name' optionName={'Department'} width={'300px'} selectChange={handleSelect}/>
        </Box>
        <Box>
          <Text>Academic Year</Text>
          <ComboBox name='AcademicYear' value={formData.AcademicYear} data={AcademicYear} fieldName='year' optionName={'Academic Year'} width={'300px'} selectChange={handleSelect}/>
        </Box>
        <Box>
          <Text>Programme Type</Text>
          <ComboBox name='ProgrammeType' value={formData.ProgrammeType} data={ProgrammeType} fieldName='name' optionName={'Type'} width={'200px'} selectChange={handleSelect}/>
        </Box>
        <Box>
          <Text>Programme</Text>
          <ComboBox name='Programme' value={formData.Programme} data={Programme} fieldName='name' optionName={'Programme'} width={'200px'} selectChange={handleSelect}/>
        </Box>
        <Box>
          <Text>Semster</Text>
          <ComboBox name='Semester' value={formData.Semester}data={Semester} fieldName='name' optionName={'Semester'} width={'200px'} selectChange={handleSelect}/>
        </Box>
        <Box>
          <Text>Section</Text>
          <ComboBox name='Section' value={formData.Section} data={Section} fieldName='name' optionName={'Section'} width={'200px'} selectChange={handleSelect}/>
        </Box>
        <Box>
          <ButtonSubmit
            text="Submit"
            onSave={handleOnSave}
            style={btnSubmitStyle}
          />
        </Box>
        <Box>
          <ButtonReset text="Reset" onReset={handleOnReset} style={btnResetStyle} />
        </Box>
      </Flex>
  
    </Flex>

  )
}
{/* <Flex justifyContent={'space-around'} gap={"5px"} width={'100%'}>
        <Box width={'70%'}>
          <Image src='https://cdn3.iconfinder.com/data/icons/tiny-iconz-vol-07/20/time_clock_history_waiting_timer-64.png' width={"15px"}/>
          <Text>Prepare Time Table</Text>
        </Box>
        <Box width={'80%'} marginLeft={'10px'}>
          <Button>
            <Image src='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_left_48px-64.png' width={"20px"}/>
            <Text>Back</Text>
          </Button>
          <Button backgroundColor={'pink'}>
            <Image src='https://cdn3.iconfinder.com/data/icons/user-interface-ui-navigation-1/62/Plus-64.png' width={"20px"} />
            <Text>Setup - College Structure</Text>
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Text>Instittution</Text>
        {/* <ComboBox/> */}
      //   <DataStore/>
        
      // </Flex> */}