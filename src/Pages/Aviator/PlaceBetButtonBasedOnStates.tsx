
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BetButtonState, LABELS } from "../../types/projectTypes";
import DataService  from "../../services/dataService";
import ApiService , { BetData, CashoutData } from '../../services/ApiService';
import SocketManager from "../Managers/SocketManager";
import { GameState } from "../../services/socketService";

const PlaceBetButtonStateComponent = ({ index }: { index: number }) => {
  const [buttonState, setButtonState] = useState<BetButtonState>(BetButtonState.Idle);
  const [showPlaceBet, setShowPlaceBet] = useState(true);
  const [showCancelBet, setShowCancelBet] = useState(false);
  const [showCollect, setShowCollect] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const amount = 100;
  
  const token = localStorage.getItem("token");
  const toast = useToast();

  const getBgColor = () => {
    switch (buttonState) {
      case BetButtonState.Idle: return 'yellow.500';
      case BetButtonState.WaitingForBet: return 'yellow.500';
      case BetButtonState.BetPlaced: return 'red.500';
      case BetButtonState.Disabled: return 'gray.500';
      case BetButtonState.Collect: return 'green.500';
      default: return 'yellow.500';
    }
  };

  const getBgHoverColor = () => {
    switch (buttonState) {
      case BetButtonState.Idle: return 'yellow.700';
      case BetButtonState.WaitingForBet: return 'yellow.700';
      case BetButtonState.BetPlaced: return 'red.700';
      case BetButtonState.Disabled: return 'gray.500';
      case BetButtonState.Collect: return 'green.700';
      default: return 'yellow.700';
    }
  };

  const OnPlaceBetClicked = () => {
    console.log("Place bet clicked");
    setButtonState(BetButtonState.BetPlaced);


    //Trigger Bet placed with the API
  };

  const OnCancelClicked = () => {
    console.log("Cancel clicked");
    setButtonState(BetButtonState.Idle);


    //Trigger Cancel placed with the API
  };

  const OnCollectClicked = () => {
    console.log("Collect clicked");
    setButtonState(BetButtonState.Disabled);


    //Trigger Bet Collect with the API
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
    console.log("Placing the Bet");

    // try {
    //   setIsLoading(true);
    //   const response = await ApiService.placeBet(betData, token);

    //   toast({
    //     title: response.success ? 'Bet Placed' : 'Bet Failed',
    //     description: response.message,
    //     status: response.success ? 'success' : 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // } catch (err: any) {
    //   toast({
    //     title: 'API Error',
    //     description: err.message,
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // } finally {
    //   setIsLoading(false);
    // }

     try {
      setIsLoading(true);
       let bettingData = DataService.getBetData(index); 
      if(bettingData)
      {      
          
          console.log("Placing the Bet");
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
    OnCancelClicked();
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
    OnCollectClicked();
    let bettingData = DataService.getBetData(index); 

    const betData: CashoutData = {
      id: index, // example ID
      amount: bettingData?.amount,
      sessionId: 'session_123', // replace with actual session ID logic
    };

    try {

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

  const onStateChange = (newState: GameState): void => {  
      console.log("Game State Changed to : " + newState)
      switch (newState) {
        case "init":
          setButtonState(BetButtonState.Idle);
          break;
        case "ready":
          setButtonState(BetButtonState.Idle);
          // setTimeout(() => this.transitionToState("waiting_for_bet"), 3000);
          break;
        case "waiting_for_bet":
          setButtonState(BetButtonState.Idle);
          // setTimeout(() => this.transitionToState("starting"), 10000);
          break;
  
        case "starting":
          console.log("Button State in Starting : " + buttonState)
          if(buttonState === BetButtonState.BetPlaced) {
            setButtonState(BetButtonState.Collect);
          } else {
            setButtonState(BetButtonState.Idle);
            // setButtonState(BetButtonState.Disabled);   
          }
          break;
  
        case "started":
          console.log("Button State in Started : " + buttonState);
          if(buttonState === BetButtonState.BetPlaced) {
            setButtonState(BetButtonState.Collect);
          } else {
            // setButtonState(BetButtonState.Disabled);   
          }
          // this.transitionToState("running");
          break;
  
        case "running":
          if(buttonState === BetButtonState.BetPlaced) {
            setButtonState(BetButtonState.Collect);
          } else {
            // setButtonState(BetButtonState.Disabled);   
          }
          // this.startMultiplierIncrease();
          break;
  
        case "crashed":
          setButtonState(BetButtonState.Idle);
          break;
  
        case "end":
          setButtonState(BetButtonState.Idle);
          break;
      }
    };

  const handleButtonStateChange = (state: BetButtonState) => {
    console.error('Button state changed to:', state);
    setIsDisabled(false);
    switch (buttonState) {
      case BetButtonState.Idle: 
          setShowPlaceBet(true);
          setShowCancelBet(false);
          setShowCollect(false);
            break;
      case BetButtonState.WaitingForBet: 
          setShowPlaceBet(true);
          setShowCancelBet(false);
          setShowCollect(false);
            break;
      case BetButtonState.BetPlaced: 
          setShowPlaceBet(false);
          setShowCancelBet(true);
          setShowCollect(false);
            break;
      case BetButtonState.Disabled:
          // setShowPlaceBet(false);
          // setShowCancelBet(false);
          // setShowCollect(false);
          setIsDisabled(true);
           break;
      case BetButtonState.Collect: 
          setShowPlaceBet(false);
          setShowCancelBet(false);
          setShowCollect(true);
           break;
      default: 
           break;
    }
  };

  useEffect(() => {
    console.log("Component mounted");
    setButtonState(BetButtonState.Idle);

    SocketManager.onSessionInfo((data)=>{
      console.log("Received session Info:", data.state);
    });

    SocketManager.onSessionState((data)=>{
      console.log("Received session state:", data);
      onStateChange(data);
    });

    SocketManager.onBetPlaced((data) => {
      console.log("Bet Placed:", data);
      OnPlaceBetClicked();
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

     SocketManager.onWithdrawSuccess((data) => {
        console.log("withdraw success ", data);
        OnCollectClicked();
        toast({
          title: 'withdraw success',
          description: 'Amount : ' + data.payout,
          duration: 3000,
          isClosable: true,
        });
    });

    SocketManager.onCrash((data) => {
      console.log("Crashed :", data);
      onStateChange("crashed");
    });
    
  }, []);

  useEffect(() => {
    handleButtonStateChange(buttonState);
  }, [buttonState]); 

  return (
    <Flex w="full" align="center" direction="column" gap={2}>
      {showPlaceBet && (
        <Button
          id="placebet"
          size="md"
          bg={getBgColor()}
          _hover={{ bg: getBgHoverColor() }}
          color="black"
          fontWeight="semibold"
          isLoading={isLoading}
          onClick={handlePlaceBet}
          disabled={isDisabled}
        >
          {LABELS.PLACE_BET}
        </Button>
      )}

      {showCancelBet && (
        <Button
          id="cancelbet"
          size="md"
          bg={getBgColor()}
          _hover={{ bg: getBgHoverColor() }}
          color="black"
          fontWeight="semibold"
          isLoading={isLoading}
          disabled={isDisabled}
          onClick={handleCancelBet}
        >
          {LABELS.CANCEL_BET}
        </Button>
      )}

      {showCollect && (
        <Button
          id="collectbet"
          size="md"
          bg={getBgColor()}
          _hover={{ bg: getBgHoverColor() }}
          color="black"
          fontWeight="semibold"
          isLoading={isLoading}
          disabled={isDisabled}
          onClick={handleCollectBet}
        >
          {`${amount} $ - ${LABELS.COLLECT}`}
        </Button>
      )}
    </Flex>
  );
};

export default PlaceBetButtonStateComponent;
