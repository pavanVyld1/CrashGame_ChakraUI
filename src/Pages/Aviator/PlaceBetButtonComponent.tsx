import { Button, Input, Box, Grid, Stack, Text, Flex,useBreakpointValue, color, HStack, Icon, Center, VStack, Heading, useToast } from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { FaBold } from "react-icons/fa";
import Header from "./Header";
import { useOrientation } from "../../hooks/useOrientation";
import GameCanvas from "./GameCanvas";
import { useEffect, useRef, useState } from "react";
import { BetButtonState, LABELS } from "../../types/projectTypes";
import DataService  from "../../services/dataService";
import ApiService , { BetData, CashoutData } from '../../services/ApiService';
import SocketManager from "../Managers/SocketManager";
import { GameState } from "../../services/socketService";


const PlaceBetButtonComponent = ({ index }: { index: number }) => { 

    const currentIndex = index;
    const [buttonState, setButtonState] = useState<BetButtonState>(BetButtonState.Idle);
    const [localGameState, setLocalGameState] = useState<GameState>('init');
    const [displayAmount, setDisplayAmount] = useState<number>(0);
    const [placedBetAmount, setPlacedBetAmount] = useState<number>(0);

    const buttonStateRef = useRef(buttonState);
    const localGameStateRef = useRef(localGameState);
    const placedBetRef = useRef(placedBetAmount);

    const prevLabel = LABELS.PLACE_BET;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const placeBetButtonRef = useRef<HTMLButtonElement | null>(null);
    const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
    const collectButtonRef = useRef<HTMLButtonElement | null>(null);

    const token = localStorage.getItem("token");
    const toast = useToast();

    const OnPlaceBetClicked = (buttonIndex:number)=>{
        console.log("OnPlaceBetClicked is clicked");
        
        handleButtonStateChange(BetButtonState.BetPlaced);   
    }

    const OnCancelClicked = (buttonIndex:number)=>{
        console.log("OnCancelClicked is clicked");
        handleButtonStateChange(BetButtonState.Idle);
        // toggleButtonDisplay(cancelButtonRef);
        // toggleButtonDisplay(placeBetButtonRef);
    }

    const OnCollectClicked = (buttonIndex:number)=>{
        console.log("OnCollectClicked is clicked");
        handleButtonStateChange(BetButtonState.Disabled);
        // toggleButtonDisplay(collectButtonRef);
        // toggleButtonDisable(collectButtonRef);
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
            console.log("hideButton button ref  : " + buttonRef.current.id);
            console.log("current Display : " + currentDisplay);
            buttonRef.current.style.display = "none";
        }
    };

    const SetButtonDisable = (buttonRef: React.RefObject<HTMLButtonElement>, isDisabled : boolean) => {
        if (buttonRef.current) {
            const currentDisableState = buttonRef.current.disabled;
            console.log("showButton button ref  : " + buttonRef.current.id);
            console.log("current Display : " + currentDisableState);
            buttonRef.current.disabled = isDisabled;
        }
    };

    const toggleButtonDisable = (buttonRef: React.RefObject<HTMLButtonElement>) => {
        if (buttonRef.current) {
            const currentDisableState = buttonRef.current.disabled;
            console.log("showButton button ref  : " + buttonRef.current.id);
            console.log("current Display : " + currentDisableState);
            buttonRef.current.disabled = currentDisableState === true ? false : true;
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


     const handlePlaceBet = async () => {
       if (!token) {
         toast({
           title: 'Error',
           description: 'User not logged in',
           status: 'error',
           duration: 3000,
           isClosable: true,
         });
         return;
       }
       console.log("Placing the Bet : " + index);
   
        try {
         setIsLoading(true);
          let bettingData = DataService.getBetData(index); 
         if(bettingData)
         {      
             
            //  console.log("Placing the Bet");
             setPlacedBetAmount(bettingData.amount);
            // placedBetAmount = bettingData.amount;
             console.log("Placing the Bet : " +bettingData.amount );
             SocketManager.placeBet(bettingData.amount);
         }
         
       } catch (err: any) {
         toast({
           title: 'Error',
           description: err.message,
           status: 'error',
           duration: 3000,
           isClosable: true,
         });
       } finally {
         setIsLoading(false);
       }
     };
   
     const handleCancelBet = async () => {
       if (!token) {
         toast({
           title: 'Error',
           description: 'User not logged in',
           status: 'error',
           duration: 3000,
           isClosable: true,
         });
         return;
       }
       OnCancelClicked(currentIndex);
       let bettingData = DataService.getBetData(index); 
   
       const betData: BetData = {
         id: index, // example ID
         amount: bettingData?.amount,
         sessionId: 'session_123', // replace with actual session ID logic
       };
   
       try {
         setIsLoading(true);
         const response = await ApiService.cancelBet(betData, token);
   
         toast({
           title: response.success ? 'Bet Canceled' : 'Cancel Failed',
           description: response.message,
           status: response.success ? 'success' : 'error',
           duration: 3000,
           isClosable: true,
         });
       } catch (err: any) {
         toast({
           title: 'API Error',
           description: err.message,
           status: 'error',
           duration: 3000,
           isClosable: true,
         });
       } finally {
         setIsLoading(false);
       }
     };
   
     const handleCollectBet = async () => {
       if (!token) {
         toast({
           title: 'Error',
           description: 'User not logged in',
           status: 'error',
           duration: 3000,
           isClosable: true,
         });
         return;
       }
    //    OnCollectClicked(currentIndex);
       let bettingData = DataService.getBetData(index); 
   
       const betData: CashoutData = {
         id: index, // example ID
         amount: bettingData?.amount,
         sessionId: 'session_123', // replace with actual session ID logic
       };
   
       try {
          SocketManager.withdraw();
       } catch (err: any) {
         toast({
           title: 'API Error',
           description: err.message,
           status: 'error',
           duration: 3000,
           isClosable: true,
         });
       } finally {
         setIsLoading(false);
       }
     };
   
     const onGameStateChange = (newState: GameState): void => {  
         console.log("Game State Changed to : " + newState)
         switch (newState) {
           case "init":
             handleButtonStateChange(BetButtonState.Idle);
             break;
           case "ready":
             handleButtonStateChange(BetButtonState.Idle);
             // setTimeout(() => this.transitionToState("waiting_for_bet"), 3000);
             break;
           case "waiting_for_bet":
             handleButtonStateChange(BetButtonState.Idle);
             // setTimeout(() => this.transitionToState("starting"), 10000);
             break;
     
           case "starting":
             console.log("Button State in Starting : " + buttonState)
             if(buttonStateRef.current === BetButtonState.BetPlaced) {
               handleButtonStateChange(BetButtonState.Collect);
             } else {
               handleButtonStateChange(BetButtonState.Idle);
               // handleButtonStateChange(BetButtonState.Disabled);   
             }
             break;
     
           case "started":
             console.log("Button State in Started : " + buttonState);
             if(buttonStateRef.current === BetButtonState.BetPlaced) {
               handleButtonStateChange(BetButtonState.Collect);
             } else {
               // handleButtonStateChange(BetButtonState.Disabled);   
             }
             // this.transitionToState("running");
             break;
     
           case "running":
             if(buttonStateRef.current === BetButtonState.BetPlaced) {
               handleButtonStateChange(BetButtonState.Collect);
             } else {
               // handleButtonStateChange(BetButtonState.Disabled);   
             }
             // this.startMultiplierIncrease();
             break;
     
           case "crashed":
             handleButtonStateChange(BetButtonState.Idle);
             setPlacedBetAmount(0);
            // placedBetAmount = 0;
             break;
     
           case "end":
             handleButtonStateChange(BetButtonState.Idle);
             setPlacedBetAmount(0);
            // placedBetAmount = 0;
             break;
         }
       };
   
     const handleButtonStateChange = (state: BetButtonState) => {
       console.error('Button state changed to: index :' + index + ' state : ' + state.toString());
    //    setIsDisabled(false);
        SetButtonDisable(placeBetButtonRef,false);
        SetButtonDisable(cancelButtonRef,false);
        SetButtonDisable(collectButtonRef,false);
       switch (state) {
         case BetButtonState.Idle: 
            showButton(placeBetButtonRef);
            hideButton(cancelButtonRef);
            hideButton(collectButtonRef);
               break;
         case BetButtonState.WaitingForBet: 
            showButton(placeBetButtonRef);
            hideButton(cancelButtonRef);
            hideButton(collectButtonRef);
               break;
         case BetButtonState.BetPlaced: 
            hideButton(placeBetButtonRef);
            showButton(cancelButtonRef);
            hideButton(collectButtonRef);
               break;
         case BetButtonState.Disabled:
             // setShowPlaceBet(false);
             // setShowCancelBet(false);
             // setShowCollect(false);
             SetButtonDisable(placeBetButtonRef,true);
             SetButtonDisable(cancelButtonRef,true);
             SetButtonDisable(collectButtonRef,true);
              break;
         case BetButtonState.Collect: 
            hideButton(placeBetButtonRef);
            hideButton(cancelButtonRef);
            showButton(collectButtonRef);
              break;
         default: 
              break;
       }
       setButtonState(state);
     };
   
     useEffect(() => {
       console.log("Component mounted");
    //    handleButtonStateChange(BetButtonState.Idle);
   
       SocketManager.onSessionInfo((data)=>{
         console.log("Received session Info:", data.state);
        //  onGameStateChange(data.state);
        setLocalGameState(data.state);
       });
   
       SocketManager.onSessionState((data)=>{
         console.log("Received session state:", data);
        //  onGameStateChange(data);
        setLocalGameState(data);
       });
   
       console.log("Registering the Callabacks");

       SocketManager.onBetPlaced(async (data) => {
         console.log("Bet Placed: " + data + " Index : " + index );
         OnPlaceBetClicked(currentIndex);
         let token = DataService.GetToken();
         if(token){
         const response = await ApiService.getPlayerData(token);
         
          if(response){
            DataService.updateWallet(response.data.wallet);
          }
        }
         toast({
           title: data.sessionId ? 'Bet Placed' : 'Bet Failed',
           description: data.sessionId ? 'Bet Placed' : 'Bet Failed',
           status: data.sessionId ? 'success' : 'error',
           duration: 3000,
           isClosable: true,
         });
       });
   
       SocketManager.OnError((data) => {
           console.log("Bet Placed: Error", data);
           toast({
             title: data ? 'Bet Failed Error' : 'Bet Failed Error',
             description: data,
             status: 'error',
             duration: 3000,
             isClosable: true,
           });
       });
   
        SocketManager.onWithdrawSuccess(async (data) => {
           console.log("withdraw success ", data);
           OnCollectClicked(currentIndex);
           let token = DataService.GetToken();
          if(token){
            const response = await ApiService.getPlayerData(token);
            console.log("response : " + response);
           if(response){
              DataService.updateWallet(response.data.wallet);
            }
          }
           toast({
             title: 'withdraw success',
             description: 'Amount : ' + data.payout,
             duration: 3000,
             isClosable: true,
           });
       });
   
       SocketManager.onCrash((data) => {
         console.log("Crashed :", data);
        //  onGameStateChange("crashed");
        setLocalGameState('crashed');
       });

        SocketManager.onTick((tick) => {
            console.log("Received tick:", tick.value + " Placed bet : " + placedBetRef.current + " Button State : " + buttonStateRef.current + " Local game State : " + localGameStateRef.current);

            if(placedBetRef && buttonStateRef.current === BetButtonState.Collect){
                setDisplayAmount(placedBetRef.current * tick.value);
            }
        });
       
     }, []);
   
     useEffect(() => {
       console.log("Button State Use Effect : " + buttonState);
       buttonStateRef.current = buttonState;
       handleButtonStateChange(buttonState);
     }, [buttonState]); 

      useEffect(() => {
       console.log("LocalGame State State Use Effect : " + localGameState);
       localGameStateRef.current = localGameState;
       onGameStateChange(localGameState);
     }, [localGameState]);

     useEffect(() => {
       console.log("Placed Bet Use Effect : " + localGameState);
       placedBetRef.current = placedBetAmount;
     }, [placedBetAmount]);


    return(
        <Flex w="full" align={'center'} direction={'column'} gap={2}>
            <Button
            minW={'full'}
            id="placebet"
            ref={placeBetButtonRef}
            size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
            bg={getBgColor()}
            _hover={{ bg: getBgHoverColor() }}
            color={"black"}
            fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "lg"}}
            fontWeight="semibold"
            isLoading={isLoading}
            // display={'inline-block'}
          // margin={0}
            onClick={ ()=> {
                handlePlaceBet();
            } 
          }>
          {LABELS.PLACE_BET}
        </Button>
         <Button
            id="cancelbet"
            minW={'full'}
            ref={cancelButtonRef}
            size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
            bg={getBgColor()}
            _hover={{ bg: getBgHoverColor() }}
            color={"black"}
            fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "lg"}}
            fontWeight="semibold"
            isLoading={isLoading}
            // display={'none'} 
          // margin={0}
            onClick={ ()=> {
                handleCancelBet();
            } 
          }>
          {LABELS.CANCEL_BET}
        </Button>
        <Button
            id="collectBet"
            minW={'full'}
            ref={collectButtonRef}
            size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
            bg={getBgColor()}
            _hover={{ bg: getBgHoverColor() }}
            color={"black"}
            fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "lg"}}
            fontWeight="semibold"
            isLoading={isLoading}
            // display={'none'} 
          // margin={0}
            onClick={ ()=> {
                handleCollectBet();
            } 
          }>
          {`${displayAmount.toFixed(2)} $ \n ${LABELS.COLLECT}`}
        </Button>
        </Flex>
    );
};

export default PlaceBetButtonComponent;