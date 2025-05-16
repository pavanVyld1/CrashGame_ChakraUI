import { Button, Input, Box, Grid, Stack, Text, Flex,useBreakpointValue, color, HStack, Icon, Center, VStack, Heading } from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { FaBold } from "react-icons/fa";
import Header from "./Header";
import { useOrientation } from "../../hooks/useOrientation";
import GameCanvas from "./GameCanvas";
import { useEffect, useRef, useState } from "react";
import { BetButtonState, LABELS } from "../../types/projectTypes";


const PlaceBetButtonComponent = ({ index }: { index: number }) => { 

    const currentIndex = index;
    const [buttonState, setButtonState] = useState<BetButtonState>(BetButtonState.Idle);

    const prevLabel = LABELS.PLACE_BET;
    const amount : number = 100;

    const placeBetButtonRef = useRef<HTMLButtonElement | null>(null);
    const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
    const collectButtonRef = useRef<HTMLButtonElement | null>(null);

    const OnPlaceBetClicked = (buttonIndex:number)=>{
        console.log("Placebet is clicked");
        if(buttonState != BetButtonState.BetPlaced)
            setButtonState(BetButtonState.BetPlaced);
        else
            setButtonState(BetButtonState.Idle);

            toggleButtonDisplay(placeBetButtonRef);
            toggleButtonDisplay(cancelButtonRef);
    }

    const OnCancelClicked = (buttonIndex:number)=>{
        console.log("Placebet is clicked");
        if(buttonState != BetButtonState.BetPlaced)
            setButtonState(BetButtonState.BetPlaced);
        else
            setButtonState(BetButtonState.Idle);
        toggleButtonDisplay(cancelButtonRef);
        toggleButtonDisplay(placeBetButtonRef);
    }

    const OnCollectClicked = (buttonIndex:number)=>{
        console.log("Placebet is clicked");
        if(buttonState != BetButtonState.BetPlaced)
            setButtonState(BetButtonState.BetPlaced);
        else
            setButtonState(BetButtonState.Idle);

            toggleButtonDisplay(collectButtonRef);

        }

    const toggleButtonDisplay = (buttonRef: React.RefObject<HTMLButtonElement>) => {
        if (buttonRef.current) {
            const currentDisplay = buttonRef.current.style.display;
            console.log("button ref  : " + buttonRef.current.id);
            console.log("current Display : " + currentDisplay);
            currentDisplay === "none" ? showButton(buttonRef) : hideButton(buttonRef);
        }
    };

    const showButton = (buttonRef: React.RefObject<HTMLButtonElement>) => {
        if (buttonRef.current) {
            const currentDisplay = buttonRef.current.style.display;
            console.log("showButton button ref  : " + buttonRef.current.id);
            console.log("current Display : " + currentDisplay);
            buttonRef.current.style.display = "inline-block";
        }
    };

    const hideButton = (buttonRef: React.RefObject<HTMLButtonElement>) => {
        if (buttonRef.current) {
            const currentDisplay = buttonRef.current.style.display;
            console.log("showButton button ref  : " + buttonRef.current.id);
            console.log("current Display : " + currentDisplay);
            buttonRef.current.style.display = "none";
        }
    };

    const getButtonLabel = () => {
        switch (buttonState) {
        case BetButtonState.Idle:
            return LABELS.PLACE_BET;
        case BetButtonState.WaitingForBet:
            return LABELS.PLACE_BET;
        case BetButtonState.BetPlaced:
            return LABELS.CANCEL_BET;
        case BetButtonState.Disabled:
            return prevLabel;
        case BetButtonState.Collect:
            return LABELS.COLLECT;
        default:
            return LABELS.PLACE_BET;
        }
    };

    const getBgColor = () => {
        switch (buttonState) {
        case BetButtonState.Idle:
            return 'yellow.500';
        case BetButtonState.WaitingForBet:
            return 'yellow.500';
        case BetButtonState.BetPlaced:
            return 'red.500';
        case BetButtonState.Disabled:
            return 'gray.500';
        case BetButtonState.Collect:
            return 'green.500';
        default:
            return 'yellow.500';
        }
    };

    const getBgHoverColor = () => {
        switch (buttonState) {
        case BetButtonState.Idle:
            return 'yellow.700';
        case BetButtonState.WaitingForBet:
            return 'yellow.700';
        case BetButtonState.BetPlaced:
            return 'red.700';
        case BetButtonState.Disabled:
            return 'gray.500';
        case BetButtonState.Collect:
            return 'green.700';
        default:
            return 'yellow.700';
        }
    };

//     useEffect(() => {
//     console.log("PlaceBet Button Use effect called");
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//         //TODO: Based on the Game State and prev Saved State
//         console.log("PlaceBet Button Use effect called");
//         showButton(placeBetButtonRef);
//       });
//     });
//     return () => {
//       // window.removeEventListener("resize", updateDimensions);
//     }
//   },[]);

    useEffect(() => {
    console.log("PlaceBet Button useEffect called");
    showButton(placeBetButtonRef);
    hideButton(cancelButtonRef);
    hideButton(collectButtonRef);
    }, []);


    return(
        <Flex w="full" align={'center'} direction={'column'} gap={2}>
            <Button
            id="placebet"
            ref={placeBetButtonRef}
            size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
            bg={getBgColor()}
            _hover={{ bg: getBgHoverColor() }}
            color={"black"}
            fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "lg"}}
            fontWeight="semibold"
            // display={'inline-block'}
          // margin={0}
            onClick={ ()=> {
                OnPlaceBetClicked(currentIndex);
            } 
          }>
          {LABELS.PLACE_BET}
        </Button>
         <Button
            id="cancelbet"
            ref={cancelButtonRef}
            size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
            bg={getBgColor()}
            _hover={{ bg: getBgHoverColor() }}
            color={"black"}
            fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "lg"}}
            fontWeight="semibold"
            // display={'none'} 
          // margin={0}
            onClick={ ()=> {
                OnCancelClicked(currentIndex);
            } 
          }>
          {LABELS.CANCEL_BET}
        </Button>
        <Button
            id="collectBet"
            ref={collectButtonRef}
            size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
            bg={getBgColor()}
            _hover={{ bg: getBgHoverColor() }}
            color={"black"}
            fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "lg"}}
            fontWeight="semibold"
            // display={'none'} 
          // margin={0}
            onClick={ ()=> {
                OnCollectClicked(currentIndex);
            } 
          }>
          {`${amount} $ \n ${LABELS.COLLECT}`}
        </Button>
        </Flex>
    );
};

export default PlaceBetButtonComponent;