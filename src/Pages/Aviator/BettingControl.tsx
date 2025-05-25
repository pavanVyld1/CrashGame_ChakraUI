import { Button, Input, Box, Grid, Stack, Text, Flex,useBreakpointValue, color, HStack, Icon, Center, VStack, Heading, Switch } from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { FaBold } from "react-icons/fa";
import Header from "./Header";
import { useOrientation } from "../../hooks/useOrientation";
import GameCanvas from "./GameCanvas";
import { useState } from "react";
import PlaceBetButtonComponent from "./PlaceBetButtonComponent";
import PlaceBetButtonStateComponent from "./PlaceBetButtonBasedOnStates";
import DataService from "../../services/dataService";
import { GameConstants, LABELS } from "../../types/projectTypes";
const BettingControls = ({ controlIndex }: { controlIndex: number }) => {
    const isMobileWidth = useBreakpointValue({ base: true, sm: true, md: false , lg: false, xl: false});
    const isMobileWidthName = useBreakpointValue({ base: "base", sm: "small", md: "md" , lg: "large", xl: "xl"});

    const isPortrait = useOrientation() === 'portrait';
    const isMobile = isMobileWidth && isPortrait;

    const [isBetPlaced, SetBetPlaced] = useState(false);

    console.log("betting controls : " + isMobileWidthName);
    // const [betAmount, setBetAmount] = useState<number>(1.0);
    // const [betMultiplier, setBetMultiplier] = useState<number>(1.0);
    // const [isAutoBetChecked, setAutoBet] = useState(false);
    // const [isAutoCashOutChecked, setAutoCashOut] = useState(false);
    let betAmount = 1.0;
    let betMultiplier = 1.0;

  const OnPlaceBetClicked = (buttonIndex:number)=>{
    console.log("Placebet is clicked");
    SetBetPlaced((isBetPlaced) => !isBetPlaced);
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
  }

  const OnCancelClicked = ()=>{
    console.log("Cancel is clicked");
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
  }

  const OnBetReduceClicked = ()=>{
    console.log("OnBetReduceClicked is clicked");
    if(betAmount <= GameConstants.MIN_BET)
      return;

    // setBetAmount(betAmount - GameConstants.BET_INCREMENTOR);
    betAmount = betAmount - GameConstants.BET_INCREMENTOR;
    DataService.updateBetAmount(controlIndex,betAmount);
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
  }

  const OnBetIncreaseClicked = ()=>{
    console.log("OnBetIncreaseClicked is clicked");

    if(betAmount >= DataService.getMaxBetValue())
      return;

    // setBetAmount(betAmount + GameConstants.BET_INCREMENTOR);
    betAmount = betAmount + GameConstants.BET_INCREMENTOR
    DataService.updateBetAmount(controlIndex,betAmount);
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
  }

  const OnAmountClicked = (value: number)=> {
    console.log("OnAmountClicked is clicked : " + value);
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
    if(value > DataService.getMaxBetValue())
      return;
    // setBetAmount(value);
    betAmount = value;
    console.log("Bet Test amount set : " + betAmount);
    DataService.updateBetAmount(controlIndex,betAmount);
  }

  const OnSetMultiplier = (value: number)=> {
    console.log("OnAmountClicked is clicked : " + value);
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
    if(value > DataService.getMaxMultiplierValue())
      return;
    // setBetMultiplier(value);
    betMultiplier = value;
    DataService.updateMultiplier(controlIndex,betMultiplier);
  }

  const OnMultiplierReduceClicked = ()=>{
    console.log("OnBetReduceClicked is clicked");
    if(betMultiplier <= GameConstants.MIN_MULTIPLIER)
      return;

    // setBetMultiplier(betMultiplier - GameConstants.MULTIPLIER_INCREMENTOR);
    betMultiplier = betMultiplier - GameConstants.MULTIPLIER_INCREMENTOR
    DataService.updateMultiplier(controlIndex,betMultiplier);
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
  }

  const OnMultiplierIncreaseClicked = ()=>{
    console.log("OnBetIncreaseClicked is clicked");

    if(betMultiplier >= DataService.getMaxMultiplierValue())
      return;

    // setBetMultiplier(betMultiplier + GameConstants.MULTIPLIER_INCREMENTOR);
    betMultiplier = betMultiplier + GameConstants.MULTIPLIER_INCREMENTOR
    
    DataService.updateMultiplier(controlIndex,betMultiplier);
    // const data =  GameCanvas();
    // console.log("Placebet is clicked " + data);
  }

  return (
    <Stack spacing={4} >
        <Flex flex={1} align="center" alignSelf={"center"} alignContent={"center"} position={"relative"} gap={2} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={2} alignItems='center' bgColor={"gray.900"}>
          <VStack borderWidth={1} gap={1.5} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"} >
          <Flex w="100%" align="center" justify="space-between" px={2}>
            <Flex flex="1" justify="center">
              <Heading fontSize={{ base: "xs", sm: "sm", md: "md", lg: "md", xl: "md" }} color="gray.100">{LABELS.BET}</Heading>
            </Flex>
              {/* <Switch size={{ base: "xs", sm: "sm", md: "md", lg: "md", xl: "md" }} colorScheme="green" 
                isChecked={isAutoBetChecked}
                onChange={() => setAutoBet(!isAutoBetChecked)}
              /> */}
          </Flex>
          <HStack flex={1} borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"}>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "sm" , lg: "md", xl: "md"}} iconSpacing={2} onClick={()=>{
            OnBetReduceClicked();
          }}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type="number"
            defaultValue="1.00"
            value={betAmount.toFixed(2)}
            onChange={(e) => {
              const value = Math.round(parseFloat(e.target.value) * 100) / 100;
              OnAmountClicked(value);
            }}
            // w={100}
            // w={{ base: "16", sm: "16", md: "100" , lg: "100", xl: "100"}}
            w={{ base: 75, sm: 75, md: 100 , lg: 100, xl: 100}}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            textAlign={"center"}
            fontSize={{ base: "xs", sm: "md", md: "md" , lg: "md", xl: "md"}}
            fontWeight={"bold"}
          ></Input>
          <Text color="gray.400" fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} fontWeight={"bold"}>USD</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "sm" , lg: "md", xl: "md"}} iconSpacing={2} onClick={ ()=>{
            OnBetIncreaseClicked();
          }
          }> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          </HStack>
          <Flex gap={{ base: 1, sm: 1, md: 2 , lg: 2, xl: 2}} mt={{ base: 0, sm: 2, md: 2 , lg: 2, xl: 2}} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={0} direction={"row"} paddingBottom={1} alignContent={'center'}>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}} onClick={()=>{
              OnAmountClicked(GameConstants.ONE);
            }}>
              {GameConstants.ONE + "$"}
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}} onClick={()=>{
              OnAmountClicked(GameConstants.FIVE);
            }}>
              {GameConstants.FIVE + "$"}
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}} onClick={()=>{
              OnAmountClicked(GameConstants.TEN);
            }}>
              {GameConstants.TEN + "$"}
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}} onClick={()=>{
              OnAmountClicked(GameConstants.ALLIN);
            }}>
              {GameConstants.ALLIN+ "$"}
            </Button>
          </Flex>
          </VStack>

          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"} alignContent={'center'} alignSelf={'center'} h={'full'}>
          <Flex w="100%" align="center" justify="space-between" px={2}>
            <Flex flex="1" justify="center">
              <Heading fontSize={{ base: "xs", sm: "sm", md: "md", lg: "md", xl: "md" }} color="gray.100">{LABELS.COLLECT}</Heading>
            </Flex>
              {/* <Switch size={{ base: "xs", sm: "sm", md: "md", lg: "md", xl: "md" }} colorScheme="green" 
                isChecked={isAutoCashOutChecked}
                onChange={() => setAutoCashOut(!isAutoCashOutChecked)}
              /> */}
          </Flex>
          <HStack borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"} >
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} iconSpacing={2} onClick={ ()=>{
            OnMultiplierReduceClicked();
          }
          }> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type={"number"}
            defaultValue="1.30"
            value={betMultiplier.toFixed(2)}
            onChange={(e) => {
              const value = Math.round(parseFloat(e.target.value) * 100) / 100;
              OnSetMultiplier(value);
            }}
            w={{ base: 75, sm: 75, md: 100 , lg: 100, xl: 100}}
            maxWidth={100}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            fontSize={{ base: "xs", sm: "md", md: "md" , lg: "md", xl: "lg"}}
            textAlign={"center"}
          ></Input>
          <Text color="gray.400" fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}>X</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} iconSpacing={2} onClick={ ()=>{
            OnMultiplierIncreaseClicked();
          }
          }> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          
          </HStack>
          <PlaceBetButtonStateComponent index = {controlIndex}/>
          </VStack>
         
        </Flex>
      </Stack>
  );
};

export default BettingControls;


