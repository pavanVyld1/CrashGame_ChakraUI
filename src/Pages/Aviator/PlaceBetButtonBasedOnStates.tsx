
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BetButtonState, LABELS } from "../../types/projectTypes";
import DataService  from "../../services/dataService";
import ApiService , { BetData, CashoutData } from '../../services/ApiService';
import SocketManager from "../Managers/SocketManager";

const PlaceBetButtonStateComponent = ({ index }: { index: number }) => {
  const [buttonState, setButtonState] = useState<BetButtonState>(BetButtonState.Idle);
  const [showPlaceBet, setShowPlaceBet] = useState(true);
  const [showCancelBet, setShowCancelBet] = useState(false);
  const [showCollect, setShowCollect] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setShowPlaceBet(false);
    setShowCancelBet(true);
    setShowCollect(false);

    //Trigger Bet placed with the API
  };

  const OnCancelClicked = () => {
    console.log("Cancel clicked");
    setButtonState(BetButtonState.Idle);
    setShowPlaceBet(true);
    setShowCancelBet(false);
    setShowCollect(false);

    //Trigger Cancel placed with the API
  };

  const OnCollectClicked = () => {
    console.log("Collect clicked");
    setButtonState(BetButtonState.Idle);
    setShowPlaceBet(true);
    setShowCancelBet(false);
    setShowCollect(false);

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
    OnPlaceBetClicked();

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
          SocketManager.onBetPlaced((data) => {
              console.log("Bet Placed:", data);
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
      setIsLoading(true);
      const response = await ApiService.cashout(betData, token);

      toast({
        title: response.success ? 'Bet Placed' : 'Bet Failed',
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

  useEffect(() => {
    console.log("Component mounted");
    setShowPlaceBet(true);
    setShowCancelBet(false);
    setShowCollect(false);
  }, []);

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
          onClick={handleCollectBet}
        >
          {`${amount} $ - ${LABELS.COLLECT}`}
        </Button>
      )}
    </Flex>
  );
};

export default PlaceBetButtonStateComponent;
