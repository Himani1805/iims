import React from 'react'
import { academic } from '../../assets/js/Academic'
import { admin } from '../../assets/js/Admin'
import Apps from './Apps'
import { Box, Flex, Text } from '@chakra-ui/react'

export default function AdminDashboard() {
  return (
    <Box  backgroundColor={'#E9F6FF'} padding={'20px'} >
        <Box>
            <Text fontSize={'20px'}>Academics Profile</Text>
            <Flex flexWrap={'wrap'} gap={"10px"}  textAlign={'center'} >
                {
                    academic.map((ele, i)=>{
                    return <Apps key={i} data={ele}/>
                    })
                }
            </Flex>
        </Box>
        <Box>
            <Text fontSize={'20px'} >Administration Settings</Text>
            <Flex flexWrap={'wrap'} gap={"10px"}  textAlign={'center'} >
                {
                    admin.map((ele, i)=>{
                    return <Apps key={i} data={ele}/>
                    })
                }
            </Flex>


        </Box>

    </Box>
  )
}
