import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import ComboBox from '../../../Components/ComboBox/ComboBox'
import DataStore from '../../../Components/DataStore'
import { Institution } from '../../../assets/js/data/Commondata/institution'
import { AcademicYear } from '../../../assets/js/data/Commondata/academicYear'
import { CommonData } from '../../../assets/js/data/Commondata/commonData'
import { Department } from '../../../assets/js/data/Commondata/department'
import { Programme } from '../../../assets/js/data/Commondata/programme'
import { ProgrammeType } from '../../../assets/js/data/Commondata/programmeType'
import { School } from '../../../assets/js/data/Commondata/school'
import { Section } from '../../../assets/js/data/Commondata/section'
import { Semester } from '../../../assets/js/data/Commondata/semester'

export default function PreTimeTable() {
  return (
    <Flex >
      <Flex>
        <Box>
          <Text>Institution</Text>
          <ComboBox data={Institution} width={'20%'}/>
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
        <DataStore/>
        
      </Flex> */}