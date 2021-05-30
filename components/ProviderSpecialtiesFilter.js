import {useReducer, useContext, useState} from 'react'
import { Box,Text,Button, Select, Checkbox, VStack } from "@chakra-ui/react";

import {MapContext} from './MapContextProvider'
import ChevronDown from './ChevronDown'
import ChevronUp from './ChevronUp'
import specialtiesOptions from "../public/specialties.json";

export default function ProviderFilters() {
  const {filtersState, filtersDispatch} = useContext(MapContext)
  const [isShowingMore, setIsShowingMore] = useState(false)
  const {specialties} = filtersState
  const allChecked = Object.keys(specialtiesOptions).length === specialties.length
  const isIndeterminate = specialties.length > 0 && !allChecked

  const handleCheck = (e) => {
    const {checked, value} = e.target
    if (checked) {
      filtersDispatch({type: 'ADD_SPECIALTY', specialtyId: value})
    } else {
      filtersDispatch({type: 'REMOVE_SPECIALTY', specialtyId: value})
    }
  }

  const handleAllChecks = (e) => {
    const {checked, value} = e.target
    if (checked) {
      filtersDispatch({type: 'SET_ALL_SPECIALTIES'})
    } else {
      filtersDispatch({type: 'CLEAR_SPECIALTIES'})
    }
  }

  return (
    <>
      <Text
        fontFamily='heading'
        as='h2'fontSize='xl'
        pb={4}
        color='whatsapp.700'
        fontWeight='bold'
      >
        Specialties Filters
      </Text>
      <VStack align='flex-start'>
        <Checkbox
          colorScheme='whatsapp'
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={handleAllChecks}
          size='lg'
        >
          <Text fontWeight='semibold'>All specialties</Text>
        </Checkbox>
        {Object.keys(specialtiesOptions).slice(0, isShowingMore ? undefined : 5).map((specialtyId, index) => {
          return (
            <Checkbox
              pl={4}
              colorScheme='whatsapp'
              isChecked={allChecked || specialties.includes(specialtyId)}
              onChange={handleCheck}
              value={specialtyId}
              key={specialtyId}
              size='lg'
            >
              {specialtiesOptions[specialtyId]}
            </Checkbox>
          )
        })}
        <Button
          variant='ghost'
          onClick={() => setIsShowingMore(!isShowingMore)} 
          rightIcon={isShowingMore ? <ChevronUp /> : <ChevronDown />}
          px={0}
        >
          Show {isShowingMore ? 'less' : 'more'} 
        </Button>
      </VStack>
    </>
  );
}
