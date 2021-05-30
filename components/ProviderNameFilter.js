import {useReducer, useContext, useEffect, useState, useRef} from 'react'
import { Box,Text, Input, Select, Checkbox, VStack } from "@chakra-ui/react";
import axios from 'axios'

import {MapContext} from './MapContextProvider'
import specialtiesOptions from "../public/specialties.json";

export default function ProviderNameFilter() {
  const {filtersState, filtersDispatch} = useContext(MapContext)
  const {name} = filtersState
  const [nameValue, setNameValue] = useState(name)

  const handleNameInputBlur = async (e) => {
    const {value} = e.target
    filtersDispatch({
      type: 'SET_NAME',
      name: value || ''
    })
  }

  useEffect(() => {
    setNameValue(name)
  }, [name])

  return (
    <>
      <Text
        fontFamily='heading'
        as='h2'fontSize='xl'
        pb={4}
        color='whatsapp.700'
        fontWeight='bold'
      >
        Search by name
      </Text>
      <Input
        onBlur={handleNameInputBlur}
        placeholder={'Enter name'}
        value={nameValue}
        onChange={(e) => {
          setNameValue(e.target.value)
        }}
      />
    </>
  );
}
